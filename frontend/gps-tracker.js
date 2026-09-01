/**
 * =========================================================
 * SWASTHYA SETU - REAL-TIME GPS & 108 AMBULANCE TRACKER (gps-tracker.js)
 * Genuine Google Maps Tiled Navigation Engine (Roads, Satellite, Terrain)
 * 100% Fullscreen Mode with Instant Minimize Controls & 108 Dispatch
 * =========================================================
 */

(function(global) {
  'use strict';

  // Regional Center: Kondapalli / Ibrahimpatnam / Vijayawada / AIIMS Mangalagiri
  const DEFAULT_REGION = {
    lat: 16.6186,
    lng: 80.5364,
    zoom: 13
  };

  const HOSPITALS_GEO = [
    {
      id: 'HOSP-01',
      name: 'Kondapalli Primary Health Centre (PHC)',
      type: 'PHC (24x7 Emergency & Maternity)',
      lat: 16.6225,
      lng: 80.5412,
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
      rating: '4.9 ★★★★★',
      beds: { gen: 74, icu: 12, oxygen: 45 },
      phone: '0866-257000',
      doctor: 'Emergency Trauma Team'
    },
    {
      id: 'HOSP-04',
      name: 'AIIMS Mangalagiri (Apex Medical Institute)',
      type: 'National Super-Specialty Hospital',
      lat: 16.4380,
      lng: 80.5750,
      rating: '5.0 ★★★★★',
      beds: { gen: 120, icu: 35, oxygen: 90 },
      phone: '08645-293900',
      doctor: 'AIIMS Critical Care Unit'
    }
  ];

  // Tile Providers (Google Maps Official Tiles & CartoDB High-Speed CDN)
  const TILE_LAYERS = {
    streets: {
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      fallbackUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      maxZoom: 20,
      attribution: '© Google Maps · Swasthya Setu ABDM Grid'
    },
    satellite: {
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', // Google Hybrid Satellite
      fallbackUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 20,
      attribution: '© Google Satellite Imagery · ABDM Grid'
    },
    terrain: {
      url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', // Google Terrain
      fallbackUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoom: 20,
      attribution: '© Google Maps Terrain · ABDM Grid'
    }
  };

  class GpsTrackingController {
    constructor() {
      this.maps = {}; // Store Leaflet instances by container ID
      this.currentLayerKey = 'streets';
      this.patientCoords = { lat: DEFAULT_REGION.lat, lng: DEFAULT_REGION.lng };
      this.hasRealGps = false;
      this.isFullscreen = false;
      
      this.dispatchState = {
        isActive: false,
        stage: 'idle', // 'idle' | 'enroute' | 'arrived'
        ambulanceCoords: null,
        routePath: [],
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

      this.ensureLeafletLoaded();
      this.initGeolocation();
      this.setupEscKey();
    }

    ensureLeafletLoaded() {
      if (typeof document === 'undefined') return;

      // Check Leaflet CSS
      if (!document.getElementById('leafletCssTag')) {
        const link = document.createElement('link');
        link.id = 'leafletCssTag';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Check Leaflet Script
      if (typeof global.L === 'undefined' && !document.getElementById('leafletJsTag')) {
        const script = document.createElement('script');
        script.id = 'leafletJsTag';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
          console.log('[GPS Engine] Leaflet Maps Library Loaded Successfully.');
          this.initMap('patientLiveGpsMap');
        };
        document.head.appendChild(script);
      }
    }

    initGeolocation() {
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.patientCoords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };
            this.hasRealGps = true;
            console.log('[GPS] Acquired live device location:', this.patientCoords);
            this.updateAllMapLocations();
          },
          (err) => {
            console.warn('[GPS] Geolocation default regional center:', err.message);
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
      }
    }

    
    openGpsMapModal() {
      const modal = document.getElementById('liveGpsTrackingModal');
      if (modal) {
        modal.style.display = 'flex';
        if (typeof document !== 'undefined' && document.body) {
          document.body.style.overflow = 'hidden';
        }
      }
      setTimeout(() => {
        this.initMap('patientLiveGpsMap');
        const inst = this.maps['patientLiveGpsMap'];
        if (inst && inst.map) {
          inst.map.invalidateSize();
          inst.map.setView([this.patientCoords.lat, this.patientCoords.lng], DEFAULT_REGION.zoom);
        }
      }, 150);
    }

    closeGpsMapModal() {
      const modal = document.getElementById('liveGpsTrackingModal');
      if (modal) {
        modal.style.display = 'none';
        if (typeof document !== 'undefined' && document.body) {
          document.body.style.overflow = '';
        }
      }
    }

    setupEscKey() {
      if (typeof document !== 'undefined') {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.closeGpsMapModal();
            if (this.isFullscreen) this.exitFullscreen();
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
    // 2. LEAFLET GOOGLE MAPS ENGINE
    // -------------------------------------------------------------
    initMap(containerId) {
      if (typeof document === 'undefined') return;
      const container = document.getElementById(containerId);
      if (!container) return;

      // If Leaflet is not yet ready, retry shortly
      if (typeof global.L === 'undefined') {
        setTimeout(() => this.initMap(containerId), 200);
        return;
      }

      try {
        // Setup wrapper structure with Google Maps HUD
        if (!container.querySelector('.gmaps-leaflet-canvas')) {
          this.buildMapHtmlStructure(container, containerId);
        }

        const mapCanvasEl = container.querySelector('.gmaps-leaflet-canvas');
        if (!mapCanvasEl) return;

        // Clean up existing map instance if any
        if (this.maps[containerId]) {
          try { this.maps[containerId].map.remove(); } catch (e) {}
          delete this.maps[containerId];
        }

        const centerLat = this.patientCoords.lat;
        const centerLng = this.patientCoords.lng;

        const map = global.L.map(mapCanvasEl, {
          center: [centerLat, centerLng],
          zoom: DEFAULT_REGION.zoom,
          zoomControl: false,
          attributionControl: false
        });

        // Add Google Maps Tile Layer
        const tileConfig = TILE_LAYERS[this.currentLayerKey] || TILE_LAYERS.streets;
        const tileLayer = global.L.tileLayer(tileConfig.url, {
          maxZoom: tileConfig.maxZoom,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map);

        const instance = {
          map,
          tileLayer,
          patientMarker: null,
          patientPulseCircle: null,
          ambulanceMarker: null,
          routeLine: null,
          hospitalMarkers: []
        };

        // Render Patient Live Location
        this.renderPatientOnMap(instance);

        // Render Hospitals Geo-Pins
        this.renderHospitalsOnMap(instance);

        // If 108 Dispatch is active, render ambulance & route
        if (this.dispatchState.isActive) {
          this.renderDispatchOnMap(instance);
        }

        this.maps[containerId] = instance;

        setTimeout(() => {
          map.invalidateSize();
        }, 250);

      } catch (err) {
        console.error('[GPS Map Error]', err);
      }
    }

    buildMapHtmlStructure(container, containerId) {
      container.style.position = 'relative';
      container.style.overflow = 'hidden';

      container.innerHTML = `
        <!-- GOOGLE MAPS FLOATING TOP HUD -->
        <div class="gmaps-top-hud" style="position:absolute;top:12px;left:14px;right:14px;z-index:999;display:flex;justify-content:space-between;align-items:center;pointer-events:none;gap:10px;">
          
          <!-- SEARCH & ADDRESS PILL -->
          <div style="pointer-events:auto;background:#ffffff;border-radius:28px;box-shadow:0 2px 10px rgba(0,0,0,0.25);padding:7px 16px;display:flex;align-items:center;gap:10px;border:1px solid #dadce0;max-width:380px;">
            <span style="font-size:16px;color:#ea4335;">📍</span>
            <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              <strong style="color:#202124;font-size:12.5px;display:block;overflow:hidden;text-overflow:ellipsis;">Kondapalli, Krishna District</strong>
              <small style="color:#5f6368;font-size:10px;">${this.patientCoords.lat.toFixed(4)}° N, ${this.patientCoords.lng.toFixed(4)}° E · GPS Live</small>
            </div>
          </div>

          <!-- FULLSCREEN & MINIMIZE CONTROLS -->
          <div style="pointer-events:auto;display:flex;align-items:center;gap:8px;">
            <button onclick="gpsTrackingController.toggleFullscreen('${containerId}')" class="gmaps-fs-btn" style="background:#ffffff;border:none;border-radius:20px;box-shadow:0 2px 10px rgba(0,0,0,0.25);padding:7px 16px;font-size:12.5px;font-weight:700;color:#1a73e8;cursor:pointer;display:flex;align-items:center;gap:6px;border:1px solid #dadce0;transition:all 0.2s ease;">
              <span class="fs-icon" style="font-size:16px;">⛶</span>
              <span class="fs-text">Fullscreen</span>
            </button>
          </div>
        </div>

        <!-- GOOGLE MAPS LAYER SWITCHER (MAP / SATELLITE / TERRAIN) -->
        <div style="position:absolute;top:70px;left:14px;z-index:999;display:flex;background:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);overflow:hidden;border:1px solid #dadce0;">
          <button onclick="gpsTrackingController.switchTileLayer('streets', '${containerId}')" style="background:${this.currentLayerKey === 'streets' ? '#e8f0fe' : '#ffffff'};color:${this.currentLayerKey === 'streets' ? '#1a73e8' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;border-right:1px solid #dadce0;">
            🗺️ Map
          </button>
          <button onclick="gpsTrackingController.switchTileLayer('satellite', '${containerId}')" style="background:${this.currentLayerKey === 'satellite' ? '#e8f0fe' : '#ffffff'};color:${this.currentLayerKey === 'satellite' ? '#1a73e8' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;border-right:1px solid #dadce0;">
            🛰️ Satellite
          </button>
          <button onclick="gpsTrackingController.switchTileLayer('terrain', '${containerId}')" style="background:${this.currentLayerKey === 'terrain' ? '#e8f0fe' : '#ffffff'};color:${this.currentLayerKey === 'terrain' ? '#1a73e8' : '#3c4043'};border:none;padding:6px 12px;font-size:11.5px;font-weight:700;cursor:pointer;">
            🏔️ Terrain
          </button>
        </div>

        <!-- FLOATING BOTTOM RIGHT ZOOM & RECENTER -->
        <div style="position:absolute;bottom:24px;right:14px;z-index:999;display:flex;flex-direction:column;gap:8px;">
          <div style="background:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.25);overflow:hidden;border:1px solid #dadce0;display:flex;flex-direction:column;">
            <button onclick="gpsTrackingController.zoomIn('${containerId}')" title="Zoom in" style="background:#ffffff;border:none;width:38px;height:38px;font-size:20px;font-weight:700;color:#5f6368;cursor:pointer;border-bottom:1px solid #dadce0;display:flex;align-items:center;justify-content:center;">+</button>
            <button onclick="gpsTrackingController.zoomOut('${containerId}')" title="Zoom out" style="background:#ffffff;border:none;width:38px;height:38px;font-size:20px;font-weight:700;color:#5f6368;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
          </div>
          <button onclick="gpsTrackingController.recenterMap('${containerId}')" title="My Location" style="background:#ffffff;border:none;border-radius:50%;width:40px;height:40px;box-shadow:0 2px 8px rgba(0,0,0,0.25);font-size:18px;color:#1a73e8;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px solid #dadce0;">
            🎯
          </button>
        </div>

        <!-- GOOGLE ATTRIBUTION -->
        <div style="position:absolute;bottom:4px;left:14px;z-index:998;background:rgba(255,255,255,0.85);padding:2px 8px;border-radius:4px;font-size:10px;color:#5f6368;">
          Google Maps · Swasthya Setu Telemedicine Grid
        </div>

        <!-- LEAFLET CANVAS CONTAINER -->
        <div class="gmaps-leaflet-canvas" style="width:100%;height:100%;min-height:360px;"></div>
      `;
    }

    switchTileLayer(layerKey, containerId) {
      this.currentLayerKey = layerKey;
      const inst = this.maps[containerId];
      if (inst && inst.map && inst.tileLayer) {
        inst.map.removeLayer(inst.tileLayer);
        const tileConfig = TILE_LAYERS[layerKey] || TILE_LAYERS.streets;
        inst.tileLayer = global.L.tileLayer(tileConfig.url, {
          maxZoom: tileConfig.maxZoom,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(inst.map);
      }
      this.initMap(containerId);
    }

    renderPatientOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      const pLat = this.patientCoords.lat;
      const pLng = this.patientCoords.lng;

      // Google Maps Authentic Red Teardrop Marker
      const patientIcon = global.L.divIcon({
        className: 'custom-patient-pin',
        html: `
          <div style="position:relative;text-align:center;transform:translate(-50%, -100%);">
            <svg width="34" height="44" viewBox="0 0 24 32" fill="none" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.4));">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="#ea4335"/>
              <circle cx="12" cy="11" r="5" fill="#ffffff"/>
              <circle cx="12" cy="11" r="3" fill="#1a73e8"/>
            </svg>
            <div style="background:#ffffff;color:#202124;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.25);border:1px solid #dadce0;white-space:nowrap;margin-top:-4px;">
              📍 You (Patient)
            </div>
          </div>
        `,
        iconSize: [0, 0]
      });

      instance.patientMarker = global.L.marker([pLat, pLng], { icon: patientIcon }).addTo(instance.map);
      
      // Add pulsing accuracy circle
      instance.patientPulseCircle = global.L.circle([pLat, pLng], {
        radius: 350,
        color: '#1a73e8',
        fillColor: '#1a73e8',
        fillOpacity: 0.15,
        weight: 1.5
      }).addTo(instance.map);

      instance.patientMarker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;min-width:180px;">
          <strong style="color:#ea4335;font-size:13px;display:block;">📍 Live Patient GPS Location</strong>
          <small style="color:#5f6368;display:block;margin-top:2px;">${pLat.toFixed(4)}° N, ${pLng.toFixed(4)}° E</small>
          <div style="font-size:11px;color:#137333;font-weight:700;margin-top:4px;">🟢 4G Network & GPS Active</div>
        </div>
      `);
    }

    renderHospitalsOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      HOSPITALS_GEO.forEach(h => {
        const hospIcon = global.L.divIcon({
          className: 'custom-hosp-pin',
          html: `
            <div style="position:relative;text-align:center;transform:translate(-50%, -100%);">
              <div style="width:36px;height:36px;background:#ffffff;border-radius:50%;box-shadow:0 3px 10px rgba(0,0,0,0.3);border:2px solid #ea4335;display:flex;align-items:center;justify-content:center;margin:0 auto;cursor:pointer;transition:transform 0.2s ease;">
                <span style="font-size:18px;">🏥</span>
              </div>
              <div style="background:#ffffff;color:#202124;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.25);border:1px solid #dadce0;white-space:nowrap;margin-top:2px;">
                ${h.name.split(' ')[0]} <span style="color:#137333;">(${h.beds.oxygen} O2)</span>
              </div>
            </div>
          `,
          iconSize: [0, 0]
        });

        const marker = global.L.marker([h.lat, h.lng], { icon: hospIcon }).addTo(instance.map);
        
        marker.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;min-width:220px;">
            <strong style="color:#202124;font-size:14px;display:block;">${h.name}</strong>
            <div style="color:#e37400;font-size:11.5px;font-weight:700;margin-top:2px;">${h.rating} · ${h.type}</div>
            <div style="background:#f8f9fa;border-radius:8px;padding:8px;margin:8px 0;font-size:11.5px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px;text-align:center;">
              <div><small style="color:#5f6368;font-size:9.5px;display:block;">Gen Beds</small><strong style="color:#137333;">${h.beds.gen} Avail</strong></div>
              <div><small style="color:#5f6368;font-size:9.5px;display:block;">ICU Beds</small><strong style="color:#d93025;">${h.beds.icu} Avail</strong></div>
              <div><small style="color:#5f6368;font-size:9.5px;display:block;">Oxygen</small><strong style="color:#1a73e8;">${h.beds.oxygen} Units</strong></div>
            </div>
            <div style="font-size:11px;color:#5f6368;margin-bottom:8px;">🩺 <strong>On Duty:</strong> ${h.doctor}</div>
            <a href="tel:${h.phone}" style="display:inline-block;background:#1a73e8;color:#ffffff;text-decoration:none;padding:6px 14px;border-radius:18px;font-size:11.5px;font-weight:700;box-shadow:0 2px 6px rgba(26,115,232,0.4);">
              📞 Call ${h.phone}
            </a>
          </div>
        `);

        instance.hospitalMarkers.push(marker);
      });
    }

    renderDispatchOnMap(instance) {
      if (!instance || !instance.map || typeof global.L === 'undefined') return;

      const ambCoords = this.dispatchState.ambulanceCoords || [HOSPITALS_GEO[0].lat, HOSPITALS_GEO[0].lng];

      const ambIcon = global.L.divIcon({
        className: 'custom-amb-pin',
        html: `
          <div style="position:relative;text-align:center;transform:translate(-50%, -50%);">
            <div style="position:relative;width:52px;height:52px;display:flex;align-items:center;justify-content:center;margin:0 auto;">
              <div style="position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(26,115,232,0.3);animation:ambFlash 0.8s infinite;"></div>
              <div style="background:#ffffff;border:2.5px solid #1a73e8;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 16px rgba(26,115,232,0.6);z-index:2;">
                🚑
              </div>
            </div>
            <div style="background:#1a73e8;color:#ffffff;font-size:10px;font-weight:900;padding:2px 8px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3);white-space:nowrap;margin-top:2px;">
              ${this.dispatchState.stage === 'arrived' ? '🎉 ARRIVED' : '108 AMBULANCE (EN ROUTE)'}
            </div>
          </div>
        `,
        iconSize: [0, 0]
      });

      if (!instance.ambulanceMarker) {
        instance.ambulanceMarker = global.L.marker(ambCoords, { icon: ambIcon, zIndexOffset: 1000 }).addTo(instance.map);
      } else {
        instance.ambulanceMarker.setLatLng(ambCoords);
      }

      if (this.dispatchState.routePath.length) {
        if (!instance.routeLine) {
          instance.routeLine = global.L.polyline(this.dispatchState.routePath, {
            color: '#1a73e8',
            weight: 5,
            opacity: 0.9,
            dashArray: '8, 8',
            lineJoin: 'round'
          }).addTo(instance.map);
        } else {
          instance.routeLine.setLatLngs(this.dispatchState.routePath);
        }
      }
    }

    // -------------------------------------------------------------
    // 3. FULLSCREEN MODE WITH ROCK-SOLID MINIMIZE
    // -------------------------------------------------------------
    toggleFullscreen(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        container.classList.add('map-fullscreen-active');
        document.body.style.overflow = 'hidden';

        // Update button text & icon
        const fsBtnText = container.querySelector('.fs-text');
        const fsBtnIcon = container.querySelector('.fs-icon');
        if (fsBtnText) fsBtnText.textContent = 'Minimize / Exit (ESC)';
        if (fsBtnIcon) fsBtnIcon.textContent = '✕';

        if (global.toast) global.toast('⛶ Fullscreen Active (Click Minimize or press ESC)');
      } else {
        container.classList.remove('map-fullscreen-active');
        document.body.style.overflow = '';

        const fsBtnText = container.querySelector('.fs-text');
        const fsBtnIcon = container.querySelector('.fs-icon');
        if (fsBtnText) fsBtnText.textContent = 'Fullscreen';
        if (fsBtnIcon) fsBtnIcon.textContent = '⛶';
      }

      // Trigger map canvas resize
      const inst = this.maps[containerId];
      if (inst && inst.map) {
        setTimeout(() => {
          inst.map.invalidateSize();
          inst.map.setView([this.patientCoords.lat, this.patientCoords.lng], this.isFullscreen ? 14 : DEFAULT_REGION.zoom);
        }, 150);
      }
    }

    exitFullscreen() {
      this.isFullscreen = false;
      document.querySelectorAll('.map-fullscreen-active').forEach(el => {
        el.classList.remove('map-fullscreen-active');
        const fsBtnText = el.querySelector('.fs-text');
        const fsBtnIcon = el.querySelector('.fs-icon');
        if (fsBtnText) fsBtnText.textContent = 'Fullscreen';
        if (fsBtnIcon) fsBtnIcon.textContent = '⛶';
      });
      document.body.style.overflow = '';

      Object.values(this.maps).forEach(inst => {
        if (inst && inst.map) {
          setTimeout(() => inst.map.invalidateSize(), 150);
        }
      });
    }

    zoomIn(containerId) {
      const inst = this.maps[containerId];
      if (inst && inst.map) inst.map.zoomIn();
    }

    zoomOut(containerId) {
      const inst = this.maps[containerId];
      if (inst && inst.map) inst.map.zoomOut();
    }

    recenterMap(containerId) {
      const inst = this.maps[containerId];
      if (inst && inst.map) {
        inst.map.setView([this.patientCoords.lat, this.patientCoords.lng], DEFAULT_REGION.zoom);
        if (global.toast) global.toast('🎯 Centered on your live GPS location');
      }
    }

    updateAllMapLocations() {
      Object.keys(this.maps).forEach(id => {
        const inst = this.maps[id];
        if (inst && inst.map) {
          if (inst.patientMarker) inst.patientMarker.setLatLng([this.patientCoords.lat, this.patientCoords.lng]);
          if (inst.patientPulseCircle) inst.patientPulseCircle.setLatLng([this.patientCoords.lat, this.patientCoords.lng]);
          inst.map.setView([this.patientCoords.lat, this.patientCoords.lng]);
          inst.map.invalidateSize();
        }
      });
    }

    // -------------------------------------------------------------
    // 4. 108 AMBULANCE DISPATCH & LIVE ANIMATED ROUTING
    // -------------------------------------------------------------
    async startAmbulanceDispatch() {
      if (this.dispatchState.isActive) return;

      const pLat = this.patientCoords.lat;
      const pLng = this.patientCoords.lng;
      
      // Select closest healthcare base
      let nearestHosp = HOSPITALS_GEO[0];
      let minHospDist = Infinity;
      HOSPITALS_GEO.forEach(h => {
        const d = this.calculateDistance(h.lat, h.lng, pLat, pLng);
        if (d < minHospDist) {
          minHospDist = d;
          nearestHosp = h;
        }
      });

      this.dispatchState.isActive = true;
      this.dispatchState.stage = 'enroute';
      this.dispatchState.stepIndex = 0;
      this.dispatchState.distanceKm = minHospDist || 3.4;
      this.dispatchState.etaMinutes = Math.max(2, Math.round((minHospDist || 3.4) * 1.5));
      this.dispatchState.etaSeconds = 30;

      this.openGpsMapModal();
      this.updateUiCards();

      if (global.toast) {
        global.toast('🚨 108 Ambulance Dispatched! Calculating Real Road Driving Route...');
      }

      // 1. Fetch Real Driving Road Route from OSRM (Real Highway & Streets)
      let roadCoords = [];
      try {
        const osrmUrl = 'https://router.project-osrm.org/route/v1/driving/' + nearestHosp.lng + ',' + nearestHosp.lat + ';' + pLng + ',' + pLat + '?overview=full&geometries=geojson';
        const res = await fetch(osrmUrl);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          this.dispatchState.distanceKm = Number((route.distance / 1000).toFixed(2));
          this.dispatchState.etaMinutes = Math.max(1, Math.round(route.duration / 60));
          this.dispatchState.etaSeconds = 0;

          // Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
          const rawPoints = route.geometry.coordinates.map(c => [c[1], c[0]]);

          // Sample road points smoothly into ~30-40 animation steps
          const totalPoints = rawPoints.length;
          const targetSteps = Math.min(45, Math.max(20, Math.floor(totalPoints / 10)));
          const sampled = [];
          for (let i = 0; i < targetSteps; i++) {
            const idx = Math.floor((i / (targetSteps - 1)) * (totalPoints - 1));
            sampled.push(rawPoints[idx]);
          }
          roadCoords = sampled;
          console.log('[GPS Real Road Route] Successfully loaded ' + rawPoints.length + ' real paved road waypoints');
        }
      } catch (err) {
        console.warn('[GPS Real Road Fallback] Offline or network delay, generating curved road path:', err);
      }

      // Fallback if offline
      if (!roadCoords.length) {
        const steps = 25;
        for (let i = 0; i <= steps; i++) {
          const ratio = i / steps;
          const curve = Math.sin(ratio * Math.PI) * 0.003;
          const lat = nearestHosp.lat + (pLat - nearestHosp.lat) * ratio + curve;
          const lng = nearestHosp.lng + (pLng - nearestHosp.lng) * ratio - curve;
          roadCoords.push([lat, lng]);
        }
      }

      this.dispatchState.routePath = roadCoords;
      this.dispatchState.ambulanceCoords = roadCoords[0];

      Object.values(this.maps).forEach(inst => this.renderDispatchOnMap(inst));
      this.updateUiCards();

      // Fit map bounds to show route
      Object.values(this.maps).forEach(inst => {
        if (inst && inst.map && global.L) {
          try {
            const bounds = global.L.latLngBounds(roadCoords);
            inst.map.fitBounds(bounds, { padding: [50, 50] });
          } catch (e) {}
        }
      });

      if (this.dispatchState.timerId) clearInterval(this.dispatchState.timerId);
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
        
        const progress = currentIdx / totalSteps;
        this.dispatchState.distanceKm = Math.max(0.1, Number((3.4 * (1 - progress)).toFixed(2)));
        
        if (this.dispatchState.etaSeconds > 10) {
          this.dispatchState.etaSeconds -= 15;
        } else if (this.dispatchState.etaMinutes > 0) {
          this.dispatchState.etaMinutes--;
          this.dispatchState.etaSeconds = 45;
        }

        Object.values(this.maps).forEach(inst => {
          if (inst.ambulanceMarker) {
            inst.ambulanceMarker.setLatLng(this.dispatchState.ambulanceCoords);
          }
        });
        this.updateUiCards();
      } else {
        this.dispatchState.stage = 'arrived';
        this.dispatchState.distanceKm = 0;
        this.dispatchState.etaMinutes = 0;
        this.dispatchState.etaSeconds = 0;

        clearInterval(this.dispatchState.timerId);
        this.dispatchState.timerId = null;

        console.log('[GPS Dispatch] 108 Ambulance arrived at patient doorstep!');
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

      Object.values(this.maps).forEach(inst => {
        if (inst.ambulanceMarker) {
          inst.ambulanceMarker.remove();
          inst.ambulanceMarker = null;
        }
        if (inst.routeLine) {
          inst.routeLine.remove();
          inst.routeLine = null;
        }
      });

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
      }, 300);
    });
  }

})(typeof window !== 'undefined' ? window : global);
