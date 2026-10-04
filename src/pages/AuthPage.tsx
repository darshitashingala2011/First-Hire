import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Briefcase, ArrowRight, UserCheck, Shield, Sparkles } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register, switchDemoUser } = useAuth();
  const { setActivePage } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [targetRole, setTargetRole] = useState('Full-Stack Software Engineer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setError('Please provide an email address.');
          setLoading(false);
          return;
        }
        await login(email, password);
        setActivePage('dashboard');
      } else {
        if (!name || !email || !college) {
          setError('Please complete all required fields.');
          setLoading(false);
          return;
        }
        await register({ name, email, college, targetRole });
        setActivePage('onboarding');
      }
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (preset: 'ananya' | 'alex' | 'marcus') => {
    switchDemoUser(preset);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md">
        {/* Brand Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome back to FirstHire' : 'Create your student account'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'login'
              ? 'Log in to continue your career preparation and job pipeline.'
              : 'Launch your personalized roadmap, resume scoring, and interview prep.'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-6 sm:p-8">
          {/* Fast Demo Login Banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Instant 1-Click Demo Profiles</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2.5">
              Explore FirstHire instantly with pre-populated realistic student accounts:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectDemo('ananya')}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 text-left text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all"
              >
                <div>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Ananya Sharma</span>
                  <span className="text-[11px] text-slate-500 ml-1.5">· CS Senior (UC Berkeley)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('alex')}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 text-left text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all"
              >
                <div>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Alex Chen</span>
                  <span className="text-[11px] text-slate-500 ml-1.5">· ML Senior (Georgia Tech)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Toggle Tab */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Engineering Role
                  </label>
                  <select
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                    <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College or Personal Email
              </label>
              <input
                type="email"
                required
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Complete Setup & Launch'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setActivePage('landing')}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
