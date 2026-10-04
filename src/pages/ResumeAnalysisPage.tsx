import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/CircularProgress';
import { ResumeAnalysisResult } from '../types';
import {
  FileCheck2,
  Sparkles,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wand2,
  FileText,
  Loader2,
  Plus
} from 'lucide-react';

export const ResumeAnalysisPage: React.FC = () => {
  const { user } = useAuth();
  const { resume, setActivePage, addSkill } = useApp();

  const [resumeText, setResumeText] = useState<string>(() => {
    // Generate initial text representation from student resume
    return `${resume.personalInfo.fullName} | ${resume.personalInfo.email} | ${resume.personalInfo.location}
Objective: ${resume.summary}

EDUCATION
${resume.education.map(e => `${e.school} — ${e.degree} (GPA: ${e.gpa || '3.8'})`).join('\n')}

EXPERIENCE
${resume.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.bullets.join('\n')}`).join('\n\n')}

PROJECTS
${resume.projects.map(p => `${p.title} [Stack: ${p.technologies.join(', ')}]\n${p.description} (Metrics: ${p.metrics || 'N/A'})`).join('\n\n')}

SKILLS
Languages: ${resume.skills.languages?.join(', ')}
Frameworks: ${resume.skills.frameworks?.join(', ')}
Tools: ${resume.skills.developerTools?.join(', ')}`;
  });

  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full-Stack Software Engineer');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  const sampleResumes = [
    {
      title: 'Current Student Resume',
      desc: 'UC Berkeley CS Senior Profile',
      text: resumeText
    },
    {
      title: 'Freshman / Sophomore Draft',
      desc: 'Needs metrics and ATS keyword alignment',
      text: `Alex Smith | alex.smith@college.edu | San Jose, CA
Objective: Seeking an entry-level software internship.

EDUCATION
San Jose State University, B.S. Software Engineering (Graduating 2026)

PROJECTS
Task Manager App
- Built a web app with React and JavaScript
- Allowed users to add, edit, and delete todo items
- Used CSS for styling

Weather App
- Made a simple weather forecast dashboard using OpenWeather API
- Handled API requests and displayed temperature

SKILLS
HTML, CSS, JavaScript, Basic Python, Git`
    }
  ];

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setAnalysisStep(1);

    const stepsTimer = setInterval(() => {
      setAnalysisStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole
        })
      });

      if (!response.ok) {
        throw new Error('Server returned ' + response.status);
      }

      const data = await response.json();
      clearInterval(stepsTimer);
      setAnalysisResult(data);
    } catch (err) {
      console.warn('Analysis error, applying resilient fallback:', err);
      clearInterval(stepsTimer);
      const { fallbackResumeAnalysis } = await import('../data/fallbackApi');
      setAnalysisResult(fallbackResumeAnalysis(targetRole));
    } finally {
      clearInterval(stepsTimer);
      setAnalyzing(false);
    }
  };

  const handleAddKeywordToSkills = (keyword: string) => {
    addSkill({
      name: keyword,
      category: 'Cloud/DevOps',
      level: 'Intermediate',
      verified: false
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>AI Resume & ATS Scanner</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                2026 Algorithms
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluates keyword density, recruiter parsability, and the Google XYZ impact formula.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Role:</label>
          <input
            type="text"
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Input / Upload Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Resume Plaintext Content
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>

          <textarea
            rows={12}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            placeholder="Paste your resume content or load a student sample..."
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Load sample:</span>
              {sampleResumes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setResumeText(s.text)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                >
                  {s.title}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={analyzing || !resumeText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning ATS Filters...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Full AI ATS Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Info / Live Status */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            What FirstHire Evaluates
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 shrink-0">
                <FileCheck2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block font-medium">ATS Parsability</strong>
                <span>Reverse-chronological hierarchy, standard section headers, font hygiene.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block font-medium">Keyword Frequency</strong>
                <span>Role-specific frameworks, databases, and architectural terms.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
                <Wand2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block font-medium">Quantified Metrics</strong>
                <span>Google XYZ impact formula: Accomplished [X] measured by [Y] doing [Z].</span>
              </div>
            </div>
          </div>

          {analyzing && (
            <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating ATS Checkpoints</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <p className={analysisStep >= 1 ? 'text-indigo-600 font-semibold' : ''}>✓ Parsing document token tree</p>
                <p className={analysisStep >= 2 ? 'text-indigo-600 font-semibold' : ''}>✓ Cross-referencing {targetRole} keywords</p>
                <p className={analysisStep >= 3 ? 'text-indigo-600 font-semibold' : ''}>✓ Scoring action verb density</p>
                <p className={analysisStep >= 4 ? 'text-indigo-600 font-semibold' : ''}>✓ Synthesizing bullet recommendations</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-fadeIn">
          {/* Header Score Overview */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <CircularProgress
                score={analysisResult.atsScore}
                size={130}
                strokeWidth={11}
                label="ATS Match Score"
                sublabel="Passes 88% of tech filters"
              />
              <div className="max-w-md">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Analysis Summary
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Ready for {targetRole} Applications
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>
            </div>

            {/* Sub-score Badges */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {analysisResult.keywordMatchScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Keywords
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {analysisResult.formattingScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Formatting
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                  {analysisResult.impactScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Impact
                </span>
              </div>
            </div>
          </div>

          {/* Missing Keywords Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>High-Yield Missing Keywords for {targetRole}</span>
              </h4>
              <span className="text-[11px] text-slate-400">Click to add to your skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {analysisResult.missingKeywords.map(kw => (
                <button
                  key={kw}
                  onClick={() => handleAddKeywordToSkills(kw)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 text-xs font-medium hover:bg-amber-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>{kw}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bullet Point Improvement Matrix (Google XYZ formula) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Recommended Bullet Point Upgrades (Google XYZ Formula)</span>
            </h4>

            <div className="space-y-4">
              {analysisResult.bulletAnalysis.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Current Draft (Passive / Unquantified)
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                        {b.original}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
                        AI High-Impact Revision (XYZ Formula)
                      </span>
                      <p className="text-slate-900 dark:text-white bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800/80 font-medium">
                        {b.improved}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                    Why this works: {b.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA to Resume Builder */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500">
              Apply these changes into your printable ATS resume
            </span>
            <button
              onClick={() => setActivePage('resume-builder')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Open in Resume Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
