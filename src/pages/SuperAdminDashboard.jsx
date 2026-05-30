import React, { useState } from 'react';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Enterprise SaaS Metadata Mock Data Setup
  const systemMetrics = {
    mrrStripe: "$182,450.00",
    mrrRazorpay: "$310,200.00",
    totalMRR: "$492,650.00",
    activeHospitals: 84,
    unsubscribedCount: 3,
    averageDowntime: "99.98%"
  };

  const systemsEvents = [
    { timestamp: "2026-05-30T12:05:11Z", tenant: "City Medical", level: "INFO", action: "Stripe recurring payment verified: $4,500.00 (Standard Plan)" },
    { timestamp: "2026-05-30T11:42:01Z", tenant: "Apollo Prime", level: "WARN", action: "API Usage quota reached 85% of Monthly Allowances" },
    { timestamp: "2026-05-30T10:15:33Z", tenant: "Saint Jude Clinical", level: "ERROR", action: "Razorpay Signature Verification failed for webhook txn_829103" },
    { timestamp: "2026-05-30T09:29:44Z", tenant: "General Hospital", level: "INFO", action: "Provisioned new wildcard subdomain: general.medoryx.app" }
  ];

  const tenantHospitals = [
    { name: "City Medical Center", domain: "citymed.medoryx.app", type: "Enterprise Suite", billingCycle: "Stripe Yearly", status: "Active" },
    { name: "Apollo Premium Care", domain: "apollo.medoryx.app", type: "Enterprise Suite", billingCycle: "Razorpay Monthly", status: "Active" },
    { name: "Fortis Clinical Hub", domain: "fortis.medoryx.app", type: "Standard Core Room", billingCycle: "Stripe Monthly", status: "Active" },
    { name: "Narayana Health Desk", domain: "narayana.medoryx.app", type: "Basic Core Room", billingCycle: "Razorpay Monthly", status: "Active" },
    { name: "Saint Jude Clinical", domain: "stjude.medoryx.app", type: "Enterprise Suite", billingCycle: "Stripe Yearly", status: "Warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Panel HUD */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl shadow-[#000000]/10">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Main Platform Controller</h2>
          <p className="text-slate-400 text-sm mt-1">Stripe, Razorpay Multi-Tenant Subscriptions Status Dashboard and Database Provisioning Console.</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="bg-teal-600 hover:bg-teal-500 font-bold px-4 py-2 text-sm text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/30">
            ➕ Provision New Tenant Subdomain
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 font-bold px-4 py-2 text-sm text-white rounded-lg transition-all duration-300">
            ⚡ Platform Status Checks
          </button>
        </div>
      </div>

      {/* Metrics Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1E293B] border border-emerald-500/20 p-5 rounded-2xl shadow-xl hover:border-emerald-500/40 transition">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Platform MRR</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">{systemMetrics.totalMRR}</p>
          <div className="flex justify-between text-[11px] text-slate-400 mt-3 border-t border-[#334155] pt-2">
            <span>Stripe: {systemMetrics.mrrStripe}</span>
            <span>Razorpay: {systemMetrics.mrrRazorpay}</span>
          </div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Hospitals (Tenants)</p>
          <p className="text-3xl font-extrabold text-white mt-2">{systemMetrics.activeHospitals} Tenants</p>
          <p className="text-[11px] text-red-400 mt-3 border-t border-[#334155] pt-2 flex items-center">
            ⚠️ {systemMetrics.unsubscribedCount} subscriptions in grace / un-paid period
          </p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">SLA Uptime Metrics</p>
          <p className="text-3xl font-extrabold text-teal-400 mt-2">{systemMetrics.averageDowntime}</p>
          <p className="text-[11px] text-slate-400 mt-3 border-t border-[#334155] pt-2">
            Wildcard DNS routing healthy & active
          </p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Stripe Live Gateways</p>
          <p className="text-3xl font-extrabold text-sky-400 mt-2">Active</p>
          <p className="text-[11px] text-emerald-400 mt-3 border-t border-[#334155] pt-2 flex items-center">
            🌐 Razorpay production API fully connected
          </p>
        </div>
      </div>

      {/* Main SaaS Platform Graphing HUD and Table List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Custom pure HTML/SVG MRR Growth Analytics Chart */}
        <div className="lg:col-span-1 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold text-white text-md mb-4 flex items-center">
            📊 Platform Subscriptions Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Enterprise Suite ($199/mo)</span>
                <span className="text-teal-400 font-bold">52 Tenants</span>
              </div>
              <div className="w-full bg-[#0F172A] rounded-full h-2.5">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Standard Core ($99/mo)</span>
                <span className="text-sky-400 font-bold">24 Tenants</span>
              </div>
              <div className="w-full bg-[#0F172A] rounded-full h-2.5">
                <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Basic Tier ($49/mo)</span>
                <span className="text-amber-400 font-bold">8 Tenants</span>
              </div>
              <div className="w-full bg-[#0F172A] rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#334155] pt-6 pr-2">
            <h4 className="text-slate-400 font-extrabold text-[11px] uppercase tracking-wider mb-3">Gateway Distribution</h4>
            <div className="flex items-center space-x-6 justify-center">
              <div className="flex items-center space-x-2 text-sm">
                <span className="inline-block w-3 h-3 bg-teal-500 rounded-full"></span>
                <span className="text-slate-200">Stripe (59%)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                <span className="text-slate-200">Razorpay (41%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tenant Sub-domains Administration Table list */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="font-bold text-white text-md">🏢 Tenant Domain Map & Stripe Subscriptions</h3>
            <input
              type="text"
              placeholder="Search active subdomains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0F172A] border border-[#475569] text-xs rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="bg-[#0F172A] text-slate-400 font-bold uppercase tracking-wider border-b border-[#334155]">
                  <th className="p-3 rounded-l-lg">Hospital</th>
                  <th className="p-3">Resolved Domain</th>
                  <th className="p-3">SaaS Tier Plan</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3 rounded-r-lg">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {tenantHospitals
                  .filter((h) => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.domain.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-800 transition">
                      <td className="p-3 font-semibold text-white">{t.name}</td>
                      <td className="p-3 text-teal-400 font-mono">{t.domain}</td>
                      <td className="p-3">{t.type}</td>
                      <td className="p-3 text-slate-400">{t.billingCycle}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${t.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Production Live Platform Webhooks Event Bus */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-md flex items-center">
            <span className="animate-ping inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3"></span>
            System Live Logs & Event Stream (WebSocket Realtime)
          </h3>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">PID: 9283</span>
        </div>
        <div className="bg-[#0F172A] p-4 rounded-xl border border-[#334155] font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto">
          {systemsEvents.map((log, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center space-y-0.5 md:space-y-0 md:space-x-2 pb-2 last:pb-0 border-b border-slate-800/60 last:border-0">
              <span className="text-slate-500 text-[11px] font-semibold">{log.timestamp}</span>
              <span className="bg-[#1E293B] px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300">{log.tenant}</span>
              <span className={`font-bold ${log.level === 'ERROR' ? 'text-red-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-teal-400'}`}>[{log.level}]</span>
              <span className="text-slate-300 truncate">{log.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
