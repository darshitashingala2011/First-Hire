import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/CircularProgress';
import {
  Sparkles,
  ArrowRight,
  Target,
  FileText,
  Video,
  Briefcase,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  Building2,
  TrendingUp,
  Bookmark
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    setActivePage,
    roadmap,
    toggleRoadmapMilestone,
    opportunities,
    toggleSaveOpportunity,
    applications
  } = useApp();

  const readinessScore = user?.careerReadinessScore || 84;

  // Find next uncompleted milestones
  const activeMilestones: { phaseTitle: string; phaseId: string; m: any }[] = [];
  roadmap.forEach(phase => {
    phase.milestones.forEach(m => {
      if (!m.completed && activeMilestones.length < 3) {
        activeMilestones.push({ phaseTitle: phase.title, phaseId: phase.id, m });
      }
    });
  });

  // Calculate application stage counts
  const stageCounts = {
    wishlist: applications.filter(a => a.status === 'wishlist').length,
    applied: applications.filter(a => a.status === 'applied').length,
    screening: applications.filter(a => a.status === 'screening').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length
  };

  // Top recommended jobs
  const topJobs = [...opportunities].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Hero Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Targeting {user?.targetRole || 'Full-Stack Software Engineer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {user?.college ? `${user.college} · Class of ${user.graduationYear}` : 'Class of 2026'} · You are on track for top-tier hiring rounds. Complete today's roadmap milestones to boost your ATS match and interview score.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActivePage('resume-analysis')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analyze Resume with AI</span>
            </button>
            <button
              onClick={() => setActivePage('ai-studio')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>AI Career Studio (Search, Maps, Veo)</span>
            </button>
            <button
              onClick={() => setActivePage('mock-interview')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>Launch Mock Interview</span>
            </button>
          </div>
        </div>

        {/* Circular Career Readiness Radial Gauge */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-slate-800 self-center md:self-auto shrink-0 min-w-[210px]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Career Readiness Index
          </span>
          <CircularProgress score={readinessScore} size={110} strokeWidth={9} />
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-300">
            <div>ATS: <strong className="text-emerald-400">88%</strong></div>
            <div>Skills: <strong className="text-indigo-400">82%</strong></div>
            <div>DSA: <strong className="text-cyan-400">85%</strong></div>
            <div>Interview: <strong className="text-amber-400">80%</strong></div>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid: Active Milestones & Pipeline Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Roadmap Milestones (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Next Roadmap Milestones
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Daily recommended drills to reach 90+ readiness
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('roadmap')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeMilestones.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                All scheduled milestones completed! Regenerate or customize your roadmap.
              </div>
            ) : (
              activeMilestones.map(({ phaseTitle, phaseId, m }) => (
                <div
                  key={m.id}
                  className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => toggleRoadmapMilestone(phaseId, m.id)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        m.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                      }`}
                    >
                      {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-0.5">
                        {phaseTitle.split('.')[1]?.trim() || phaseTitle}
                      </span>
                      <p className={`text-xs font-semibold ${m.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {m.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.estHours}h</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Application Pipeline Summary (1 col) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Application Pipeline
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Active job opportunities
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('application-tracker')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Tracker
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs">
                <span className="text-slate-600 dark:text-slate-400">Wishlist & Saved</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{stageCounts.wishlist}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 text-xs text-indigo-700 dark:text-indigo-300">
                <span className="font-medium">Applied</span>
                <span className="font-mono font-bold">{stageCounts.applied}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/30 text-xs text-cyan-700 dark:text-cyan-300">
                <span className="font-medium">Screening / Assessments</span>
                <span className="font-mono font-bold">{stageCounts.screening}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 text-xs text-purple-700 dark:text-purple-300">
                <span className="font-medium">Interviewing</span>
                <span className="font-mono font-bold">{stageCounts.interview}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 text-xs text-emerald-700 dark:text-emerald-300">
                <span className="font-medium">Offers Received</span>
                <span className="font-mono font-bold">{stageCounts.offer}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage('opportunities')}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse 2026 Openings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Opportunities Match Grid */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              AI-Matched Roles for Your Profile
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked dynamically by your mastered skills & coursework
            </p>
          </div>
          <button
            onClick={() => setActivePage('opportunities')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({opportunities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topJobs.map(job => (
            <div
              key={job.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${job.companyLogoColor} text-white flex items-center justify-center font-bold text-xs`}>
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{job.company}</span>
                      <span className="text-[10px] text-slate-400 block">{job.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveOpportunity(job.id)}
                    className={`p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 ${
                      job.saved ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  {job.compensation} · {job.type}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {job.requiredSkills.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                  {job.matchScore}% Match
                </span>
                <button
                  onClick={() => setActivePage('opportunities')}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
