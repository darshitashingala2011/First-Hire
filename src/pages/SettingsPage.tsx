import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sun,
  Moon,
  Sparkles,
  Download,
  RotateCcw,
  Check,
  ShieldCheck,
  User,
  Bell
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { resetAllData, resume, skills, projects, experience } = useApp();

  const [resetSuccess, setResetSuccess] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all student profile, resume, and application data to the default state?')) {
      resetAllData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  const handleExportData = () => {
    const data = {
      user,
      resume,
      skills,
      projects,
      experience,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `firsthire-profile-${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'student'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Platform Settings & Preferences
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure appearance, AI engine preferences, and local data persistence.
          </p>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>Appearance & Theme</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          FirstHire supports both Light and Dark modes with persistent browser synchronization.
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Current Theme: <span className="capitalize text-indigo-600 dark:text-indigo-400">{theme}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {theme === 'dark' ? 'Deep dark mode optimized for late-night coding drills.' : 'Crisp high-contrast light mode for campus study sessions.'}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm hover:border-indigo-500 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>

      {/* AI Engine Status */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>AI Engine Configuration</span>
        </h2>

        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-950 dark:text-indigo-200">
              Core Model: Google Gemini 3.8 Flash
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold font-mono text-[10px]">
              OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Powers resume ATS analysis, bullet point enhancements (Google XYZ formula), dynamic interview questions, and roadmap milestones with secure server-side execution.
          </p>
        </div>
      </div>

      {/* Data Management & Export */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Data Management & Backup
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Export your complete student career dataset or reset to clean demo state.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Profile JSON</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Demo Profile</span>
          </button>
        </div>

        {exportSuccess && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ Complete profile data exported successfully!
          </p>
        )}
        {resetSuccess && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ Application state reset to default demo dataset.
          </p>
        )}
      </div>
    </div>
  );
};
