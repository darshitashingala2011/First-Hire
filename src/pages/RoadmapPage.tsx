import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Target,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Loader2,
  BookOpen
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const { user } = useAuth();
  const { roadmap, toggleRoadmapMilestone, addRoadmapMilestone, setRoadmap, skills } = useApp();

  const [regenerating, setRegenerating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(12);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);

  // New Milestone Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newHours, setNewHours] = useState(10);
  const [newPriority, setNewPriority] = useState<'Core' | 'Recommended' | 'Bonus'>('Core');

  const handleRegenerateRoadmap = async () => {
    setRegenerating(true);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: user?.targetRole || 'Full-Stack Software Engineer',
          currentSkills: skills.map(s => s.name),
          timeframeWeeks: selectedDuration
        })
      });
      const data = await res.json();
      if (data.phases && data.phases.length > 0) {
        setRoadmap(data.phases);
      }
    } catch (e) {
      console.warn('Roadmap regeneration error:', e);
    } finally {
      setRegenerating(false);
    }
  };

  const handleCreateMilestone = (phaseId: string) => {
    if (!newTitle.trim()) return;
    addRoadmapMilestone(phaseId, {
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom practice milestone.',
      priority: newPriority,
      estHours: Number(newHours) || 8
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(null);
  };

  // Calculate total stats
  let totalTasks = 0;
  let completedTasks = 0;
  roadmap.forEach(phase => {
    phase.milestones.forEach(m => {
      totalTasks++;
      if (m.completed) completedTasks++;
    });
  });

  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Personalized Career Roadmap</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                12-Week Sprint
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tailored for <strong className="text-slate-700 dark:text-slate-300">{user?.targetRole || 'Full-Stack Software Engineer'}</strong> at {user?.college}
            </p>
          </div>
        </div>

        {/* Progress & Regenerate Controls */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              {completedTasks} / {totalTasks} Completed ({completionPercent}%)
            </span>
            <div className="w-32 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleRegenerateRoadmap}
            disabled={regenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {regenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>AI Regenerate</span>
          </button>
        </div>
      </div>

      {/* Phases Timeline List */}
      <div className="space-y-6">
        {roadmap.map((phase, pIdx) => {
          const phaseCompleted = phase.milestones.filter(m => m.completed).length;
          const phaseTotal = phase.milestones.length;

          return (
            <div
              key={phase.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    {phase.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {phase.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {phaseCompleted}/{phaseTotal} Tasks ({phase.durationWeeks} Weeks)
                  </span>
                  <button
                    onClick={() => setShowAddModal(phase.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
                    title="Add custom milestone"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-3">
                {phase.milestones.map(m => (
                  <div
                    key={m.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => toggleRoadmapMilestone(phase.id, m.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          m.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-xs font-semibold ${
                              m.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {m.title}
                          </p>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            [{m.priority || 'Core'}]
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {m.description}
                        </p>
                        {m.resourceTitle && (
                          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                            <BookOpen className="w-3 h-3" />
                            <span>{m.resourceTitle}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{m.estHours}h</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Milestone Form Inside Phase */}
              {showAddModal === phase.id && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Add Milestone to {phase.title.split('.')[1] || phase.title}
                  </h4>
                  <input
                    type="text"
                    placeholder="Milestone Title (e.g. Implement Dijkstra routing engine)"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Description / Specific focus"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={40}
                        value={newHours}
                        onChange={e => setNewHours(Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <span className="text-xs text-slate-500">hours est.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddModal(null)}
                        className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleCreateMilestone(phase.id)}
                        className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
                      >
                        Save Milestone
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
