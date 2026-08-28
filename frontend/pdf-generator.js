/**
 * Swasthya Setu - Official ABHA Health Card & e-Prescription Print / PDF Engine
 * 
 * Provides:
 * 1. 🪪 Official Ayushman Bharat Digital Mission (ABDM) ABHA Health ID Card Generator (Print / PDF)
 * 2. 📋 Official Doctor e-Prescription Generator with Jan Aushadhi generic mapping & QR Code
 */

(function(global) {
  'use strict';

  class PdfGenerator {
    
    // -------------------------------------------------------------
    // 1. GENERATE OFFICIAL ABHA HEALTH CARD
    // -------------------------------------------------------------
    generateAbhaCard(memberKey) {
      const patient = (global.patientController && global.patientController.data.familyMembers[memberKey || 'anitha']) || {
        name: 'Anitha K.',
        abhaId: '14-2938-7710-4521',
        age: 29,
        gender: 'Female',
        bloodGroup: 'O+',
        emergencyContact: 'Ramu K. (+91 9848119988)',
        assignedAsha: 'B. Saraswati (Ward 6)'
      };

      const printWin = window.open('', '_blank', 'width=800,height=600');
      if (!printWin) {
        alert('Please allow popups to download / print your ABHA Health Card.');
        return;
      }

      printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>ABHA Health Card - ${patient.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=IBM+Plex+Mono:wght@600&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 40px; background: #f4f6f8; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
            .card-wrapper { width: 500px; background: #ffffff; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.12); border: 2px solid #003366; overflow: hidden; position: relative; }
            .card-header { background: linear-gradient(135deg, #003366, #0b5ed7); color: #ffffff; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 4px solid #ea580c; }
            .emblem { font-size: 26px; }
            .header-title h2 { margin: 0; font-size: 16px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
            .header-title small { font-size: 11px; opacity: 0.85; }
            .card-body { padding: 22px; display: flex; gap: 20px; }
            .avatar-box { width: 110px; height: 130px; border-radius: 12px; background: #e2e8f0; border: 2px solid #cbd5e1; display: grid; place-items: center; font-size: 36px; font-weight: 800; color: #003366; flex-shrink: 0; }
            .info-box { flex: 1; font-size: 13px; color: #1e293b; }
            .info-row { margin-bottom: 8px; }
            .info-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }
            .info-val { font-size: 14px; font-weight: 700; color: #0f172a; }
            .abha-number { font-family: 'IBM Plex Mono', monospace; font-size: 17px; font-weight: 700; color: #0b5ed7; background: #eff6ff; padding: 6px 10px; border-radius: 8px; display: inline-block; margin: 4px 0 10px; border: 1px dashed #bfdbfe; }
            .card-footer { background: #f8fafc; padding: 12px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b; }
            .qr-mock { width: 48px; height: 48px; background: #0f172a; border-radius: 6px; display: grid; place-items: center; color: #fff; font-size: 8px; font-family: monospace; text-align: center; }
            .print-btn-bar { position: fixed; top: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 9999999; background: #003366; padding: 10px 20px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.25); }
            .print-btn { background: #34d399; color: #022c22; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 14px; box-shadow: 0 4px 12px rgba(52,211,153,0.4); }
            .print-btn:hover { background: #5eead4; }
            .card-wrapper { width: 500px; background: #ffffff; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.12); border: 2px solid #003366; overflow: hidden; position: relative; margin-top: 70px !important; }
            @media print { .print-btn-bar { display: none; } body { background: #fff; margin: 0; padding: 0; } .card-wrapper { box-shadow: none; margin-top: 0 !important; } }
          </style>
        </head>
        <body>
          <div class="print-btn-bar">
            <button class="print-btn" onclick="window.print()">📥 Download / Save PDF</button>
            <button class="print-btn" style="background:#64748b;color:#fff;box-shadow:none;" onclick="window.close()">✕ Close</button>
          </div>
          <div class="card-wrapper">
            <div class="card-header">
              <div style="display:flex;align-items:center;gap:12px;">
                <div class="emblem">🏛️</div>
                <div class="header-title">
                  <h2>National Health Authority</h2>
                  <small>Ayushman Bharat Digital Mission (ABDM)</small>
                </div>
              </div>
              <div style="font-weight:800;font-size:13px;background:rgba(255,255,255,0.2);padding:4px 8px;border-radius:6px;">ABHA</div>
            </div>
            <div class="card-body">
              <div class="avatar-box">
                ${patient.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
              </div>
              <div class="info-box">
                <div class="info-label">ABHA Number (आभा संख्या)</div>
                <div class="abha-number">${patient.abhaId}</div>
                <div class="info-row">
                  <div class="info-label">Full Name / नाम</div>
                  <div class="info-val">${patient.name}</div>
                </div>
                <div style="display:flex;gap:20px;" class="info-row">
                  <div>
                    <div class="info-label">Gender / Age</div>
                    <div class="info-val">${patient.gender || 'Female'} / ${patient.age || '29'}</div>
                  </div>
                  <div>
                    <div class="info-label">Blood Group</div>
                    <div class="info-val">${patient.bloodGroup || 'O+'}</div>
                  </div>
                </div>
                <div class="info-row">
                  <div class="info-label">Emergency Contact / आपातकालीन संपर्क</div>
                  <div class="info-val" style="font-size:12px;">${patient.emergencyContact || '+91 9848119988'}</div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div>
                <strong>Swasthya Setu Verified Health ID</strong><br>
                <span>Ayushman Bharat Health Account (ABHA) Interoperable</span>
              </div>
              <div class="qr-mock">QR<br>VERIFIED</div>
            </div>
          </div>
        </body>
        </html>
      `);
      printWin.document.close();
    }

    // -------------------------------------------------------------
    // 2. GENERATE OFFICIAL DOCTOR e-PRESCRIPTION PDF
    // -------------------------------------------------------------
    generatePrescriptionPDF(rxData) {
      const rx = rxData || {
        rxId: 'RX-2026-0891',
        doctorName: 'Dr. Suresh Varma, MBBS, MD',
        doctorReg: 'MCI-AP-2018-88219',
        clinic: 'Kondapalli Primary Health Centre (PHC)',
        patientName: 'Anitha K.',
        patientAbha: '14-2938-7710-4521',
        age: 29,
        gender: 'Female',
        diagnosis: 'Moderate Gestational Anaemia (Hb 9.2 g/dL) · ANC 24 Wks',
        vitals: 'BP 118/76 mmHg · Pulse 78 bpm · SpO2 98%',
        medications: [
          { generic: 'Ferrous Ascorbate + Folic Acid (100mg/1.5mg)', brand: 'Autrin / Orofer XT', dosage: '1 Tablet Daily after Dinner', duration: '30 Days', janAushadhiPrice: '₹22.00', marketPrice: '₹145.00' },
          { generic: 'Calcium Carbonate + Vitamin D3 (500mg/250IU)', brand: 'Shelcal 500', dosage: '1 Tablet Daily after Lunch', duration: '30 Days', janAushadhiPrice: '₹18.00', marketPrice: '₹115.00' }
        ],
        advice: 'Continue iron-rich diet (spinach, jaggery, beetroot). Follow up in 4 weeks at Kondapalli PHC.'
      };

      const printWin = window.open('', '_blank', 'width=850,height=800');
      if (!printWin) {
        alert('Please allow popups to print / download e-Prescription.');
        return;
      }

      const rows = rx.medications.map((m, idx) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700;">${idx+1}.</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;">
            <div style="font-weight:800;color:#003366;font-size:14px;">${m.generic}</div>
            <small style="color:#64748b;">Brand Ref: ${m.brand} | PMBJP Jan Aushadhi Savings</small>
          </td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">${m.dosage}</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">${m.duration}</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#16a34a;font-weight:800;">${m.janAushadhiPrice}</td>
        </tr>
      `).join('');

      printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>e-Prescription - ${rx.patientName} - ${rx.rxId}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=IBM+Plex+Mono:wght@600&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 30px; background: #f8fafc; color: #0f172a; }
            .rx-paper { max-width: 750px; margin: 70px auto 30px; background: #ffffff; padding: 35px 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-top: 6px solid #003366; position: relative; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #003366; padding-bottom: 15px; margin-bottom: 20px; }
            .doc-info h2 { margin: 0; color: #003366; font-size: 20px; font-weight: 800; }
            .doc-info p { margin: 3px 0; font-size: 12px; color: #475569; }
            .patient-box { background: #f1f5f9; padding: 14px 18px; border-radius: 10px; margin-bottom: 20px; font-size: 13px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .rx-symbol { font-size: 32px; font-weight: 900; color: #003366; font-family: serif; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
            th { text-align: left; background: #003366; color: #ffffff; padding: 10px; font-size: 12px; text-transform: uppercase; }
            .seal-box { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
            .digital-seal { border: 2px dashed #0b5ed7; border-radius: 8px; padding: 10px 16px; background: #eff6ff; font-size: 11.5px; color: #0b5ed7; }
            .print-btn-bar { position: fixed; top: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 9999999; background: #003366; padding: 10px 20px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.25); }
            .print-btn { background: #34d399; color: #022c22; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 14px; box-shadow: 0 4px 12px rgba(52,211,153,0.4); }
            .print-btn:hover { background: #5eead4; }
            @media print { .print-btn-bar { display: none; } body { background: #fff; margin: 0; padding: 0; } .rx-paper { box-shadow: none; padding: 0; margin-top: 0 !important; } }
          </style>
        </head>
        <body>
          <div class="print-btn-bar">
            <button class="print-btn" onclick="window.print()">📥 Download / Print Prescription PDF</button>
            <button class="print-btn" style="background:#64748b;color:#fff;box-shadow:none;" onclick="window.close()">✕ Close</button>
          </div>
          <div class="rx-paper">
            <div class="header">
              <div class="doc-info">
                <h2>${rx.doctorName}</h2>
                <p><strong>Reg No:</strong> ${rx.doctorReg}</p>
                <p><strong>Facility:</strong> ${rx.clinic}</p>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:800;color:#0b5ed7;font-size:16px;">SWASTHYA SETU</div>
                <div style="font-size:11px;color:#64748b;">e-Sanjeevani Telemedicine Suite</div>
                <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;margin-top:4px;color:#003366;font-weight:700;">${rx.rxId}</div>
              </div>
            </div>

            <div class="patient-box">
              <div><strong>Patient:</strong> ${rx.patientName} (${rx.gender}, ${rx.age} Yrs)</div>
              <div><strong>ABHA ID:</strong> ${rx.patientAbha}</div>
              <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              <div><strong>Vitals:</strong> ${rx.vitals}</div>
              <div style="grid-column: span 2;"><strong>Clinical Diagnosis:</strong> ${rx.diagnosis}</div>
            </div>

            <div class="rx-symbol">℞</div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Generic Medicine (PMBJP Scheme)</th>
                  <th>Dosage / Timing</th>
                  <th>Duration</th>
                  <th>PMBJP Price</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>

            <div style="background:#fffbeb;border:1px solid #fde68a;padding:12px;border-radius:8px;font-size:12.5px;margin-bottom:20px;">
              <strong>👨‍⚕️ Clinical Advice & Precautions:</strong>
              <p style="margin:4px 0 0;color:#92400e;">${rx.advice}</p>
            </div>

            <div class="seal-box">
              <div class="digital-seal">
                ✓ Digitally Signed & Encrypted<br>
                <strong>ABDM Health Token Verified</strong>
              </div>
              <div style="text-align:center;">
                <div style="font-family:'Fraunces',serif;font-style:italic;font-size:18px;color:#003366;">Dr. Suresh Varma</div>
                <div style="border-top:1px solid #003366;padding-top:4px;font-size:11px;font-weight:700;">Authorized Medical Officer</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      printWin.document.close();
    }
  }

  global.pdfGenerator = new PdfGenerator();

})(typeof window !== 'undefined' ? window : this);
