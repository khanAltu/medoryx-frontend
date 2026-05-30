import React, { useState } from 'react';

export default function PharmacistDashboard() {
  const [inventory, setInventory] = useState([
    { code: "M-501", name: "Paracetamol (Acetaminophen) 500mg IP", category: "Analgesic / Antipyretic", stock: 120, minLevel: 400, unitPrice: "$0.05", supplier: "Apex Pharma Dist" },
    { code: "M-502", name: "Amoxicillin Trihydrate 250mg Cap", category: "Antibiotic", stock: 1540, minLevel: 500, unitPrice: "$0.18", supplier: "Global BioLabs Ltd" },
    { code: "M-503", name: "Insulin Glargine Pen (Reusable)", category: "Antidiabetic", stock: 15, minLevel: 60, unitPrice: "$24.50", supplier: "Lilly Biotech Corp" },
    { code: "M-504", name: "Ibuprofen 400mg BP Tablet", category: "NSAID", stock: 950, minLevel: 300, unitPrice: "$0.08", supplier: "Apex Pharma Dist" },
    { code: "M-505", name: "Atorvastatin Calcium 10mg IP", category: "Cardiovascular / Statin", stock: 80, minLevel: 250, unitPrice: "$0.32", supplier: "Pfizer India Trades" },
    { code: "M-506", name: "Metformin Hydrochloride 500mg SR", category: "Antidiabetic", stock: 2400, minLevel: 600, unitPrice: "$0.04", supplier: "Lilly Biotech Corp" }
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [reorderItem, setReorderItem] = useState(null);
  const [reorderAmount, setReorderAmount] = useState('500');

  // Filter items based on low stock
  const filteredInventory = inventory.filter(item => {
    if (activeTab === 'Low Stock') return item.stock <= item.minLevel;
    if (activeTab === 'Safe Stock') return item.stock > item.minLevel;
    return true; // All
  });

  const triggerReorderSubmit = (e) => {
    e.preventDefault();
    if (!reorderItem) return;

    setInventory(prev => prev.map(item => {
      if (item.code === reorderItem.code) {
        return {
          ...item,
          stock: item.stock + parseInt(reorderAmount, 10)
        };
      }
      return item;
    }));

    alert(`Bulk purchase order issued to ${reorderItem.supplier} for ${reorderAmount} units of ${reorderItem.name}! Stock indices reconciled.`);
    setReorderItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Overview Head Ribbon */}
      <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Pharmaceutical Stock & Apothecary Controls</h2>
          <p className="text-slate-400 text-sm mt-1">SaaS Outpatient Pharmacy view. Keep track of drug reorder thresholds and execute restock shipments instantly.</p>
        </div>
        <div className="flex space-x-2 mt-3 md:mt-0">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'All' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            All Medicines
          </button>
          <button 
            onClick={() => setActiveTab('Low Stock')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center ${activeTab === 'Low Stock' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 mr-1.5 inline-block animate-ping"></span>
            Low Stock Alerts
          </button>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time Medicine Inventory Grid */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl flex flex-col">
          <h3 className="font-bold text-white text-md mb-4 flex items-center justify-between border-b border-[#334155] pb-2">
            <span>💊 Real-time Apothecary Registry ({filteredInventory.length} Items Listed)</span>
            <span className="text-xs bg-[#0F172A] text-slate-400 px-2 py-0.5 rounded font-mono">STATION: PH_B_WING_ST.MARYS</span>
          </h3>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="bg-[#0F172A] text-slate-400 font-bold uppercase tracking-wider border-b border-[#334155]">
                  <th className="p-3 rounded-l-lg">M-Code</th>
                  <th className="p-3">Generic / Brand Name</th>
                  <th className="p-3">Shed / Category</th>
                  <th className="p-3 text-right">Available Stock</th>
                  <th className="p-3">Safety Limit</th>
                  <th className="p-3 rounded-r-lg text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]/60">
                {filteredInventory.map((item, idx) => {
                  const isCritical = item.stock <= item.minLevel;
                  return (
                    <tr key={idx} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 text-teal-400 font-mono font-bold">{item.code}</td>
                      <td className="p-3 font-semibold text-white">
                        <div>
                          {item.name}
                          <p className="text-[10px] text-slate-400 mt-0.5">Supplier: {item.supplier}</p>
                        </div>
                      </td>
                      <td className="p-3 text-slate-300">{item.category}</td>
                      <td className={`p-3 text-right font-mono font-black ${isCritical ? 'text-rose-400 text-sm' : 'text-emerald-400'}`}>
                        {item.stock} Units
                      </td>
                      <td className="p-3 text-slate-400 font-mono">{item.minLevel} Min.</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => setReorderItem(item)}
                          className="bg-slate-800 hover:bg-slate-700 hover:text-white border border-[#334155] text-teal-300 font-bold text-[10px] px-2 py-1 rounded transition"
                        >
                          📦 Re-order
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warning HUD & Supplier Dispatch Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Supplier Dispatch Form */}
          {reorderItem ? (
            <div className="bg-[#1E293B] border border-teal-500/30 p-6 rounded-2xl shadow-xl">
              <h3 className="font-bold text-white text-md mb-3 flex items-center text-teal-400">
                ⚡ Issue Stock Procurement Order
              </h3>
              <p className="text-slate-300 text-xs mb-4">
                You are initiating a direct restock request for <strong className="text-white">{reorderItem.name}</strong> from distribution vendor <strong className="text-white">{reorderItem.supplier}</strong>.
              </p>

              <form onSubmit={triggerReorderSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Target Supplier</label>
                  <input 
                    type="text" 
                    value={reorderItem.supplier} 
                    disabled 
                    className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-slate-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Restock Shipment Units Amount</label>
                  <select 
                    value={reorderAmount}
                    onChange={(e) => setReorderAmount(e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#334155] text-xs rounded-lg p-2.5 text-white font-mono focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="200">200 Units Bulk</option>
                    <option value="500">500 Units Bulk</option>
                    <option value="1000">1000 Units Critical Case</option>
                    <option value="2500">2500 Units Distributor Palette</option>
                  </select>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setReorderItem(null)}
                    className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2 rounded-lg shadow-lg shadow-teal-950/20 transition"
                  >
                    🚀 Trigger Restock
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-xl text-center text-slate-400 py-12">
              <span className="text-4xl block mb-2">📦</span>
              <p className="text-xs font-bold text-slate-300 uppercase">Supplier Desk Standby</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">Select any pharmaceutical item card on the left to quickly trigger vendor procurement orders.</p>
            </div>
          )}

          {/* Quick Warning Panels List (Rose Pink View) */}
          <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl shadow-xl">
            <h3 className="font-extrabold text-rose-400 text-xs tracking-wider uppercase mb-3 flex items-center">
              ⚠️ CRITICAL UNDER-THRESHOLD WARNS
            </h3>
            <div className="space-y-3">
              {inventory.filter(item => item.stock <= item.minLevel).map((item, idx) => (
                <div key={idx} className="bg-[#0F172A] border border-rose-500/10 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{item.name}</h4>
                    <p className="text-[10px] text-rose-400 font-mono mt-0.5">Stock Level: {item.stock} / {item.minLevel} limit</p>
                  </div>
                  <button 
                    onClick={() => setReorderItem(item)}
                    className="bg-rose-500/25 hover:bg-rose-500/40 border border-rose-500/40 text-rose-300 font-bold text-[10px] px-2 py-1 rounded transition"
                  >
                    Restock Now
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
