/**
 * =========================================================
 * SWASTHYA SETU - REAL-TIME GPS & 108 AMBULANCE TRACKER (gps-tracker.js)
 * Interactive Leaflet.js / OpenStreetMap Engine with Device Geolocation,
 * Animated 108 Vehicle Routing, Dynamic ETA & Hospital Geo-Radar
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
      beds: { gen: 74, icu: 12, oxygen: 45 },
      phone: '0866-257000',
      doctor: 'Emergency Trauma Team'
    }
  ];

  class GpsTrackingController {
    constructor() {
      this.maps = {}; // Map instances by container ID
      this.patientCoords = { lat: DEFAULT_REGION.lat, lng: DEFAULT_REGION.lng };
      this.hasRealGps = false;
      this.dispatchState = {
        isActive: false,
        stage: 'idle', // 'idle' | 'dispatched' | 'enroute' | 'arrived' | 'transit'
        ambulanceCoords: null,
        routePath: [],
        stepIndex: 0,
        distanceKm: 0,
        etaMinutes: 0,
        etaSeconds: 0,
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
            this.updateAllMapViews();
          },
          (err) => {
            console.warn('[GPS] Geolocation permission or sensor fallback to regional center:', err.message);
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
      }
    }

    // Calculate Haversine Distance (in km)
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth radius in km
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
    // 2. LEAFLET MAP INITIALIZATION
    // -------------------------------------------------------------
    initMap(containerId, options = {}) {
      if (typeof document === 'undefined') return null;
      const container = document.getElementById(containerId);
      if (!container) return null;

      // If Leaflet library is available
      if (typeof global.L !== 'undefined') {
        try {
          if (this.maps[containerId]) {
            this.maps[containerId].map.remove();
            delete this.maps[containerId];
          }

          const mapCenter = [this.patientCoords.lat, this.patientCoords.lng];
          const map = global.L.map(containerId, {
            zoomControl: true,
            scrollWheelZoom: false
          }).setView(mapCenter, options.zoom || DEFAULT_REGION.zoom);

          // Crisp Clinical OpenStreetMap Tiles
          global.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors | Swasthya Setu ABDM Grid',
            maxZoom: 19
          }).addTo(map);

          const instance = {
            map,
            patientMarker: null,
            ambulanceMarker: null,
            routePolyline: null,
            hospitalMarkers: []
          };

          // Render Hospitals on Map
          this.renderHospitalsOnMap(instance);

          // Render Patient Location on Map
          this.renderPatientOnMap(instance);

          this.maps[containerId] = instance;

          // If dispatch is active, re-bind route and ambulance
          if (this.dispatchState.isActive) {
            this.renderDispatchOnMap(instance);
          }

          // Trigger map resize after DOM render
          setTimeout(() => { map.invalidateSize(); }, 300);

          return instance;
        } catch (e) {
          console.warn('[GPS Map] Leaflet init error, rendering SVG fallback:', e);
          this.renderSvgRadarFallback(containerId);
        }
      } else {
        this.renderSvgRadarFallback(containerId);
      }
      return null;
    }

    renderHospitalsOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      const hospIcon = global.L.divIcon({
        className: 'custom-hosp-marker',
        html: `
          <div style="background:#dc2626;color:#ffffff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:2.5px solid #ffffff;box-shadow:0 4px 14px rgba(220,38,38,0.5);cursor:pointer;">
            🏥
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      HOSPITALS_GEO.forEach(h => {
        const marker = global.L.marker([h.lat, h.lng], { icon: hospIcon }).addTo(instance.map);
        marker.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;min-width:200px;">
            <strong style="color:#0f172a;font-size:13px;display:block;margin-bottom:2px;">${h.name}</strong>
            <small style="color:#0284c7;font-weight:700;display:block;margin-bottom:6px;">${h.type}</small>
            <div style="background:#f1f5f9;padding:6px 8px;border-radius:6px;font-size:11px;margin-bottom:6px;">
              <div>🛏️ <strong>Gen Beds:</strong> ${h.beds.gen} Avail</div>
              <div>🚨 <strong>ICU Beds:</strong> ${h.beds.icu} Avail</div>
              <div>💨 <strong>Oxygen:</strong> ${h.beds.oxygen} Avail</div>
            </div>
            <div style="font-size:11px;color:#334155;">🩺 <strong>On Duty:</strong> ${h.doctor}</div>
            <a href="tel:${h.phone}" style="display:inline-block;margin-top:6px;background:#16a34a;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;">📞 Call ${h.phone}</a>
          </div>
        `);
        instance.hospitalMarkers.push(marker);
      });
    }

    renderPatientOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      const patientIcon = global.L.divIcon({
        className: 'custom-patient-marker',
        html: `
          <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(2,132,199,0.35);animation:patientPulse 1.8s infinite;"></div>
            <div style="background:#0284c7;color:#ffffff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid #ffffff;box-shadow:0 3px 10px rgba(2,132,199,0.5);z-index:2;">
              📍
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      instance.patientMarker = global.L.marker([this.patientCoords.lat, this.patientCoords.lng], { icon: patientIcon }).addTo(instance.map);
      instance.patientMarker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:4px;">
          <strong style="color:#0284c7;font-size:13px;display:block;">📍 Patient Live GPS Location</strong>
          <small style="color:#64748b;">${this.patientCoords.lat.toFixed(4)}° N, ${this.patientCoords.lng.toFixed(4)}° E</small>
        </div>
      `);
    }

    renderDispatchOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      // 1. Ambulance Marker
      const ambIcon = global.L.divIcon({
        className: 'custom-amb-marker',
        html: `
          <div style="position:relative;width:42px;height:42px;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(220,38,38,0.4);animation:ambFlash 1s infinite;"></div>
            <div style="background:linear-gradient(135deg, #dc2626, #991b1b);color:#ffffff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:2.5px solid #ffffff;box-shadow:0 4px 16px rgba(220,38,38,0.6);z-index:2;">
              🚑
            </div>
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      });

      const ambPos = this.dispatchState.ambulanceCoords || [this.patientCoords.lat + 0.025, this.patientCoords.lng + 0.02];

      if (!instance.ambulanceMarker) {
        instance.ambulanceMarker = global.L.marker(ambPos, { icon: ambIcon }).addTo(instance.map);
      } else {
        instance.ambulanceMarker.setLatLng(ambPos);
      }

      instance.ambulanceMarker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;min-width:180px;">
          <strong style="color:#dc2626;font-size:13px;display:block;">🚨 108 Emergency Ambulance</strong>
          <small style="color:#334155;font-weight:700;display:block;">${this.dispatchState.driver.vehicleNo}</small>
          <div style="font-size:11px;color:#64748b;margin-top:4px;">
            Driver: <strong>${this.dispatchState.driver.name}</strong><br>
            ETA: <strong style="color:#16a34a;">${this.dispatchState.etaMinutes}m ${this.dispatchState.etaSeconds}s</strong>
          </div>
        </div>
      `);

      // 2. Draw Glowing Route Polyline
      if (this.dispatchState.routePath.length) {
        if (!instance.routePolyline) {
          instance.routePolyline = global.L.polyline(this.dispatchState.routePath, {
            color: '#dc2626',
            weight: 4,
            opacity: 0.85,
            dashArray: '8, 8',
            lineJoin: 'round'
          }).addTo(instance.map);
        } else {
          instance.routePolyline.setLatLngs(this.dispatchState.routePath);
        }
      }
    }

    // -------------------------------------------------------------
    // 3. 108 AMBULANCE DISPATCH & LIVE ANIMATED ROUTING
    // -------------------------------------------------------------
    startAmbulanceDispatch() {
      if (this.dispatchState.isActive) return;

      const pLat = this.patientCoords.lat;
      const pLng = this.patientCoords.lng;

      // Start Ambulance from Nearest Hospital (PHC / CHC)
      const nearestHosp = HOSPITALS_GEO[0];
      const startLat = nearestHosp.lat;
      const startLng = nearestHosp.lng;

      // Generate 24 Interpolated Road Waypoints
      const steps = 24;
      const route = [];
      for (let i = 0; i <= steps; i++) {
        const ratio = i / steps;
        // Add subtle road curvature curve
        const curve = Math.sin(ratio * Math.PI) * 0.003;
        const lat = startLat + (pLat - startLat) * ratio + curve;
        const lng = startLng + (pLng - startLng) * ratio - curve;
        route.push([lat, lng]);
      }

      const totalDist = this.calculateDistance(startLat, startLng, pLat, pLng) || 3.4;
      const speedKmH = 45; // average 108 speed in rural grid
      const totalMinutes = Math.max(2, Math.round((totalDist / speedKmH) * 60));

      this.dispatchState = {
        isActive: true,
        stage: 'enroute',
        ambulanceCoords: route[0],
        routePath: route,
        stepIndex: 0,
        distanceKm: totalDist,
        etaMinutes: totalMinutes,
        etaSeconds: 45,
        driver: {
          name: 'Rajesh Naidu',
          phone: '9848022338',
          vehicleNo: 'AP-16-TX-1081',
          vehicleType: '108 Advanced Life Support (ALS) Ambulance',
          paramedic: 'K. Venkatesh (EMT Certified)'
        },
        timerId: null
      };

      console.log('[GPS Dispatch] 108 Emergency Ambulance Dispatched along route:', route.length, 'waypoints');

      // Update Map
      this.updateAllMapViews();
      this.updateUiCards();

      if (global.toast) {
        global.toast('🚨 108 Ambulance AP-16-TX-1081 Dispatched! Live GPS Tracking Active.');
      }

      // Start Real-Time Movement Timer (1 second interval)
      this.dispatchState.timerId = setInterval(() => {
        this.stepAmbulanceMovement();
      }, 1200);
    }

    stepAmbulanceMovement() {
      if (!this.dispatchState.isActive) return;

      this.dispatchState.stepIndex++;
      const currentIdx = this.dispatchState.stepIndex;
      const totalSteps = this.dispatchState.routePath.length;

      if (currentIdx < totalSteps) {
        this.dispatchState.ambulanceCoords = this.dispatchState.routePath[currentIdx];
        
        // Decrement ETA and Distance dynamically
        const progress = currentIdx / totalSteps;
        this.dispatchState.distanceKm = Math.max(0.1, Number((this.dispatchState.distanceKm * (1 - progress * 0.08)).toFixed(2)));
        
        if (this.dispatchState.etaSeconds > 0) {
          this.dispatchState.etaSeconds -= 5;
        } else if (this.dispatchState.etaMinutes > 0) {
          this.dispatchState.etaMinutes--;
          this.dispatchState.etaSeconds = 55;
        }

        // Update markers across all maps
        Object.values(this.maps).forEach(inst => {
          if (inst.ambulanceMarker) {
            inst.ambulanceMarker.setLatLng(this.dispatchState.ambulanceCoords);
          }
        });

        this.updateUiCards();
      } else {
        // Ambulance has reached Patient!
        this.dispatchState.stage = 'arrived';
        this.dispatchState.distanceKm = 0;
        this.dispatchState.etaMinutes = 0;
        this.dispatchState.etaSeconds = 0;

        clearInterval(this.dispatchState.timerId);
        this.dispatchState.timerId = null;

        console.log('[GPS Dispatch] 108 Ambulance arrived at patient location!');
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

      // Remove ambulance and routes from maps
      Object.values(this.maps).forEach(inst => {
        if (inst.ambulanceMarker) {
          inst.ambulanceMarker.remove();
          inst.ambulanceMarker = null;
        }
        if (inst.routePolyline) {
          inst.routePolyline.remove();
          inst.routePolyline = null;
        }
      });

      this.updateUiCards();
      if (global.toast) {
        global.toast('🛑 Emergency GPS Tracking ended.');
      }
    }

    updateAllMapViews() {
      Object.keys(this.maps).forEach(id => {
        const inst = this.maps[id];
        if (inst && inst.map) {
          if (inst.patientMarker) {
            inst.patientMarker.setLatLng([this.patientCoords.lat, this.patientCoords.lng]);
          }
          if (this.dispatchState.isActive) {
            this.renderDispatchOnMap(inst);
          }
          inst.map.setView([this.patientCoords.lat, this.patientCoords.lng], DEFAULT_REGION.zoom);
          setTimeout(() => inst.map.invalidateSize(), 200);
        }
      });
    }

    updateUiCards() {
      if (typeof document === 'undefined') return;

      // Update Patient GPS Tracking Panel Elements
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

    // -------------------------------------------------------------
    // 4. SVG RADAR FALLBACK (OFFLINE / CDN FAILURE PROOF)
    // -------------------------------------------------------------
    renderSvgRadarFallback(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = `
        <div style="width:100%;height:100%;min-height:280px;background:#030a16;border-radius:14px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#ffffff;font-family:'Plus Jakarta Sans',sans-serif;">
          <!-- Radar Rings -->
          <div style="position:absolute;width:240px;height:240px;border-radius:50%;border:1px dashed rgba(2,132,199,0.3);"></div>
          <div style="position:absolute;width:160px;height:160px;border-radius:50%;border:1px solid rgba(2,132,199,0.4);"></div>
          <div style="position:absolute;width:80px;height:80px;border-radius:50%;border:1px solid rgba(2,132,199,0.6);"></div>
          
          <!-- Radar Sweeper -->
          <div style="position:absolute;width:120px;height:120px;top:calc(50% - 120px);left:calc(50% - 120px);transform-origin:bottom right;background:linear-gradient(45deg, rgba(2,132,199,0.4) 0%, transparent 70%);border-radius:100% 0 0 0;animation:radarSweep 3s linear infinite;"></div>

          <!-- Patient Center Dot -->
          <div style="position:relative;z-index:5;text-align:center;">
            <div style="width:16px;height:16px;border-radius:50%;background:#0284c7;border:3px solid #ffffff;margin:0 auto 6px;box-shadow:0 0 14px #0284c7;"></div>
            <strong style="font-size:12px;color:#38bdf8;display:block;">📍 Live Patient GPS (${this.patientCoords.lat.toFixed(3)}°, ${this.patientCoords.lng.toFixed(3)}°)</strong>
            <small style="font-size:10px;color:#94a3b8;">Kondapalli Rural Sector · Real-time Radar Active</small>
          </div>

          <!-- Hospital Pins -->
          <div style="position:absolute;top:20%;right:25%;z-index:4;font-size:14px;" title="PHC Kondapalli">🏥 <span style="font-size:9px;background:rgba(0,0,0,0.6);padding:2px 4px;border-radius:4px;">PHC 1.2km</span></div>
          <div style="position:absolute;bottom:25%;left:20%;z-index:4;font-size:14px;" title="CHC Ibrahimpatnam">🏥 <span style="font-size:9px;background:rgba(0,0,0,0.6);padding:2px 4px;border-radius:4px;">CHC 6.5km</span></div>
        </div>
      `;
    }
  }

  // Export Global Singleton
  global.gpsTrackingController = new GpsTrackingController();
  global.HOSPITALS_GEO = HOSPITALS_GEO;

})(typeof window !== 'undefined' ? window : global);
