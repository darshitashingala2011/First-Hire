import React, { useState } from 'react';
import { initialPracticeQuestions } from '../data/mockData';
import { PracticeTrack, PracticeQuestion } from '../types';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Code2,
  Cpu,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Lightbulb
} from 'lucide-react';

export const PracticePage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<PracticeTrack>('dsa');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Filter questions for the active track
  const trackQuestions = initialPracticeQuestions.filter(q => q.track === selectedTrack);
  const currentQ = trackQuestions[currentQuestionIndex] || trackQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || hasSubmitted) return;
    setHasSubmitted(true);
    setAnsweredCount(prev => prev + 1);

    if (selectedOption === currentQ.correctOptionIndex) {
      setScore(prev => prev + 1);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setShowHint(false);
    if (currentQuestionIndex + 1 < trackQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleTrackChange = (track: PracticeTrack) => {
    setSelectedTrack(track);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Interview Screening Drills</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Active Scoring
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Practice 4 core campus recruiting tracks with real-time feedback & explanations.
            </p>
          </div>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400">Session Accuracy</span>
            <p className="text-sm font-mono font-bold text-slate-900 dark:text-white">
              {answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0}% ({score}/{answeredCount})
            </p>
          </div>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        {[
          { id: 'aptitude' as const, label: 'Aptitude & Math', icon: Sparkles },
          { id: 'dsa' as const, label: 'DSA & Algorithms', icon: Code2 },
          { id: 'technical' as const, label: 'Core Technical', icon: Cpu },
          { id: 'hr' as const, label: 'Behavioral & HR', icon: Users }
        ].map(t => {
          const Icon = t.icon;
          const isActive = selectedTrack === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTrackChange(t.id)}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      {currentQ ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {trackQuestions.length}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">Difficulty: {currentQ.difficulty}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {currentQ.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title & Prompt */}
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {currentQ.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQ.prompt}
            </p>
          </div>

          {/* Optional Code Snippet */}
          {currentQ.codeSnippet && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOptionIndex;

              let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-700 bg-slate-50/40 dark:bg-slate-950/40';

              if (hasSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                } else {
                  optionStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              } else if (isSelected) {
                optionStyle = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {hasSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {hasSubmitted && (
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Recruiter Insight & Explanation:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Select an option and submit to verify.
            </div>

            <div className="flex items-center gap-3">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-xs text-slate-500">
          No questions available in this track.
        </div>
      )}
    </div>
  );
};
