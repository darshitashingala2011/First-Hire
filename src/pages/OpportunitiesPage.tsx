import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  X,
  Send,
  Building2
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { user } = useAuth();
  const {
    opportunities,
    toggleSaveOpportunity,
    applyToOpportunity,
    applications,
    skills,
    setActivePage
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Internship' | 'New Grad'>('All');
  const [selectedWorkModel, setSelectedWorkModel] = useState<'All' | 'Remote' | 'Hybrid' | 'Onsite'>('All');
  const [onlySaved, setOnlySaved] = useState(false);

  // Selected Opportunity for Details Modal
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [applyCoverNote, setApplyCoverNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const studentSkillNames = new Set(skills.map(s => s.name.toLowerCase()));

  // Filter opportunities
  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesModel = selectedWorkModel === 'All' || opp.workModel === selectedWorkModel;
    const matchesSaved = !onlySaved || opp.saved;

    return matchesSearch && matchesType && matchesModel && matchesSaved;
  });

  const handleApplyNow = (opp: Opportunity) => {
    applyToOpportunity(opp.id, applyCoverNote);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedOpp(null);
      setApplyCoverNote('');
    }, 1500);
  };

  const isAlreadyApplied = (oppId: string) => {
    return applications.some(a => a.opportunityId === oppId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>2026 Student & New Grad Opportunities</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AI Skill Matched
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vetted campus internships and entry-level positions matched against your skills.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('application-tracker')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>View Application Tracker ({applications.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company, or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Controls (Segmented buttons - no static pills) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['All', 'Internship', 'New Grad'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedType === t
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Model Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['All', 'Remote', 'Hybrid', 'Onsite'] as const).map(m => (
              <button
                key={m}
                onClick={() => setSelectedWorkModel(m)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedWorkModel === m
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Saved Toggle */}
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-all ${
              onlySaved
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Saved Only</span>
          </button>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No opportunities match your selected filters. Try clearing your search query.
          </div>
        ) : (
          filteredOpps.map(opp => {
            const applied = isAlreadyApplied(opp.id);
            return (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-700 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${opp.companyLogoColor} text-white flex items-center justify-center font-bold text-xs`}>
                        {opp.company.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{opp.company}</span>
                        <span className="text-slate-400 text-xs mx-1.5">·</span>
                        <span className="text-xs text-slate-500">{opp.location}</span>
                        <span className="text-slate-400 text-xs mx-1.5">·</span>
                        <span className="text-xs text-slate-500">{opp.workModel}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        opp.saved ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedOpp(opp)}
                    className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {opp.requiredSkills.map(sk => {
                      const hasSkill = studentSkillNames.has(sk.toLowerCase());
                      return (
                        <span
                          key={sk}
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            hasSkill
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {hasSkill ? '✓ ' : ''}{sk}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono block">
                      {opp.matchScore}% Skill Match
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {opp.compensation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOpp(opp)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Details
                    </button>

                    {applied ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedOpp(opp)}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Opportunity Details & 1-Click Apply Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedOpp.companyLogoColor} text-white flex items-center justify-center font-bold text-sm`}>
                  {selectedOpp.company.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedOpp.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedOpp.company} · {selectedOpp.location} · {selectedOpp.workModel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compensation & Deadline */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Compensation</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedOpp.compensation}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Application Deadline</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedOpp.deadline}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                Role Overview
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedOpp.description}
              </p>
            </div>

            {/* Requirements Checklist */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                Recruiting Requirements
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {selectedOpp.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Application Advice */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>FirstHire AI Application Tip:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedOpp.company} heavily filters for quantifiable telemetry and distributed concurrency. Highlight your <strong>CloudSync</strong> canvas project and <strong>Vercel</strong> internship metrics.
              </p>
            </div>

            {/* Quick Apply Form */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Personalized Recruiter Note (Optional):
              </label>
              <textarea
                rows={2}
                value={applyCoverNote}
                onChange={e => setApplyCoverNote(e.target.value)}
                placeholder="Briefly state your graduation year and why you are excited about this team..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">
                  Resume attached: <strong className="text-slate-800 dark:text-slate-200">{user?.name}'s ATS Resume</strong>
                </span>

                <button
                  onClick={() => handleApplyNow(selectedOpp)}
                  disabled={isAlreadyApplied(selectedOpp.id)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAlreadyApplied(selectedOpp.id) ? 'Already Applied' : 'Submit 1-Click Application'}</span>
                </button>
              </div>

              {appliedSuccess && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold text-center mt-2">
                  ✓ Application logged into your Application Tracker!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
