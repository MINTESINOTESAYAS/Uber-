import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAM_FUND_THEME } from '../constants';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Palette, 
  Code2, 
  Key, 
  Copy, 
  Check,
  Smartphone
} from 'lucide-react';

export default function FigmaSyncModal() {
  const { 
    setActiveModal, 
    theme, 
    setTheme 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';
  const [copied, setCopied] = useState(false);
  const [figmaToken, setFigmaToken] = useState(() => localStorage.getItem('driver_figma_token') || '');
  const [syncStatus, setSyncStatus] = useState(null);

  const figmaUrl = 'https://www.figma.com/design/RmlD47Tt0t0zhFaMLkuPuz/Fam-Fund-App--Community-?node-id=1172-18321&t=g9imMLDzEnbH1CMN-1';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(figmaUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToken = (e) => {
    e.preventDefault();
    localStorage.setItem('driver_figma_token', figmaToken);
    setSyncStatus('Figma Access Token saved locally!');
    setTimeout(() => setSyncStatus(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto animate-slideUp transition-all ${
          isDark ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900 shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Figma Design Collaboration</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Fam Fund App Template Integration</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Active Figma Template Status */}
          <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Template Connected
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Node: 1172-18321
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              Fam Fund App (Community Template)
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2.5 truncate">
              {figmaUrl}
            </p>

            <div className="flex items-center space-x-2">
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-1.5 transition"
              >
                <span>Open in Figma</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyLink}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-purple-200 dark:border-purple-800 font-bold text-xs flex items-center space-x-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Theme Switcher */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              UI Theme Palette
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('fam-fund')}
                className={`p-2.5 rounded-2xl text-left border transition ${
                  theme === 'fam-fund'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-full h-6 rounded-lg bg-emerald-500 mb-1.5"></div>
                <p className="text-xs font-bold leading-tight">Fam Fund Mint</p>
                <span className="text-[10px] text-slate-400">Light Clean</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-2.5 rounded-2xl text-left border transition ${
                  theme === 'dark'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-full h-6 rounded-lg bg-slate-900 border border-slate-700 mb-1.5"></div>
                <p className="text-xs font-bold leading-tight">Fam Fund Dark</p>
                <span className="text-[10px] text-slate-400">Midnight Slate</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('noir')}
                className={`p-2.5 rounded-2xl text-left border transition ${
                  theme === 'noir'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-full h-6 rounded-lg bg-black mb-1.5"></div>
                <p className="text-xs font-bold leading-tight">Uber Noir</p>
                <span className="text-[10px] text-slate-400">Pitch Black</span>
              </button>
            </div>
          </div>

          {/* Extracted Design Tokens Specs */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Palette className="w-4 h-4 text-emerald-500" />
              <span>Applied Design Tokens from Fam Fund:</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Primary Accent</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="font-mono">#10B981 (Emerald)</span>
                </div>
              </div>

              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Negative / Cost</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block"></span>
                  <span className="font-mono">#EF4444 (Coral)</span>
                </div>
              </div>

              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Corner Radiuses</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Cards: 24px (rounded-3xl)
                </span>
              </div>

              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Typography Scale</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Plus Jakarta Sans + Mono
                </span>
              </div>
            </div>
          </div>

          {/* Personal Access Token Option */}
          <form onSubmit={handleSaveToken} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Figma Personal Access Token (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="figd_xxxx..."
                value={figmaToken}
                onChange={(e) => setFigmaToken(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500 transition font-mono"
              />
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition"
              >
                Save
              </button>
            </div>
            {syncStatus && (
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{syncStatus}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
