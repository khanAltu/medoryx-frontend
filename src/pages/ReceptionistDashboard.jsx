import React, { useState } from 'react';

export default function ReceptionistDashboard() {
  const [patientsList, setPatientsList] = useState([
    { token: "T-801", name: "Samantha Wright", gender: "Female", age: 29, status: "Admitted - Room 102", created: "08:15 AM" },
    { token: "T-802", name: "David Miller", gender: "Male", age: 41, status: "Triage / Waiting", created: "08:45 AM" },
    { token: "T-803", name: "Riya Sharma", gender: "Female", age: 34, status: "Discharged", created: "09:00 AM" }
  ]);

  // Intake Form States
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [complaint, setComplaint] = useState('');

  // Static Calendar roster state
  const calendarSlots = [
    { time: "09:00 AM", doctor: "Dr. Olivia Miller (Cardio)", patient: "Samantha Wright", status: "Active" },
    { time: "10:30 AM", doctor: "Dr. Alexander Ross (Ped.)", patient: "Emma Watson", status: "Scheduled" },
    { time: "11:00 AM", doctor: "Dr. Emily Taylor (Emerg.)", patient: "David Miller", status: "Scheduled" },
    { time: "12:30 PM", doctor: "Dr. Olivia Miller (Cardio)", patient: "Ahmad Malik", status: "Scheduled" },
    { time: "02:00 PM", doctor: "Dr. Emily Taylor (Emerg.)", patient: "Clara Jenkins", status: "Scheduled" },
    { time: "03:30 PM", doctor: "Dr. Rajesh K. Patel (ICU)", patient: "Riya Sharma", status: "Completed" }
  ];

  const handleIntakeSubmit = (e) => {
    e.preventDefault();

    const randomID = Math.floor(100 + Math.random() * 900);
    const newToken = `T-${randomID}`;

    const newPatient = {
      token: newToken,
      name: patientName,
      gender: gender,
      age: parseInt(age, 10) || 30,
      status: "Registered / Waiting Queue",
      created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPatientsList([newPatient, ...patientsList]);
    alert(`Registration Successful!\nGenerated token ID: ${newToken}\nUHID successfully allocated in MedOryx central storage clusters.`);

    // Reset Form
    setPatientName('');
    setAge('');
    setEmergencyPhone('');
    setComplaint('');
  };

  return (
    <div className="space-y-6">
      {/* Overview Head Shield */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Outpatient Admissions & Check-in Terminal</h2>
          <p className="text-slate-400 text-sm mt-1">SaaS Reception Desk. Book outpatient diagnostic slots, seed new biometric cards, and manage patient flows.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-mono text-teal-400">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>RECEPTIONIST: ACTIVE_STATION_A</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Patient Intake & Token Generator Form Panel */}
        <div className="lg:col-span-4 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <h3 className="font-bold text-white text-md mb-4 pb-2 border-b border-[#334155] flex items-center">
            🛎️ Quick Registration & UHID Creator
          </h3>

          <form onSubmit={handleIntakeSubmit} className="space-y-4 flex-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Patient Legal Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Age in Years</label>
                <input 
                  type="number" 
                  placeholder="e.g. 35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sex / Gender</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</label>
                <select 
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                >
                  <option value="O+">O+ Positive</option>
                  <option value="A+">A+ Positive</option>
                  <option value="B+">B+ Positive</option>
                  <option value="AB+">AB+ Positive</option>
                  <option value="O-">O- Negative</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Emergency contact</label>
                <input 
                  type="text" 
                  placeholder="+91 / +1 number"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chief Presenting Complaint</label>
              <textarea 
                rows="2" 
                placeholder="Reason for visit, symptoms description..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white focus:ring-1 focus:ring-teal-500 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs py-3 rounded-lg shadow-lg shadow-teal-950/20 transition-all duration-300 uppercase tracking-wider"
            >
              ➕ Issue Token & Register Card
            </button>
          </form>
        </div>

        {/* Daily Schedule calendar and current Registered queue list view */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Calendar roster grid */}
          <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
            <h3 className="font-bold text-white text-md mb-4 pb-2 border-b border-[#334155] flex items-center justify-between">
              <span>📅 Practitioner Consultation Roster</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-black">LIVE SLOTS</span>
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[440px]">
              {calendarSlots.map((slot, idx) => (
                <div key={idx} className="bg-[#0F172A] border border-[#334155] p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-400">{slot.time}</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{slot.doctor}</h4>
                    <p className="text-[10px] text-slate-400">Patient: {slot.patient}</p>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                    slot.status === 'Active' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 
                    slot.status === 'Scheduled' ? 'bg-slate-800 text-slate-300' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Day Arrivals check in list */}
          <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
            <h3 className="font-bold text-white text-md mb-4 pb-2 border-b border-[#334155]">
              👥 Active Daily Admissions ({patientsList.length})
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[440px]">
              {patientsList.map((pat, idx) => (
                <div key={idx} className="bg-[#0F172A] p-3.5 rounded-xl border border-[#334155] hover:border-[#475569] transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-extrabold text-[#475569]">{pat.token}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{pat.created}</span>
                  </div>
                  <h4 className="text-xs font-black text-white">{pat.name}</h4>
                  <p className="text-[11px] text-slate-300 mt-1">Age: {pat.age} | Sex: {pat.gender}</p>
                  
                  <div className="mt-2.5 pt-2 border-t border-[#334155]/60 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-teal-400">{pat.status}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">OPD desk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
