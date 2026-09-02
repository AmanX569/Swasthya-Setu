/**
 * =========================================================
 * SWASTHYA SETU - EMERGENCY 108 SERVICE (gps-tracker.js stub)
 * Fast, lightweight 108 direct dispatch & ambulance helper
 * =========================================================
 */
(function(global) {
  'use strict';

  class GpsTrackingController {
    openGpsMapModal() {
      if (typeof window !== 'undefined') window.location.href = 'tel:108';
    }
    closeGpsMapModal() {}
    startAmbulanceDispatch() {
      if (typeof window !== 'undefined') window.location.href = 'tel:108';
    }
    stopAmbulanceDispatch() {}
  }

  global.gpsTrackingController = new GpsTrackingController();
  global.openGpsMapModal = () => global.gpsTrackingController.openGpsMapModal();
  global.closeGpsMapModal = () => global.gpsTrackingController.closeGpsMapModal();
  global.startAmbulanceDispatch = () => global.gpsTrackingController.startAmbulanceDispatch();

  if (typeof window !== 'undefined') {
    window.gpsTrackingController = global.gpsTrackingController;
    window.openGpsMapModal = global.openGpsMapModal;
    window.closeGpsMapModal = global.closeGpsMapModal;
    window.startAmbulanceDispatch = global.startAmbulanceDispatch;
  }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
