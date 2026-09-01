/**
 * =========================================================
 * SWASTHYA SETU - REAL-TIME GPS & 108 AMBULANCE TRACKER (gps-tracker.js)
 * Google Maps Styled High-Definition Interactive Engine with Fullscreen Mode,
 * Live Traffic Overlay, Turn-by-Turn Navigation HUD & Hospital Geo-Pins
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
      x: 74, // SVG coordinate percentage
      y: 26,
      rating: '4.8 ★★★★★',
      beds: { gen: 8, icu: 2, oxygen: 6 },
      phone: '0866-281001',
      doctor: 'Dr. Priya Sharma, MBBS, MD'
    },
    {
      id: 'HOSP-02',
      name: 'Ibrahimpatnam Community Health Centre (CHC)',
      type: 'CHC (Trauma & Critical Care)',
      lat: 16.5910,
      lng: 80.5180,
      x: 20,
      y: 72,
      rating: '4.7 ★★★★★',
      beds: { gen: 18, icu: 5, oxygen: 14 },
      phone: '0866-282002',
      doctor: 'Dr. Rajesh Verma, MBBS, MS'
    },
    {
      id: 'HOSP-03',
      name: 'Government General Hospital (GGH), Vijayawada',
      type: 'District Multi-Specialty Hospital',
      lat: 16.5062,
      lng: 80.6480,
      x: 88,
      y: 80,
      rating: '4.9 ★★★★★',
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
      this.mapMode = 'streets'; // 'streets' | 'satellite' | 'terrain'
      this.trafficEnabled = true;
      this.isFullscreen = false;
      this.selectedHospital = null;
      
      this.dispatchState = {
        isActive: false,
        stage: 'idle', // 'idle' | 'dispatched' | 'enroute' | 'arrived' | 'transit'
        ambulancePos: { x: 74, y: 26 }, // Starts at Kondapalli PHC
        patientPos: { x: 48, y: 46 }, // Patient location
        routePoints: [
          { x: 74, y: 26, turn: 'Start from Kondapalli PHC Base' },
          { x: 69, y: 31, turn: 'Merge onto NH-65 Express Highway' },
          { x: 64, y: 35, turn: 'Continue straight on NH-65 (50 km/h)' },
          { x: 59, y: 39, turn: 'Take exit towards Sector 4 Village Link' },
          { x: 55, y: 42, turn: 'In 200m, turn left onto Hospital Rd' },
          { x: 51, y: 44, turn: 'Approaching Patient Doorstep' },
          { x: 48, y: 46, turn: 'Ambulance Arrived at Patient Location' }
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
      this.setupEscKey();
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

    setupEscKey() {
      if (typeof document !== 'undefined') {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.isFullscreen) {
            this.exitFullscreen();
          }
        });
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
    // 2. GOOGLE MAPS VISUAL ENGINE & FULLSCREEN
    // -------------------------------------------------------------
    initMap(containerId) {
      if (typeof document === 'undefined') return;
      const container = document.getElementById(containerId);
      if (!container) return;

      this.renderGoogleMap(containerId);
      this.updateUiCards();
    }

    renderAllContainers() {
      ['patientLiveGpsMap', 'sosEmergencyLiveMap', 'adminLiveFleetMap'].forEach(id => {
        const el = document.getElementById(id);
        if (el) this.renderGoogleMap(id);
      });
    }

    toggleFullscreen(containerId) {
      this.isFullscreen = !this.isFullscreen;
      const container = document.getElementById(containerId);
      if (!container) return;

      if (this.isFullscreen) {
        container.classList.add('map-fullscreen-active');
        document.body.style.overflow = 'hidden';
        if (global.toast) global.toast('⛶ Fullscreen Mode (Press ESC to exit)');
      } else {
        container.classList.remove('map-fullscreen-active');
        document.body.style.overflow = '';
      }

      this.renderGoogleMap(containerId);
    }

    exitFullscreen() {
      this.isFullscreen = false;
      document.querySelectorAll('.map-fullscreen-active').forEach(el => el.classList.remove('map-fullscreen-active'));
      document.body.style.overflow = '';
      this.renderAllContainers();
    }

    setMapMode(mode, containerId) {
      this.mapMode = mode;
      this.renderGoogleMap(containerId);
    }

    toggleTraffic(containerId) {
      this.trafficEnabled = !this.trafficEnabled;
      this.renderGoogleMap(containerId);
      if (global.toast) global.toast(this.trafficEnabled ? '🚦 Live Traffic Layer ON' : '⚪ Traffic Layer OFF');
    }

    zoomIn(containerId) {
      if (this.zoomLevel < 1.6) {
        this.zoomLevel += 0.2;
        this.renderGoogleMap(containerId);
      }
    }

    zoomOut(containerId) {
      if (this.zoomLevel > 0.8) {
        this.zoomLevel -= 0.2;
        this.renderGoogleMap(containerId);
      }
    }

    recenterMap(containerId) {
      this.zoomLevel = 1;
      this.selectedHospital = null;
      this.renderGoogleMap(containerId);
      if (global.toast) global.toast('🎯 Map centered on your live GPS location.');
    }

    renderGoogleMap(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const pPos = this.dispatchState.patientPos;
      const ambPos = this.dispatchState.ambulancePos;
      const isDispatched = this.dispatchState.isActive;
      const stage = this.dispatchState.stage;
      const currentStep = this.dispatchState.routePoints[this.dispatchState.stepIndex] || this.dispatchState.routePoints[0];

      // Google Maps Palette Definitions
      const isSat = (this.mapMode === 'satellite');
      const isTerrain = (this.mapMode === 'terrain');

      const bgColor = isSat ? '#141d26' : (isTerrain ? '#f4f1ea' : '#f2efe9');
      const landColor = isSat ? '#1e293b' : (isTerrain ? '#e8e5dc' : '#ede8e1');
      const highwayFill = isSat ? '#ea580c' : '#fbd561';
      const highwayStroke = isSat ? '#c2410c' : '#e6a817';
      const roadFill = isSat ? '#475569' : '#ffffff';
      const roadStroke = isSat ? '#334155' : '#cbd5e1';
      const waterColor = isSat ? '#0284c7' : '#aadaff';
      const parkColor = isSat ? '#14532d' : '#cdeece';

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;min-height:360px;background:${bgColor};border-radius:${this.isFullscreen ? '0' : '14px'};overflow:hidden;box-shadow:${this.isFullscreen ? 'none' : '0 4px 20px rgba(0,0,0,0.12)'};font-family:'Plus Jakarta Sans',Roboto,Arial,sans-serif;user-select:none;">
          
          <!-- GOOGLE MAPS FLOATING TOP SEARCH / LOCATION BAR -->
          <div style="position:absolute;top:12px;left:14px;right:14px;z-index:30;display:flex;justify-content:space-between;align-items:center;pointer-events:none;gap:10px;">
            
            <!-- SEARCH PILL -->
            <div style="pointer-events:auto;background:#ffffff;border-radius:28px;box-shadow:0 2px 8px rgba(0,0,0,0.22);padding:7px 16px;display:flex;align-items:center;gap:10px;max-width:380px;border:1px solid #e2e8f0;">
              <span style="font-size:16px;color:#1a73e8;">📍</span>
              <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                <strong style="color:#202124;font-size:12.5px;display:block;overflow:hidden;text-overflow:ellipsis;">Kondapalli Sector 4, Krishna Dist</strong>
                <small style="color:#5f6368;font-size:10px;">${this.patientCoords.lat.toFixed(4)}° N, ${this.patientCoords.lng.toFixed(4)}° E · GPS 4G Live</small>
              </div>
            </div>

            <!-- FULLSCREEN & EXIT CONTROLS -->
            <div style="pointer-events:auto;display:flex;align-items:center;gap:6px;">
              <button onclick="gpsTrackingController.toggleFullscreen('${containerId}')" title="${this.isFullscreen ? 'Exit Fullscreen (ESC)' : 'Full Screen Map'}" style="background:#ffffff;border:none;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,0.22);padding:7px 14px;font-size:12px;font-weight:700;color:#1a73e8;cursor:pointer;display:flex;align-items:center;gap:6px;border:1px solid #e2e8f0;transition:all 0.2s ease;">
                <span style="font-size:15px;">${this.isFullscreen ? '✕' : '⛶'}</span>
                <span>${this.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
              </button>
            </div>
          </div>

          <!-- GOOGLE MAPS FLOATING LAYER SWITCHER (MAP / SATELLITE / TERRAIN) -->
          <div style="position:absolute;top:70px;left:14px;z-index:30;display:flex;background:#ffffff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.2);overflow:hidden;border:1px solid #dadce0;">
            <button onclick="gpsTrackingController.setMapMode('streets', '${containerId}')" style="background:${this.mapMode === 'streets' ? '#e8f0fe' : '#ffffff'};color:${this.mapMode === 'streets' ? '#1a73e8' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;border-right:1px solid #dadce0;">
              🗺️ Map
            </button>
            <button onclick="gpsTrackingController.setMapMode('satellite', '${containerId}')" style="background:${this.mapMode === 'satellite' ? '#e8f0fe' : '#ffffff'};color:${this.mapMode === 'satellite' ? '#1a73e8' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;border-right:1px solid #dadce0;">
              🛰️ Satellite
            </button>
            <button onclick="gpsTrackingController.toggleTraffic('${containerId}')" style="background:${this.trafficEnabled ? '#e6f4ea' : '#ffffff'};color:${this.trafficEnabled ? '#137333' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;">
              🚦 Traffic
            </button>
          </div>

          <!-- TURN-BY-TURN NAVIGATION PROMPT (WHEN 108 DISPATCH ACTIVE) -->
          ${isDispatched ? `
            <div style="position:absolute;top:70px;right:14px;z-index:30;background:#1a73e8;color:#ffffff;border-radius:12px;box-shadow:0 4px 14px rgba(26,115,232,0.45);padding:8px 14px;display:flex;align-items:center;gap:10px;max-width:320px;animation:slideDown 0.3s ease;">
              <span style="font-size:22px;">↗️</span>
              <div>
                <strong style="font-size:12px;display:block;">${currentStep.turn}</strong>
                <small style="opacity:0.9;font-size:10px;">ETA: <strong>${this.dispatchState.etaMinutes}m ${this.dispatchState.etaSeconds}s</strong> · ${this.dispatchState.distanceKm} km</small>
              </div>
            </div>
          ` : ''}

          <!-- GOOGLE MAPS SVG VECTOR LANDSCAPE -->
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;z-index:2;transform:scale(${this.zoomLevel});transform-origin:50% 50%;transition:transform 0.3s ease;">
            
            <!-- Base Land Polygon -->
            <rect x="0" y="0" width="100" height="100" fill="${landColor}" />

            <!-- Rural Agricultural Grids & Kondapalli Reserve Park -->
            <rect x="4" y="4" width="40" height="42" rx="3" fill="${parkColor}" stroke="#b2dfdb" stroke-width="0.3" />
            <text x="6" y="9" fill="${isSat ? '#86efac' : '#2e7d32'}" font-size="2.4" font-weight="700">🌲 Kondapalli Reserve Forest</text>

            <rect x="54" y="52" width="42" height="44" rx="3" fill="${parkColor}" stroke="#b2dfdb" stroke-width="0.3" />
            <text x="56" y="57" fill="${isSat ? '#86efac' : '#2e7d32'}" font-size="2.4" font-weight="700">🌾 Krishna Valley Farmlands</text>

            <!-- Krishna River & Waterway -->
            <path d="M 0,86 Q 30,76 60,84 T 100,72" fill="none" stroke="${waterColor}" stroke-width="7" stroke-linecap="round" />
            <path d="M 0,86 Q 30,76 60,84 T 100,72" fill="none" stroke="#64b5f6" stroke-width="1.5" stroke-dasharray="4,4" />
            <text x="28" y="84" fill="#1565c0" font-size="2.2" font-weight="700" font-style="italic">≋ Krishna River (Water Basin)</text>

            <!-- Residential Sectors / Urban Blocks -->
            <rect x="48" y="14" width="22" height="14" rx="1.5" fill="#fdfbf7" stroke="#e0e0e0" stroke-width="0.3" />
            <text x="50" y="22" fill="#757575" font-size="1.8" font-weight="600">Sector 1 (East)</text>

            <rect x="18" y="48" width="24" height="16" rx="1.5" fill="#fdfbf7" stroke="#e0e0e0" stroke-width="0.3" />
            <text x="20" y="56" fill="#757575" font-size="1.8" font-weight="600">Sector 4 (Central)</text>

            <!-- LOCAL SECONDARY ROADS -->
            <line x1="10" y1="20" x2="90" y2="20" stroke="${roadStroke}" stroke-width="2" />
            <line x1="10" y1="20" x2="90" y2="20" stroke="${roadFill}" stroke-width="1.4" />

            <line x1="30" y1="10" x2="30" y2="80" stroke="${roadStroke}" stroke-width="2" />
            <line x1="30" y1="10" x2="30" y2="80" stroke="${roadFill}" stroke-width="1.4" />

            <line x1="74" y1="26" x2="48" y2="46" stroke="${roadStroke}" stroke-width="2.6" stroke-linecap="round" />
            <line x1="74" y1="26" x2="48" y2="46" stroke="${roadFill}" stroke-width="2" stroke-linecap="round" />

            <line x1="20" y1="72" x2="48" y2="46" stroke="${roadStroke}" stroke-width="2.6" stroke-linecap="round" />
            <line x1="20" y1="72" x2="48" y2="46" stroke="${roadFill}" stroke-width="2" stroke-linecap="round" />

            <!-- NATIONAL HIGHWAY NH-65 (GOOGLE MAPS AUTHENTIC YELLOW HIGHWAY) -->
            <line x1="0" y1="36" x2="100" y2="64" stroke="${highwayStroke}" stroke-width="4.5" stroke-linecap="round" />
            <line x1="0" y1="36" x2="100" y2="64" stroke="${highwayFill}" stroke-width="3.2" stroke-linecap="round" />
            <text x="4" y="34" fill="#9a3412" font-size="2" font-weight="800">🛣️ NH-65 (Vijayawada - Hyderabad Express Highway)</text>

            <!-- LIVE TRAFFIC LAYER OVERLAY (GREEN / ORANGE) -->
            ${this.trafficEnabled ? `
              <line x1="0" y1="36" x2="45" y2="48" stroke="#22c55e" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
              <line x1="45" y1="48" x2="70" y2="55" stroke="#f97316" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
              <line x1="70" y1="55" x2="100" y2="64" stroke="#22c55e" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
            ` : ''}

            <!-- GOOGLE MAPS NAVIGATION BLUE ROUTE (WHEN 108 DISPATCH IS ACTIVE) -->
            ${isDispatched ? `
              <path d="M 74,26 Q 60,34 48,46" fill="none" stroke="#1a73e8" stroke-width="3.2" stroke-linecap="round" opacity="0.95" />
              <path d="M 74,26 Q 60,34 48,46" fill="none" stroke="#8ab4f8" stroke-width="1.4" stroke-dasharray="2,2" stroke-linecap="round" style="animation:dashMove 0.8s linear infinite;" />
            ` : ''}
          </svg>

          <!-- INTERACTIVE GOOGLE MAPS HTML MARKERS -->

          <!-- 1. PATIENT / DESTINATION RED PIN (GOOGLE MAPS STYLE) -->
          <div style="position:absolute;top:${pPos.y}%;left:${pPos.x}%;transform:translate(-50%, -100%);z-index:25;cursor:pointer;text-align:center;" onclick="global.toast('📍 You (Patient Destination) · Kondapalli Sector 4')">
            <div style="position:relative;display:inline-block;">
              <!-- Google Maps Teardrop Marker -->
              <svg width="34" height="44" viewBox="0 0 24 32" fill="none" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="#ea4335"/>
                <circle cx="12" cy="11" r="5" fill="#ffffff"/>
                <circle cx="12" cy="11" r="3" fill="#1a73e8"/>
              </svg>
            </div>
            <div style="background:#ffffff;color:#202124;font-size:10px;font-weight:800;padding:2px 8px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:1px solid #dadce0;white-space:nowrap;margin-top:-6px;">
              📍 You (Patient)
            </div>
          </div>

          <!-- 2. GOOGLE MAPS RED CROSS HOSPITAL MARKERS -->
          ${HOSPITALS_GEO.map(h => `
            <div style="position:absolute;top:${h.y}%;left:${h.x}%;transform:translate(-50%, -100%);z-index:20;cursor:pointer;text-align:center;" onclick="gpsTrackingController.selectHospital('${h.id}', '${containerId}')">
              <div style="width:36px;height:36px;background:#ffffff;border-radius:50%;box-shadow:0 3px 10px rgba(0,0,0,0.25);border:2px solid #ea4335;display:flex;align-items:center;justify-content:center;margin:0 auto;transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                <span style="font-size:18px;">🏥</span>
              </div>
              <div style="background:#ffffff;color:#202124;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.2);border:1px solid #dadce0;white-space:nowrap;margin-top:2px;">
                ${h.name.split(' ')[0]} <span style="color:#137333;">(${h.beds.oxygen} O2)</span>
              </div>
            </div>
          `).join('')}

          <!-- 3. LIVE 108 AMBULANCE NAVIGATION ICON (GOOGLE MAPS NAVIGATION ARROW) -->
          ${isDispatched ? `
            <div style="position:absolute;top:${ambPos.y}%;left:${ambPos.x}%;transform:translate(-50%, -50%);z-index:28;cursor:pointer;text-align:center;transition:all 1.2s cubic-bezier(0.4, 0, 0.2, 1);" onclick="global.toast('🚨 108 Emergency Ambulance En Route')">
              <div style="position:relative;width:52px;height:52px;display:flex;align-items:center;justify-content:center;margin:0 auto;">
                <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(26,115,232,0.3);animation:ambFlash 0.8s infinite;"></div>
                <div style="background:#ffffff;border:2.5px solid #1a73e8;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 16px rgba(26,115,232,0.6);z-index:2;">
                  🚑
                </div>
              </div>
              <div style="background:#1a73e8;color:#ffffff;font-size:10px;font-weight:900;padding:2px 8px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3);white-space:nowrap;margin-top:2px;">
                ${stage === 'arrived' ? '🎉 ARRIVED' : '108 AMBULANCE (AP-16-TX)'}
              </div>
            </div>
          ` : ''}

          <!-- 4. GOOGLE MAPS POPUP CARD (WHEN HOSPITAL IS CLICKED) -->
          ${this.selectedHospital ? `
            <div style="position:absolute;bottom:20px;left:20px;right:20px;max-width:380px;background:#ffffff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,0.3);padding:14px 16px;z-index:40;border:1px solid #dadce0;animation:slideUp 0.3s ease;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <div>
                  <h4 style="margin:0;font-size:14px;font-weight:800;color:#202124;">${this.selectedHospital.name}</h4>
                  <div style="color:#e37400;font-size:11px;font-weight:700;margin-top:2px;">${this.selectedHospital.rating} · ${this.selectedHospital.type}</div>
                </div>
                <button onclick="gpsTrackingController.closeHospitalPopup('${containerId}')" style="background:none;border:none;font-size:18px;color:#5f6368;cursor:pointer;padding:2px 6px;">✕</button>
              </div>
              
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;background:#f8f9fa;padding:8px;border-radius:8px;margin-bottom:10px;text-align:center;">
                <div><small style="color:#5f6368;font-size:10px;display:block;">Gen Beds</small><strong style="color:#137333;font-size:13px;">${this.selectedHospital.beds.gen} Avail</strong></div>
                <div><small style="color:#5f6368;font-size:10px;display:block;">ICU Beds</small><strong style="color:#d93025;font-size:13px;">${this.selectedHospital.beds.icu} Avail</strong></div>
                <div><small style="color:#5f6368;font-size:10px;display:block;">Oxygen</small><strong style="color:#1a73e8;font-size:13px;">${this.selectedHospital.beds.oxygen} Units</strong></div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:11px;color:#5f6368;">🩺 On Duty: ${this.selectedHospital.doctor.split(',')[0]}</span>
                <a href="tel:${this.selectedHospital.phone}" style="background:#1a73e8;color:#ffffff;text-decoration:none;padding:6px 14px;border-radius:20px;font-size:11.5px;font-weight:700;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(26,115,232,0.4);">
                  📞 Call
                </a>
              </div>
            </div>
          ` : ''}

          <!-- GOOGLE MAPS FLOATING BOTTOM-RIGHT ZOOM & COMPASS CONTROLS -->
          <div style="position:absolute;bottom:20px;right:14px;z-index:30;display:flex;flex-direction:column;gap:6px;">
            <div style="background:#ffffff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.22);overflow:hidden;border:1px solid #dadce0;display:flex;flex-direction:column;">
              <button onclick="gpsTrackingController.zoomIn('${containerId}')" title="Zoom in" style="background:#ffffff;border:none;width:34px;height:34px;font-size:18px;font-weight:700;color:#5f6368;cursor:pointer;border-bottom:1px solid #dadce0;">+</button>
              <button onclick="gpsTrackingController.zoomOut('${containerId}')" title="Zoom out" style="background:#ffffff;border:none;width:34px;height:34px;font-size:18px;font-weight:700;color:#5f6368;cursor:pointer;">−</button>
            </div>
            <button onclick="gpsTrackingController.recenterMap('${containerId}')" title="My Location" style="background:#ffffff;border:none;border-radius:50%;width:36px;height:36px;box-shadow:0 2px 6px rgba(0,0,0,0.22);font-size:16px;color:#1a73e8;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px solid #dadce0;">
              🎯
            </button>
          </div>

          <!-- GOOGLE MAPS BOTTOM ATTRIBUTION PILL -->
          <div style="position:absolute;bottom:4px;left:14px;z-index:20;background:rgba(255,255,255,0.7);padding:2px 8px;border-radius:4px;font-size:9.5px;color:#5f6368;">
            Map data ©2026 Swasthya Setu · Ayushman Bharat Digital Gateway
          </div>

        </div>
      `;
    }

    selectHospital(hospId, containerId) {
      this.selectedHospital = HOSPITALS_GEO.find(h => h.id === hospId) || null;
      this.renderGoogleMap(containerId);
    }

    closeHospitalPopup(containerId) {
      this.selectedHospital = null;
      this.renderGoogleMap(containerId);
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
        global.toast('🚨 108 Ambulance AP-16-TX-1081 Dispatched! Live Navigation Active.');
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
      this.dispatchState.ambulancePos = { x: 74, y: 26 };

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
          statusBadge.style.background = 'rgba(26, 115, 232, 0.2)';
          statusBadge.style.color = '#1a73e8';
        } else {
          statusBadge.innerHTML = '🚨 Emergency Vehicle En Route (Lights & Siren Active)';
          statusBadge.style.background = 'rgba(234, 67, 53, 0.2)';
          statusBadge.style.color = '#ea4335';
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
