import React from 'react';
import { useApp } from '../context/AppContext';
import { VERSION_DETAILS, APP_VERSION, PREVIOUS_VERSION } from '../constants.js';
import { 
  X, 
  GitBranch, 
  CheckCircle2, 
  History, 
  Sparkles,
  Gauge
} from 'lucide-react';

export default function VersionInfoModal() {
  const { 
    activeVersion, 
    setActiveVersion, 
    setActiveModal 
  } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-800 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Version Manager</h3>
              <p className="text-[11px] text-slate-400">Comparing Version 1.1 and Version 1.2</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* VERSION 1.2 CARD (ACTIVE) */}
          <div className={`p-4 rounded-2xl border transition-all ${
            activeVersion === '1.2'
              ? 'bg-slate-950 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-slate-950 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <h4 className="font-extrabold text-sm text-white">Version 1.2 (Active Edition)</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ACTIVE
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-2">
              Created according to your latest specifications:
            </p>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {VERSION_DETAILS['1.2'].features.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {activeVersion !== '1.2' && (
              <button
                type="button"
                onClick={() => setActiveVersion('1.2')}
                className="mt-3 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                Switch to Version 1.2 (Speedometer Cockpit)
              </button>
            )}
          </div>

          {/* VERSION 1.1 CARD (PRESERVED) */}
          <div className={`p-4 rounded-2xl border transition-all ${
            activeVersion === '1.1'
              ? 'bg-slate-950 border-indigo-500 ring-2 ring-indigo-500/20'
              : 'bg-slate-950 border-slate-800 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-indigo-400" />
                <h4 className="font-extrabold text-sm text-white">Version 1.1 (Fam Fund Edition)</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                PRESERVED
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-2">
              The initial implementation based on the Fam Fund template:
            </p>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {VERSION_DETAILS['1.1'].features.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {activeVersion !== '1.1' && (
              <button
                type="button"
                onClick={() => setActiveVersion('1.1')}
                className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Switch to Version 1.1 (Fam Fund Style)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
