import React, { useState } from 'react';

const SidebarLinks = {
  "Super Admin": [
    { title: "SaaS Multi-Tenant Logs", icon: "🛡️" },
    { title: "Subscription Settings", icon: "💳" },
    { title: "Global Analytics", icon: "📊" },
    { title: "Stripe & Razorpay MRR", icon: "📈" }
  ],
  "Hospital Admin": [
    { title: "Hospital Settings", icon: "🏢" },
    { title: "Doctor On-boarding", icon: "🩺" },
    { title: "Patient Registry", icon: "👥" },
    { title: "Financial Invoices", icon: "💰" }
  ],
  "Doctor": [
    { title: "Consultation Board", icon: "🩺" },
    { title: "OPD Scheduler", icon: "📅" },
    { title: "Prescription Lab", icon: "📝" },
    { title: "My availability", icon: "⏱️" }
  ],
  "Receptionist": [
    { title: "OPD Arrivals Check-In", icon: "🛎️" },
    { title: "Appointment Calendar", icon: "📆" },
    { title: "Cashier Billing Desk", icon: "💵" }
  ],
  "Nurse": [
    { title: "IPD Patients Map", icon: "🏥" },
    { title: "Ward Bed Allocator", icon: "🛏️" },
    { title: "Monitoring Records", icon: "📈" }
  ],
  "Lab Technician": [
    { title: "Scheduled Specimen Tests", icon: "🔬" },
    { title: "Diagnostic PDF Uploads", icon: "📂" }
  ],
  "Pharmacist": [
    { title: "Medicine Inventory Stock", icon: "💊" },
    { title: "Purchase Orders Desk", icon: "📦" }
  ],
  "Patient": [
    { title: "My Medical Record History", icon: "👤" },
    { title: "Stripe Checkout Dues", icon: "💳" },
    { title: "Pending Diagnostic Reports", icon: "📄" }
  ]
};

export default function DashboardLayout({ children, currentRole, setRole, activeTab, setActiveTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900">
      {/* Sidebar Navigation */}
      <aside className={`bg-[#1E293B] border-r border-[#334155] transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#334155] bg-[#0F172A]">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏥</span>
              <span className="font-extrabold text-teal-400 text-lg tracking-wider">MedOryx Cloud Suite</span>
            </div>
          ) : (
            <span className="text-xl mx-auto">🏥</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded transition"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Current Active Role Selector HUD */}
        <div className="p-4 border-b border-[#334155]">
          {sidebarOpen ? (
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Simulated Session Role</p>
              <select
                value={currentRole}
                onChange={(e) => {
                  setRole(e.target.value);
                  setActiveTab(SidebarLinks[e.target.value][0].title);
                }}
                className="w-full bg-[#0F172A] border border-[#475569] text-sm rounded-lg p-2 text-white font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                {Object.keys(SidebarLinks).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-center text-xs font-bold text-teal-400" title="Simulating role selection">
              {currentRole[0]}
            </div>
          )}
        </div>

        {/* Conditional Sidebar Navigation Items list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {SidebarLinks[currentRole]?.map((item) => {
            const isTabActive = activeTab === item.title;
            return (
              <button
                key={item.title}
                onClick={() => setActiveTab(item.title)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                  isTabActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30 font-bold'
                    : 'text-slate-300 hover:bg-[#334155] hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.title}</span>}
              </button>
            );
          })}
        </nav>

        {/* Legal Platform Footer */}
        <div className="p-4 border-t border-[#334155] bg-[#0F172A] text-xs text-slate-400 text-center">
          {sidebarOpen ? (
            <p>© 2026 MedOryx Cloud Suite.<br/>Deployment Ready.</p>
          ) : (
            <p>v1.2</p>
          )}
        </div>
      </aside>

      {/* Main Sandbox Core Dashboard Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-[#334155] bg-[#1E293B] flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold text-white tracking-tight">{activeTab}</h1>
            <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-emerald-500/20">
              TENANT_ID: CF_09201-ENTERPRISE
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <span className="text-slate-300 font-medium">St. Marys Hospital</span>
            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-extrabold shadow-md shadow-teal-500/20">
              {currentRole[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#0F172A]">
          {children}
        </main>
      </div>
    </div>
  );
}
