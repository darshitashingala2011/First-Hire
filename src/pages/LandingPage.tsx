import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Hero3D } from '../components/Hero3D';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Target,
  Video,
  Layers,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, switchDemoUser } = useAuth();
  const { setActivePage } = useApp();

  const handleStartNow = () => {
    if (isAuthenticated) {
      setActivePage('dashboard');
    } else {
      setActivePage('login');
    }
  };

  const handleExploreDemo = (userKey: 'ananya' | 'alex' | 'marcus') => {
    switchDemoUser(userKey);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Kicker */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Built for 2026 College Seniors & Fresh Graduates</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-normal text-indigo-600 dark:text-indigo-400">AI-Powered Career OS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              From College Campus to{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Dream Tech Offer
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Stop guessing what recruiters want. FirstHire analyzes your profile, scores your ATS resume, maps missing skill gaps, runs realistic AI mock interviews, and matches you with vetted early-career roles.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartNow}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Free Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExploreDemo('ananya')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm shadow-sm transition-all"
              >
                <span>Explore Live Demo Profile</span>
              </button>
            </div>

            {/* Micro social proof */}
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-slate-950">A</span>
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-slate-950">J</span>
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-slate-950">M</span>
              </div>
              <span>Trusted by 14,000+ students across Berkeley, Georgia Tech, Purdue & more</span>
            </div>
          </div>

          {/* Interactive 3D Hero Visual */}
          <div className="mt-4">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* Interactive Value Pillars */}
      <section className="py-16 sm:py-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Complete End-to-End Preparation
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
              Every step from resume to final round
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Designed specifically for fresh grads breaking into software engineering, data science, and product roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('resume-analysis'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>ATS Resume Scanner & Builder</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Instant parsing against modern hiring ATS algorithms. Highlights missing keywords, quantifies project impact, and enhances bullets with the Google XYZ formula.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="text-emerald-500 font-semibold">88% Avg Pass Rate</span>
                <span>·</span>
                <span>3 Clean Templates</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('skill-gap'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>Dynamic Skill Gap Engine</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Compares your current academic coursework against 2026 hiring benchmarks. Classifies skills into Mastered, In-Progress, and High-Priority Missing gaps.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Direct Roadmap Sync</span>
                <span>·</span>
                <span>Curated Lab Resources</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('roadmap'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>Personalized Career Roadmap</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Structured 12-week progression divided into CS Fundamentals, Production Architecture, Resume Polish, and Active Interview Sprints.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Checkable Milestones</span>
                <span>·</span>
                <span>Custom Timeline Generator</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('mock-interview'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>Voice & Text AI Mock Room</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Practice technical architecture, behavioral questions, and live coding trade-offs with an AI interviewer. Get feedback on Clarity, Accuracy, and STAR structure.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Web Speech API Mic</span>
                <span>·</span>
                <span>Bar-Raiser Scorecards</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('practice'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>4-Track Screening Drills</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Interactive drills across Quantitative Aptitude, Data Structures & Algorithms, Core Technical Systems, and Behavioral HR scenarios with in-depth solutions.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Instant Explanations</span>
                <span>·</span>
                <span>NeetCode Alignment</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div
              onClick={() => { switchDemoUser('ananya'); setActivePage('opportunities'); }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                <span>Opportunity Radar & Tracker</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Curated internship and new grad openings with live skill-match percentages. Manage deadlines, interviews, and offers in an integrated Kanban board.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>90%+ Match Indicators</span>
                <span>·</span>
                <span>One-Click Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Placements */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Where FirstHire students land
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real senior recruits from UC Berkeley, Georgia Tech, and Purdue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                "The bullet point enhancer transformed my vague class projects into metric-rich achievements. I got interviewed by Stripe and Figma within 2 weeks of using FirstHire."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Ananya S.</p>
                  <p className="text-[11px] text-slate-400">CS Senior @ UC Berkeley · Offer at Stripe</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                "Practicing system design trade-offs in the AI Mock Interview gave me the exact composure I needed for senior bar-raiser interviews. The instant feedback was invaluable."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Alex C.</p>
                  <p className="text-[11px] text-slate-400">ML Pre-Grad @ Georgia Tech</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                "The Skill Gap feature identified that I needed Docker and API security. It linked straight into my Roadmap and helped me ship my capstone portfolio."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
                  M
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Marcus V.</p>
                  <p className="text-[11px] text-slate-400">Software Eng @ Purdue University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border-t border-indigo-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to secure your 2026 tech offer?
          </h2>
          <p className="mt-3 text-sm text-indigo-200 max-w-xl mx-auto">
            Build your ATS resume, pinpoint your skill gaps, and practice with AI today. No credit card required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleStartNow}
              className="px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 shadow-lg transition-all hover:scale-105"
            >
              Get Started with FirstHire
            </button>
            <button
              onClick={() => handleExploreDemo('ananya')}
              className="px-6 py-3 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-medium text-sm border border-indigo-700 transition-all"
            >
              Try Instant Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">FirstHire</span>
            <span>·</span>
            <span>AI Career OS for Higher Education</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => setActivePage('resume-builder')} className="hover:underline">Resume Builder</button>
            <button onClick={() => setActivePage('roadmap')} className="hover:underline">Career Roadmap</button>
            <button onClick={() => setActivePage('mock-interview')} className="hover:underline">AI Mock Room</button>
            <button onClick={() => setActivePage('opportunities')} className="hover:underline">Internships</button>
          </div>
          <div>© 2026 FirstHire Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
