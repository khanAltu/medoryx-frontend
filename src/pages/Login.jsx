import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome to MedOryx Cloud Suite!\nSimulated login session authenticated for account: ${email}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-4xl block mb-2">🏥</span>
        <h2 className="text-3xl font-black text-white tracking-tight">MedOryx Cloud Suite</h2>
        <p className="mt-2 text-sm text-slate-400">
          Or{' '}
          <a href="#register" className="font-bold text-teal-400 hover:text-teal-300 transition">
            onboard a new hospital tenant instance
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1E293B] border border-[#334155] py-8 px-4 shadow-2xl rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Corporate Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@marys.medoryx.app"
                className="w-full bg-[#0F172A] border border-[#334155] text-sm rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secret Access Key / Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0F172A] border border-[#334155] text-sm rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-[#0F172A] border-[#334155] text-teal-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-slate-300 cursor-pointer select-none">
                  Remember my workstation session
                </label>
              </div>

              <div className="text-xs font-bold">
                <a href="#forgot" className="text-teal-400 hover:text-teal-300 transition">
                  Forgot credentials?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-xs tracking-wider uppercase font-extrabold text-white bg-teal-600 hover:bg-teal-500 focus:outline-none transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Decrypting Roster...' : '🔑 Authenticate with MedOryx'}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-[#334155] pt-6 flex items-center justify-center space-x-2 text-xs text-slate-400">
            <span>Security Framework Compliant:</span>
            <span className="font-mono text-[10px] text-teal-400 font-extrabold uppercase bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">
              AES-256 / SHA-3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
