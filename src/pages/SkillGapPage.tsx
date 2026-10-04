import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Layers,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { user } = useAuth();
  const { skillGaps, addMissingSkillToRoadmap, setActivePage } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'missing' | 'in-progress' | 'mastered'>('all');

  const filteredGaps = skillGaps.filter(item => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const masteredCount = skillGaps.filter(s => s.status === 'mastered').length;
  const inProgressCount = skillGaps.filter(s => s.status === 'in-progress').length;
  const missingCount = skillGaps.filter(s => s.status === 'missing').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Skill Gap & Competency Analysis</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                AI Target Mapping
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Target role: <strong className="text-slate-700 dark:text-slate-300">{user?.targetRole || 'Full-Stack Software Engineer'}</strong>
            </p>
          </div>
        </div>

        {/* Filter Controls (buttons with click handlers, anti-slop) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({skillGaps.length})
          </button>
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeFilter === 'missing'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Missing ({missingCount})
          </button>
          <button
            onClick={() => setActiveFilter('in-progress')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeFilter === 'in-progress'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            In-Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveFilter('mastered')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeFilter === 'mastered'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mastered ({masteredCount})
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filteredGaps.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.status === 'mastered'
                      ? 'bg-emerald-500'
                      : item.status === 'in-progress'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <span className="text-[11px] text-slate-400">· {item.category}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  [{item.priority} Priority]
                </span>
              </div>

              {/* Progress bar comparison */}
              <div className="w-full max-w-md pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span>Current: {item.currentProficiency}%</span>
                  <span>Target Benchmark: {item.requiredProficiency}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'mastered'
                        ? 'bg-emerald-500'
                        : item.status === 'in-progress'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.currentProficiency}%` }}
                  />
                </div>
              </div>

              {/* Curated Resource */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">Resource: {item.learningResource.title}</span>
                <span className="text-slate-400">({item.learningResource.estHours}h est.)</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-2 shrink-0">
              {item.status !== 'mastered' ? (
                <button
                  onClick={() => addMissingSkillToRoadmap(item.name)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Roadmap</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Skill Verified</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
