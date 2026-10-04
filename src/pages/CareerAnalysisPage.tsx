import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

export const CareerAnalysisPage: React.FC = () => {
  const { user } = useAuth();
  const { setActivePage } = useApp();

  const role = user?.targetRole || 'Full-Stack Software Engineer';

  const marketBenchmarks = {
    demandLevel: 'Very High (+28% YoY 2026)',
    medianSalaryEntry: '$148,000 / yr',
    salaryRangeEntry: '$125,000 – $185,000 + Equity',
    topTechHiring: [
      { name: 'Stripe', roles: '14 New Grad Roles', growth: '+18%' },
      { name: 'Linear', roles: '6 Early Career Roles', growth: '+32%' },
      { name: 'Figma', roles: '12 Summer Internships', growth: '+25%' },
      { name: 'Datadog', roles: '20 Infrastructure Roles', growth: '+15%' },
      { name: 'Google DeepMind', roles: '10 Research Engineers', growth: '+40%' }
    ],
    percentileRanking: 92, // Top 8%
    competitiveEdge: [
      'Strong command of TypeScript, React 19, and distributed state synchronization',
      'Demonstrated teaching leadership (Head TA) indicating exceptional communication skills',
      'Production internship experience (Vercel) reducing onboarding ramp time to zero'
    ],
    growthVectors: [
      'Container orchestration (Kubernetes) and cloud deployment infrastructure',
      'High-throughput database partitioning and advanced B-tree index tuning',
      'System design mock practice for concurrency & distributed transaction patterns'
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Career Trajectory & Market Analysis</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                2026 Tech Market
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Benchmarking your academic and technical profile against 12,000+ applicants for {role}.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('roadmap')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>View Custom Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            2026 Market Demand
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {marketBenchmarks.demandLevel}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Surging demand for early-career developers who combine full-stack UI skills with backend data reliability.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            New Grad Comp Benchmark
          </span>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {marketBenchmarks.medianSalaryEntry}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            San Francisco & New York hybrid bands: {marketBenchmarks.salaryRangeEntry}.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Applicant Percentile
          </span>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            Top 8% (92nd Percentile)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Calculated across college rank, GPA (3.88), project complexity, and Vercel internship.
          </p>
        </div>
      </div>

      {/* Grid: Strengths vs Growth Vectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Key Competitive Advantages
            </h3>
          </div>
          <ul className="space-y-3">
            {marketBenchmarks.competitiveEdge.map((edge, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{edge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Priority Growth Vectors
            </h3>
          </div>
          <ul className="space-y-3">
            {marketBenchmarks.growthVectors.map((vec, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span>{vec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Companies Hiring for Role */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Top 2026 Hiring Companies for {role}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified campus hiring programs and early-career recruitment quotas
            </p>
          </div>
          <button
            onClick={() => setActivePage('opportunities')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Browse Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {marketBenchmarks.topTechHiring.map(comp => (
            <div
              key={comp.name}
              className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</p>
                <p className="text-[11px] text-slate-500">{comp.roles}</p>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                {comp.growth}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
