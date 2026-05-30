import React, { useState } from 'react';

export default function HospitalAdminDashboard() {
  // Mock Dynamic Hospital Stats State
  const [opdCount, setOpdCount] = useState(38);
  const [ipdCount, setIpdCount] = useState(14);
  const [availableBeds, setAvailableBeds] = useState(6);

  // Pharmacy Stock mock level lists
  const [medicines, setMedicines] = useState([
    { name: "Paracetamol 500mg IP", currentStock: 120, reorderPoint: 300, risk: "CRITICAL" },
    { name: "Amoxicillin Trihydrate 250mg", currentStock: 450, reorderPoint: 200, risk: "SAFE" },
    { name: "Insulin Glargine Pen", currentStock: 15, reorderPoint: 50, risk: "CRITICAL" },
    { name: "Ibuprofen 400mg BP", currentStock: 800, reorderPoint: 250, risk: "SAFE" }
  ]);

  // Doctor schedules
  const doctorSchedules = [
    { name: "Dr. Olivia Miller", dept: "Cardiology", dutyHours: "08:00 AM - 02:00 PM", status: "Active" },
    { name: "Dr. Alexander Ross", dept: "Pediatrics", dutyHours: "10:00 AM - 06:00 PM", status: "Active" },
    { name: "Dr. Emily Taylor", dept: "Emergency Medicine", dutyHours: "04:00 PM - 12:00 AM", status: "Active" },
    { name: "Dr. Rajesh K. Patel", dept: "Intensive Care Unit (ICU)", dutyHours: "12:00 AM - 08:00 AM", status: "On-Call" }
  ];

  const handleStockUpdate = (name, amount) => {
    setMedicines(prev => prev.map(m => {
      if (m.name === name) {
        const updatedStock = m.currentStock + amount;
        return {
          ...m,
          currentStock: updatedStock,
          risk: updatedStock <= m.reorderPoint ? "CRITICAL" : "SAFE"
        };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Overview Head Banner */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl shadow-[#000000]/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">St. Mary's General Hospital Admin Desk</h2>
          <p className="text-slate-400 text-sm mt-1">Tenant Level Administration panel for Managing OPD, IPD schedules, Ward beds, and Outpatient pharmacy levels.</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button 
            onClick={() => { setOpdCount(o => o + 1) }}
            className="bg-teal-600 hover:bg-teal-500 font-bold px-4 py-2 text-xs text-white rounded-lg transition"
          >
            🛎️ Sim Outpatient Check-in
          </button>
          <button 
            onClick={() => { 
              if (availableBeds > 0) {
                setAvailableBeds(b => b - 1);
                setIpdCount(i => i + 1);
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-500 font-bold px-4 py-2 text-xs text-white rounded-lg transition"
          >
            🛌 Sim IPD Bed Admission
          </button>
        </div>
      </div>

      {/* Hospital Metrics Widget Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active OPD Patients Today</p>
            <p className="text-4xl font-extrabold text-white mt-2">{opdCount}</p>
          </div>
          <div className="p-3.5 bg-teal-500/10 rounded-xl text-teal-400 text-2xl font-bold">🛎️</div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active IPD Admissions</p>
            <p className="text-4xl font-extrabold text-white mt-2">{ipdCount}</p>
          </div>
          <div className="p-3.5 bg-indigo-500/10 rounded-xl text-indigo-400 text-2xl font-bold">🛌</div>
        </div>

        <div className="bg-[#1E293B] border border-emerald-500/10 p-5 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Available ICU/Ward Beds</p>
            <p className="text-4xl font-extrabold text-emerald-400 mt-2">{availableBeds}</p>
          </div>
          <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-400 text-2xl font-bold">🏥</div>
        </div>
      </div>

      {/* Lower Dashboard Detail section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Medicine stock watch monitor widget */}
        <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-[#334155] pb-3 mb-4">
            <h3 className="font-bold text-white text-md flex items-center">
              💊 Pharmacy Stock Warning Levels
            </h3>
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded font-black tracking-widest uppercase">
              REORDER ALERTS
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {medicines.map((med, index) => (
              <div key={index} className="bg-[#0F172A] border border-[#334155] p-3 rounded-xl flex items-center justify-between transition hover:border-[#475569]">
                <div>
                  <h4 className="text-sm font-bold text-white">{med.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Current: <strong className={med.risk === 'CRITICAL' ? 'text-red-400' : 'text-slate-300'}>{med.currentStock} units</strong> / Reorder Level: {med.reorderPoint}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${med.risk === 'CRITICAL' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {med.risk}
                  </span>
                  <button 
                    onClick={() => handleStockUpdate(med.name, 100)}
                    className="bg-slate-700 hover:bg-slate-600 text-white rounded p-1 font-bold text-xs"
                    title="Add 100 units to store inventory"
                  >
                    📦 +100 Units
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Roster Scheduler widget */}
        <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-[#334155] pb-3 mb-4">
            <h3 className="font-bold text-white text-md flex items-center">
              🩺 Today's Clinical Roster Schedules
            </h3>
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] px-2 py-0.5 rounded font-black tracking-widest uppercase">
              IPD/OPD SHIFTS
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {doctorSchedules.map((doc, index) => (
              <div key={index} className="bg-[#0F172A] border border-[#334155] p-3 rounded-xl flex items-center justify-between transition hover:border-[#475569]">
                <div>
                  <h4 className="text-sm font-bold text-teal-400">{doc.name}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{doc.dept}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-mono text-slate-300">{doc.dutyHours}</p>
                  <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-1 py-0.5 rounded mt-1 ${doc.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#1E293B] text-amber-400'}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
