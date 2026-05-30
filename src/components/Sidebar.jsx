import React, { useState } from 'react';

const SidebarLinks = {
  "Super Admin": [
    { title: "MedOryx Multi-Tenant Logs", icon: "🛡️" },
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
    { title: "Prescription Lab", icon: "📝" }
  ]
};

export default function Sidebar({ currentRole, setRole, activeTab, setActiveTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside className={`bg-[#1E293B] border-r border-[#334155] transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#334155] bg-[#0F172A]">
        {sidebarOpen ? (
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏥</span>
            <span className="font-extrabold text-teal-400 text-sm tracking-wider">MedOryx Cloud Suite</span>
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

      {/* Roster Navigation list */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {SidebarLinks[currentRole]?.map((item) => {
          const isTabActive = activeTab === item.title;
          return (
            <button
              key={item.title}
              onClick={() => setActiveTab(item.title)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                isTabActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/10 font-bold'
                  : 'text-slate-300 hover:bg-[#334155] hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.title}</span>}
            </button>
          );
        })}
      </nav>

      {/* MedOryx Solutions Footer */}
      <div className="p-4 border-t border-[#334155] bg-[#0F172A] text-xs text-slate-400 text-center">
        {sidebarOpen ? (
          <p>© 2026 MedOryx Solutions Inc.<br/>Production Ready.</p>
        ) : (
          <p>v1.2</p>
        )}
      </div>
    </aside>
  );
}
