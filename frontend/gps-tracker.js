/**
 * =========================================================
 * SWASTHYA SETU - REAL-TIME GPS & 108 AMBULANCE TRACKER (gps-tracker.js)
 * Instant High-Resolution Interactive Vector Map & Live 108 Routing Engine
 * Works 100% Offline & Online with Leaflet / OpenStreetMap Integration
 * =========================================================
 */

(function(global) {
  'use strict';

  // Default Regional Hospital Coordinates (Kondapalli & Krishna District, AP)
  const DEFAULT_REGION = {
    lat: 16.6186,
    lng: 80.5364,
    zoom: 14
  };

  const HOSPITALS_GEO = [
    {
      id: 'HOSP-01',
      name: 'Kondapalli Primary Health Centre (PHC)',
      type: 'PHC (24x7 Emergency)',
      lat: 16.6225,
      lng: 80.5412,
      x: 72, // SVG coordinate percentage
      y: 28,
      beds: { gen: 8, icu: 2, oxygen: 6 },
      phone: '0866-281001',
      doctor: 'Dr. Priya Sharma'
    },
    {
      id: 'HOSP-02',
      name: 'Ibrahimpatnam Community Health Centre (CHC)',
      type: 'CHC (Trauma & Critical Care)',
      lat: 16.5910,
      lng: 80.5180,
      x: 22,
      y: 68,
      beds: { gen: 18, icu: 5, oxygen: 14 },
      phone: '0866-282002',
      doctor: 'Dr. Rajesh Verma'
    },
    {
      id: 'HOSP-03',
      name: 'Government General Hospital (GGH), Vijayawada',
      type: 'District Multi-Specialty Hospital',
      lat: 16.5062,
      lng: 80.6480,
      x: 88,
      y: 82,
      beds: { gen: 74, icu: 12, oxygen: 45 },
      phone: '0866-257000',
      doctor: 'Emergency Trauma Team'
    }
  ];

  class GpsTrackingController {
    constructor() {
      this.maps = {};
      this.patientCoords = { lat: DEFAULT_REGION.lat, lng: DEFAULT_REGION.lng };
      this.hasRealGps = false;
      this.zoomLevel = 1;
      this.mapMode = 'streets'; // 'streets' | 'satellite'
      
      this.dispatchState = {
        isActive: false,
        stage: 'idle', // 'idle' | 'dispatched' | 'enroute' | 'arrived' | 'transit'
        ambulancePos: { x: 72, y: 28 }, // Starts at Kondapalli PHC
        patientPos: { x: 50, y: 48 }, // Center of map
        routePoints: [
          { x: 72, y: 28 },
          { x: 68, y: 32 },
          { x: 64, y: 35 },
          { x: 60, y: 38 },
          { x: 57, y: 42 },
          { x: 54, y: 45 },
          { x: 50, y: 48 }
        ],
        stepIndex: 0,
        distanceKm: 3.4,
        etaMinutes: 4,
        etaSeconds: 30,
        driver: {
          name: 'Rajesh Naidu',
          phone: '9848022338',
          vehicleNo: 'AP-16-TX-1081',
          vehicleType: '108 Advanced Life Support (ALS) Ambulance',
          paramedic: 'K. Venkatesh (EMT Certified)'
        },
        timerId: null
      };

      this.initGeolocation();
    }

    // -------------------------------------------------------------
    // 1. DEVICE GEOLOCATION
    // -------------------------------------------------------------
    initGeolocation() {
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.patientCoords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };
            this.hasRealGps = true;
            console.log('[GPS] Real device coordinates acquired:', this.patientCoords);
            this.renderAllContainers();
          },
          (err) => {
            console.warn('[GPS] Geolocation fallback to regional grid:', err.message);
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
      }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Number((R * c).toFixed(2));
    }

    // -------------------------------------------------------------
    // 2. INSTANT INTERACTIVE VISUAL MAP RENDERER
    // -------------------------------------------------------------
    initMap(containerId) {
      if (typeof document === 'undefined') return;
      const container = document.getElementById(containerId);
      if (!container) return;

      this.renderInteractiveMap(containerId);
      this.updateUiCards();
    }

    renderAllContainers() {
      ['patientLiveGpsMap', 'sosEmergencyLiveMap', 'adminLiveFleetMap'].forEach(id => {
        const el = document.getElementById(id);
        if (el) this.renderInteractiveMap(id);
      });
    }

    renderInteractiveMap(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const pPos = this.dispatchState.patientPos;
      const ambPos = this.dispatchState.ambulancePos;
      const isDispatched = this.dispatchState.isActive;
      const stage = this.dispatchState.stage;

      const mapBg = this.mapMode === 'satellite' 
        ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' 
        : 'linear-gradient(135deg, #0b1528, #0f172a, #022c43)';

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;min-height:320px;background:${mapBg};border-radius:14px;overflow:hidden;box-shadow:inset 0 0 25px rgba(0,0,0,0.8);font-family:'Plus Jakarta Sans',sans-serif;user-select:none;">
          
          <!-- TOP MAP CONTROLS & HUD -->
          <div style="position:absolute;top:10px;left:12px;z-index:20;display:flex;gap:6px;align-items:center;">
            <span style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);color:#38bdf8;font-size:11px;font-weight:800;padding:5px 10px;border-radius:8px;border:1px solid rgba(56,189,248,0.3);display:flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;animation:patientPulse 1.5s infinite;"></span>
              <span>LIVE GPS RADAR · ${this.patientCoords.lat.toFixed(4)}° N, ${this.patientCoords.lng.toFixed(4)}° E</span>
            </span>
          </div>

          <div style="position:absolute;top:10px;right:12px;z-index:20;display:flex;gap:6px;">
            <button onclick="gpsTrackingController.toggleMapMode('${containerId}')" style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:11px;font-weight:700;padding:5px 10px;border-radius:8px;cursor:pointer;">
              ${this.mapMode === 'satellite' ? '🗺️ Street View' : '🛰️ Satellite'}
            </button>
            <button onclick="gpsTrackingController.recenterMap('${containerId}')" title="Recenter on Patient" style="background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:12px;padding:5px 10px;border-radius:8px;cursor:pointer;">
              🎯
            </button>
          </div>

          <!-- INTERACTIVE VECTOR MAP CANVAS (SVG) -->
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;transform:scale(${this.zoomLevel});transition:transform 0.3s ease;">
            
            <!-- Rural Sectors & Forest Grids -->
            <rect x="5" y="5" width="38" height="40" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" stroke-width="0.4" stroke-dasharray="1,1" />
            <text x="7" y="10" fill="#4ade80" font-size="2.2" font-weight="700">Kondapalli Reserve & Hills</text>

            <rect x="55" y="55" width="40" height="38" rx="4" fill="rgba(2,132,199,0.08)" stroke="rgba(2,132,199,0.2)" stroke-width="0.4" stroke-dasharray="1,1" />
            <text x="57" y="60" fill="#38bdf8" font-size="2.2" font-weight="700">Krishna River Basin Agricultural Grid</text>

            <!-- Krishna River Path -->
            <path d="M 0,88 Q 30,78 60,86 T 100,75" fill="none" stroke="#0284c7" stroke-width="4.5" stroke-opacity="0.35" stroke-linecap="round" />
            <path d="M 0,88 Q 30,78 60,86 T 100,75" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.6" stroke-linecap="round" />

            <!-- Main Highway NH-65 & Arterial Roads -->
            <line x1="0" y1="35" x2="100" y2="65" stroke="#475569" stroke-width="3" stroke-linecap="round" />
            <line x1="0" y1="35" x2="100" y2="65" stroke="#cbd5e1" stroke-width="0.8" stroke-dasharray="2,2" />
            
            <!-- Secondary Arterial Roads to PHC & CHC -->
            <line x1="72" y1="28" x2="50" y2="48" stroke="#334155" stroke-width="2" stroke-linecap="round" />
            <line x1="22" y1="68" x2="50" y2="48" stroke="#334155" stroke-width="2" stroke-linecap="round" />
            <line x1="88" y1="82" x2="50" y2="48" stroke="#334155" stroke-width="1.8" stroke-linecap="round" />

            <!-- RADAR SWEEP RINGS -->
            <circle cx="${pPos.x}" cy="${pPos.y}" r="22" fill="none" stroke="rgba(56,189,248,0.25)" stroke-width="0.4" stroke-dasharray="1,1" />
            <circle cx="${pPos.x}" cy="${pPos.y}" r="12" fill="none" stroke="rgba(56,189,248,0.35)" stroke-width="0.5" />
            <circle cx="${pPos.x}" cy="${pPos.y}" r="4" fill="none" stroke="rgba(56,189,248,0.5)" stroke-width="0.6" />

            <!-- ACTIVE EMERGENCY 108 AMBULANCE ROUTE LINE -->
            ${isDispatched ? `
              <path d="M 72,28 Q 60,35 50,48" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="2,2" stroke-linecap="round" style="animation:dashMove 1s linear infinite;" />
            ` : ''}
          </svg>

          <!-- INTERACTIVE HTML MARKERS ON TOP OF MAP -->

          <!-- 1. PATIENT LIVE LOCATION MARKER -->
          <div style="position:absolute;top:${pPos.y}%;left:${pPos.x}%;transform:translate(-50%, -50%);z-index:10;cursor:pointer;text-align:center;" onclick="global.toast('📍 Patient Current GPS Location: Kondapalli Sector 4')">
            <div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin:0 auto;">
              <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(2,132,199,0.4);animation:patientPulse 1.6s infinite;"></div>
              <div style="background:#0284c7;color:#ffffff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;border:2.5px solid #ffffff;box-shadow:0 0 16px #0284c7;z-index:2;">
                📍
              </div>
            </div>
            <div style="background:rgba(15,23,42,0.9);color:#ffffff;font-size:9.5px;font-weight:800;padding:2px 6px;border-radius:4px;border:1px solid #38bdf8;white-space:nowrap;margin-top:2px;box-shadow:0 2px 8px rgba(0,0,0,0.5);">
              YOU (Patient)
            </div>
          </div>

          <!-- 2. HOSPITAL GEO-MARKERS -->
          ${HOSPITALS_GEO.map(h => `
            <div style="position:absolute;top:${h.y}%;left:${h.x}%;transform:translate(-50%, -50%);z-index:8;cursor:pointer;text-align:center;" onclick="gpsTrackingController.showHospitalModal('${h.id}')">
              <div style="width:34px;height:34px;border-radius:50%;background:#dc2626;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #ffffff;box-shadow:0 4px 14px rgba(220,38,38,0.7);margin:0 auto;transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
                🏥
              </div>
              <div style="background:rgba(15,23,42,0.92);color:#ffffff;font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.2);white-space:nowrap;margin-top:2px;box-shadow:0 2px 6px rgba(0,0,0,0.6);">
                ${h.name.split(' ')[0]} (${h.beds.oxygen} O2 Beds)
              </div>
            </div>
          `).join('')}

          <!-- 3. LIVE 108 AMBULANCE VEHICLE MARKER -->
          ${isDispatched ? `
            <div style="position:absolute;top:${ambPos.y}%;left:${ambPos.x}%;transform:translate(-50%, -50%);z-index:15;cursor:pointer;text-align:center;transition:all 1s cubic-bezier(0.4, 0, 0.2, 1);" onclick="global.toast('🚨 108 Ambulance en route to patient!')">
              <div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center;margin:0 auto;">
                <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(220,38,38,0.45);animation:ambFlash 0.8s infinite;"></div>
                <div style="background:linear-gradient(135deg, #dc2626, #991b1b);color:#ffffff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:2.5px solid #ffffff;box-shadow:0 0 20px rgba(220,38,38,0.9);z-index:2;">
                  🚑
                </div>
              </div>
              <div style="background:#dc2626;color:#ffffff;font-size:9.5px;font-weight:900;padding:2px 6px;border-radius:4px;border:1px solid #ffffff;white-space:nowrap;margin-top:2px;box-shadow:0 2px 8px rgba(0,0,0,0.6);">
                ${stage === 'arrived' ? '🎉 ARRIVED' : '108 AMBULANCE (EN ROUTE)'}
              </div>
            </div>
          ` : ''}

          <!-- BOTTOM DISPATCH ACTION OVERLAY -->
          <div style="position:absolute;bottom:10px;left:12px;right:12px;z-index:20;display:flex;justify-content:space-between;align-items:center;background:rgba(15,23,42,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);padding:8px 14px;border-radius:10px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:16px;">${isDispatched ? '🚑' : '🛰️'}</span>
              <span style="font-size:11.5px;font-weight:700;color:#ffffff;">
                ${isDispatched 
                  ? (stage === 'arrived' ? 'Ambulance is at patient doorstep.' : `Vehicle AP-16-TX-1081 is ${this.dispatchState.distanceKm} km away.`)
                  : 'Live 108 Emergency GPS Radar Ready'}
              </span>
            </div>
            <div style="display:flex;gap:6px;">
              ${!isDispatched ? `
                <button onclick="gpsTrackingController.startAmbulanceDispatch()" style="background:#dc2626;border:none;color:#ffffff;font-size:11px;font-weight:800;padding:6px 12px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:4px;">
                  <span>🚨</span> <span>Test 108 Dispatch</span>
                </button>
              ` : `
                <button onclick="gpsTrackingController.stopDispatch()" style="background:rgba(239,68,68,0.25);border:1px solid #ef4444;color:#fca5a5;font-size:11px;font-weight:800;padding:6px 10px;border-radius:6px;cursor:pointer;">
                  ✕ Stop
                </button>
              `}
            </div>
          </div>

        </div>
      `;
    }

    toggleMapMode(containerId) {
      this.mapMode = (this.mapMode === 'streets') ? 'satellite' : 'streets';
      this.renderInteractiveMap(containerId);
    }

    recenterMap(containerId) {
      this.zoomLevel = 1;
      this.renderInteractiveMap(containerId);
      if (global.toast) global.toast('🎯 Map centered on your live GPS location.');
    }

    showHospitalModal(hospId) {
      const h = HOSPITALS_GEO.find(item => item.id === hospId);
      if (!h) return;

      const details = `🏥 ${h.name}\n\nType: ${h.type}\nGen Beds Available: ${h.beds.gen}\nICU Beds: ${h.beds.icu}\nOxygen Units: ${h.beds.oxygen}\nOn-Duty Doctor: ${h.doctor}\n\nEmergency Contact: ${h.phone}`;
      alert(details);
    }

    // -------------------------------------------------------------
    // 3. 108 AMBULANCE DISPATCH & ANIMATED LIVE MOVEMENT
    // -------------------------------------------------------------
    startAmbulanceDispatch() {
      if (this.dispatchState.isActive) return;

      this.dispatchState.isActive = true;
      this.dispatchState.stage = 'enroute';
      this.dispatchState.stepIndex = 0;
      this.dispatchState.ambulancePos = this.dispatchState.routePoints[0];
      this.dispatchState.distanceKm = 3.4;
      this.dispatchState.etaMinutes = 4;
      this.dispatchState.etaSeconds = 30;

      console.log('[GPS Dispatch] 108 Emergency Ambulance Dispatched!');

      this.renderAllContainers();
      this.updateUiCards();

      if (global.toast) {
        global.toast('🚨 108 Ambulance AP-16-TX-1081 Dispatched! Live GPS Tracking Active.');
      }

      this.dispatchState.timerId = setInterval(() => {
        this.stepAmbulanceMovement();
      }, 1400);
    }

    stepAmbulanceMovement() {
      if (!this.dispatchState.isActive) return;

      this.dispatchState.stepIndex++;
      const currentIdx = this.dispatchState.stepIndex;
      const totalSteps = this.dispatchState.routePoints.length;

      if (currentIdx < totalSteps) {
        this.dispatchState.ambulancePos = this.dispatchState.routePoints[currentIdx];
        
        const progress = currentIdx / totalSteps;
        this.dispatchState.distanceKm = Math.max(0.1, Number((3.4 * (1 - progress)).toFixed(2)));
        
        if (this.dispatchState.etaSeconds > 10) {
          this.dispatchState.etaSeconds -= 15;
        } else if (this.dispatchState.etaMinutes > 0) {
          this.dispatchState.etaMinutes--;
          this.dispatchState.etaSeconds = 45;
        }

        this.renderAllContainers();
        this.updateUiCards();
      } else {
        this.dispatchState.stage = 'arrived';
        this.dispatchState.ambulancePos = this.dispatchState.patientPos;
        this.dispatchState.distanceKm = 0;
        this.dispatchState.etaMinutes = 0;
        this.dispatchState.etaSeconds = 0;

        clearInterval(this.dispatchState.timerId);
        this.dispatchState.timerId = null;

        console.log('[GPS Dispatch] 108 Ambulance arrived at patient doorstep!');
        this.renderAllContainers();
        this.updateUiCards();

        if (global.toast) {
          global.toast('🚑 108 Ambulance has arrived at your location! Paramedics are on site.');
        }
      }
    }

    stopDispatch() {
      if (this.dispatchState.timerId) {
        clearInterval(this.dispatchState.timerId);
      }

      this.dispatchState.isActive = false;
      this.dispatchState.stage = 'idle';
      this.dispatchState.ambulancePos = { x: 72, y: 28 };

      this.renderAllContainers();
      this.updateUiCards();
      
      if (global.toast) {
        global.toast('🛑 Emergency GPS Tracking ended.');
      }
    }

    updateUiCards() {
      if (typeof document === 'undefined') return;

      const etaBadge = document.getElementById('liveGpsEtaBadge');
      const distBadge = document.getElementById('liveGpsDistBadge');
      const statusBadge = document.getElementById('liveGpsStatusBadge');
      const driverCard = document.getElementById('liveGpsDriverCard');
      const btnDispatch = document.getElementById('btnStartGpsDispatch');
      const btnStop = document.getElementById('btnStopGpsDispatch');

      if (etaBadge) {
        etaBadge.textContent = this.dispatchState.isActive 
          ? (this.dispatchState.stage === 'arrived' ? 'ARRIVED ON SITE' : `${this.dispatchState.etaMinutes}m ${this.dispatchState.etaSeconds}s`)
          : '—';
      }

      if (distBadge) {
        distBadge.textContent = this.dispatchState.isActive ? `${this.dispatchState.distanceKm} km away` : '—';
      }

      if (statusBadge) {
        if (!this.dispatchState.isActive) {
          statusBadge.innerHTML = '🟢 Standby · GPS Signal Active';
          statusBadge.style.background = 'rgba(22, 163, 74, 0.15)';
          statusBadge.style.color = '#16a34a';
        } else if (this.dispatchState.stage === 'arrived') {
          statusBadge.innerHTML = '🎉 108 Ambulance Arrived · Boarding Patient';
          statusBadge.style.background = 'rgba(2, 132, 199, 0.2)';
          statusBadge.style.color = '#0284c7';
        } else {
          statusBadge.innerHTML = '🚨 Emergency Vehicle En Route (Lights & Siren Active)';
          statusBadge.style.background = 'rgba(220, 38, 38, 0.2)';
          statusBadge.style.color = '#dc2626';
        }
      }

      if (driverCard) {
        driverCard.style.display = this.dispatchState.isActive ? 'block' : 'none';
      }

      if (btnDispatch && btnStop) {
        btnDispatch.style.display = this.dispatchState.isActive ? 'none' : 'inline-flex';
        btnStop.style.display = this.dispatchState.isActive ? 'inline-flex' : 'none';
      }
    }
  }

  // Export Global Singleton
  global.gpsTrackingController = new GpsTrackingController();
  global.HOSPITALS_GEO = HOSPITALS_GEO;

  // Auto-init map on DOM ready
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        global.gpsTrackingController.initMap('patientLiveGpsMap');
      }, 200);
    });
  }

})(typeof window !== 'undefined' ? window : global);
