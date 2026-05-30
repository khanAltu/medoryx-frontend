import React from 'react';

export default function Navbar({ currentRole, activeTab }) {
  return (
    <header className="h-16 border-b border-[#334155] bg-[#1E293B] flex items-center justify-between px-6 shadow-md shadow-[#000000]/10">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold text-white tracking-tight">{activeTab}</h1>
        <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-emerald-500/20 font-mono">
          TENANT_ID: MEDORYX_ENTERPRISE_09
        </span>
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span className="text-slate-300 font-medium">St. Marys Hospital Hub</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-extrabold shadow-md shadow-teal-500/20">
          {currentRole ? currentRole[0] : 'U'}
        </div>
      </div>
    </header>
  );
}
