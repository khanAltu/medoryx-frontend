import React, { useState } from 'react';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([
    { token: "T-102", patientName: "Marcus Vance", age: 45, reason: "Post-op coronary bypass review", status: "In Consultation" },
    { token: "T-103", patientName: "Clara Jenkins", age: 32, reason: "Severe migraine & visual aura", status: "Waiting" },
    { token: "T-104", patientName: "Aiden Fletcher", age: 19, reason: "Acute asthmatic bronchospasm checkup", status: "Waiting" },
    { token: "T-105", patientName: "Yasmine Alati", age: 61, reason: "Type 2 diabetes quarterly HbA1c review", status: "Waiting" }
  ]);

  // Prescription Compiler state
  const [patientId, setPatientId] = useState('');
  const [vitals, setVitals] = useState({ temp: '98.6', bp: '120/80', pulse: '72', spo2: '99' });
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: 'Once Daily', duration: '5 Days' }
  ]);

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: 'Once Daily', duration: '5 Days' }]);
  };

  const removeMedicineRow = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handlePrescribeSubmit = (e) => {
    e.preventDefault();
    alert(`Prescription for UHID-${patientId || '102'} compiled and written successfully! Encrypted copy sent to pharmacy and patient records.`);
    // Reset state
    setPatientId('');
    setDiagnosis('');
    setTreatmentPlan('');
    setMedicines([{ name: '', dosage: '', frequency: 'Once Daily', duration: '5 Days' }]);
  };

  const startConsultation = (token) => {
    setAppointments(prev => prev.map(app => {
      if (app.token === token) return { ...app, status: "In Consultation" };
      if (app.status === "In Consultation") return { ...app, status: "Waiting" };
      return app;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Clinical Consultation Board</h2>
          <p className="text-slate-400 text-sm mt-1">Simulated Doctor desk for analyzing patients queue, recording raw vitals metrics, and instantly compiling pharmaceutical orders.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-mono text-teal-400 mt-4 md:mt-0">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>DOCTOR_ID: MD_OLIVIA_MILLER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Patient Appointment Queue List */}
        <div className="lg:col-span-1 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#334155]">
            <h3 className="font-bold text-white text-md">📋 Appointment Queue</h3>
            <span className="bg-teal-500/10 text-teal-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {appointments.length} Total
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
            {appointments.map((app, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border transition ${
                  app.status === 'In Consultation' 
                    ? 'bg-teal-600/10 border-teal-500/40 shadow-inner' 
                    : 'bg-[#0F172A] border-[#334155] hover:border-[#475569]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-teal-400">{app.token}</span>
                  <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${
                    app.status === 'In Consultation' ? 'bg-teal-500 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-white">{app.patientName}</h4>
                <p className="text-xs text-slate-300 mt-1 lines-2">Reason: {app.reason}</p>
                
                {app.status !== 'In Consultation' && (
                  <button 
                    onClick={() => {
                      startConsultation(app.token);
                      setPatientId(app.token.replace('T-', ''));
                    }}
                    className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-1.5 rounded transition border border-[#334155]"
                  >
                    🩺 Start Consultation
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prescription Compiler Workspace Container */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold text-white text-md mb-4 pb-2 border-b border-[#334155] flex items-center">
            📝 Digital Rx Prescription Compiler
          </h3>
          
          <form onSubmit={handlePrescribeSubmit} className="space-y-4">
            
            {/* Row 1: Patient ID & Patient Vitals HUD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Patient UHID Num</label>
                <input 
                  type="text" 
                  placeholder="e.g. 102"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-sm rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Diagnosed Condition</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mild Hypertension, Bronchitis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-sm rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* Vitals HUD Row */}
            <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Temp (°F)</label>
                <input 
                  type="text" 
                  value={vitals.temp}
                  onChange={(e) => setVitals({...vitals, temp: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#475569] text-xs rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Pres. (mmHg)</label>
                <input 
                  type="text" 
                  value={vitals.bp}
                  onChange={(e) => setVitals({...vitals, bp: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#475569] text-xs rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pulse Rate (BPM)</label>
                <input 
                  type="text" 
                  value={vitals.pulse}
                  onChange={(e) => setVitals({...vitals, pulse: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#475569] text-xs rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Oxygen Sat (%)</label>
                <input 
                  type="text" 
                  value={vitals.spo2}
                  onChange={(e) => setVitals({...vitals, spo2: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#475569] text-xs rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>

            {/* Dynamic Medicine Rx Matrix Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Prescribed Medicines List</span>
                <button 
                  type="button"
                  onClick={addMedicineRow}
                  className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center"
                >
                  ➕ Add Med Item
                </button>
              </div>

              <div className="space-y-2">
                {medicines.map((med, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 bg-[#0F172A] p-3 rounded-lg border border-[#334155] items-center">
                    <div className="col-span-12 md:col-span-4">
                      <input 
                        type="text" 
                        placeholder="Core Medicine..." 
                        value={med.name}
                        onChange={(e) => handleMedChange(index, 'name', e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#334155] text-xs rounded p-2 text-white"
                        required
                      />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <input 
                        type="text" 
                        placeholder="Dosage (e.g. 500mg)" 
                        value={med.dosage}
                        onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#334155] text-xs rounded p-2 text-white"
                        required
                      />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                      <select 
                        value={med.frequency}
                        onChange={(e) => handleMedChange(index, 'frequency', e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#334155] text-xs rounded p-2 text-white"
                      >
                        <option value="Once Daily">QD (1-0-0)</option>
                        <option value="Twice Daily">BID (1-0-1)</option>
                        <option value="Thrice Daily">TID (1-1-1)</option>
                        <option value="As Needed">PRN</option>
                      </select>
                    </div>
                    <div className="col-span-8 md:col-span-2">
                      <input 
                        type="text" 
                        placeholder="Duration" 
                        value={med.duration}
                        onChange={(e) => handleMedChange(index, 'duration', e.target.value)}
                        className="w-full bg-[#1E293B] border border-[#334155] text-xs rounded p-2 text-white"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-1 text-center">
                      {medicines.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeMedicineRow(index)}
                          className="text-red-400 hover:text-red-300 font-bold text-center text-sm"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment & Diet Guidance Plan Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Treatment and Diet Plan notes</label>
              <textarea 
                rows="3" 
                placeholder="Include pathology/radiology tests, scheduling timelines, and post-discharge dietary guidelines here..."
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#334155] text-sm rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500 resize-none"
              ></textarea>
            </div>

            {/* Form submit actions */}
            <div className="pt-4 border-t border-[#334155] flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => {
                  setDiagnosis('');
                  setTreatmentPlan('');
                  setMedicines([{ name: '', dosage: '', frequency: 'Once Daily', duration: '5 Days' }]);
                }}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-lg transition"
              >
                Clear Scratchpad
              </button>
              <button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-950/20 transition-all"
              >
                💾 Authorize & Commit Rx
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
