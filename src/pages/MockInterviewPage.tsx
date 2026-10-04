import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { AIChatInput } from '../components/AIChatInput';
import { CircularProgress } from '../components/CircularProgress';
import { InterviewMessage, InterviewFeedback } from '../types';
import confetti from 'canvas-confetti';
import {
  Video,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  Award,
  ArrowRight,
  RotateCcw,
  Loader2,
  User,
  Bot
} from 'lucide-react';

export const MockInterviewPage: React.FC = () => {
  const { user } = useAuth();
  const { setActivePage } = useApp();

  const [role, setRole] = useState(user?.targetRole || 'Full-Stack Software Engineer');
  const [interviewType, setInterviewType] = useState<'technical' | 'hr' | 'system_design'>('technical');
  const [sessionActive, setSessionActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Audio speech synthesis helper
  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const startSession = async () => {
    setSessionActive(true);
    setFeedback(null);
    setQuestionCount(0);
    setIsProcessing(true);

    const initialGreeting = `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm your AI technical interviewer for the ${role} position. We'll explore your architectural intuition, system trade-offs, and communication fluency. Let's begin with our first question.`;

    const initialMsg: InterviewMessage = {
      id: 'msg_0',
      sender: 'ai',
      text: initialGreeting,
      timestamp: Date.now()
    };

    setMessages([initialMsg]);

    try {
      let qText = `Tell me about a technical project you built recently. What architectural decisions did you make, and what was the hardest engineering trade-off you encountered?`;
      try {
        const res = await fetch('/api/interview/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role,
            interviewType,
            history: [initialMsg],
            questionIndex: 0
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.question) qText = data.question;
        }
      } catch (e) {
        console.warn('API ask error, using fallback question:', e);
      }

      const qMsg: InterviewMessage = {
        id: 'msg_q1',
        sender: 'ai',
        text: qText,
        timestamp: Date.now() + 500
      };

      setMessages(prev => [...prev, qMsg]);
      setQuestionCount(1);
      speakText(qText);
    } catch (err) {
      console.warn('Interview ask failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: InterviewMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsProcessing(true);

    // If candidate has answered 4-5 questions, offer to evaluate
    if (questionCount >= 4) {
      try {
        let evalData = null;
        try {
          const evalRes = await fetch('/api/interview/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              role,
              interviewType,
              transcript: newHistory
            })
          });
          if (evalRes.ok) evalData = await evalRes.json();
        } catch (e) {
          console.warn('API eval failed, using fallback:', e);
        }

        if (!evalData) {
          const { fallbackInterviewEvaluation } = await import('../data/fallbackApi');
          evalData = fallbackInterviewEvaluation;
        }

        setFeedback(evalData);
        setSessionActive(false);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      } catch (err) {
        console.warn('Eval failed:', err);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // Ask next question
    try {
      const fallbackQuestions = [
        `Great answer. Now suppose you need to design a system that handles high concurrent write traffic under memory constraints. How would you structure your data pipeline?`,
        `Walk me through how you isolate a performance regression in a production web application. What profiling tools do you rely on?`,
        `Tell me about a time when you had to prioritize between delivering on schedule and refactoring technical debt. How did you decide?`
      ];

      let qText = fallbackQuestions[questionCount % fallbackQuestions.length];

      try {
        const res = await fetch('/api/interview/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role,
            interviewType,
            history: newHistory,
            questionIndex: questionCount
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.question) qText = data.question;
        }
      } catch (e) {
        console.warn('Ask fetch failed, using fallback:', e);
      }

      const aiMsg: InterviewMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        text: qText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
      setQuestionCount(prev => prev + 1);
      speakText(qText);
    } catch (err) {
      console.warn('Next question failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndAndEvaluate = async () => {
    setIsProcessing(true);
    try {
      let evalData = null;
      try {
        const evalRes = await fetch('/api/interview/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role,
            interviewType,
            transcript: messages
          })
        });
        if (evalRes.ok) evalData = await evalRes.json();
      } catch (e) {
        console.warn('API eval failed, using fallback:', e);
      }

      if (!evalData) {
        const { fallbackInterviewEvaluation } = await import('../data/fallbackApi');
        evalData = fallbackInterviewEvaluation;
      }

      setFeedback(evalData);
      setSessionActive(false);
    } catch (err) {
      console.warn('Eval failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>AI Technical & Behavioral Mock Room</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Voice & Text
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live conversational interviewer evaluating structure, clarity, and trade-offs.
            </p>
          </div>
        </div>

        {/* Voice toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            className={`p-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              voiceEnabled
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-400'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Voice Audio: {voiceEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Setup bar if not active */}
      {!sessionActive && !feedback && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Launch Your Mock Interview Simulation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Simulates a 15-minute senior engineering bar-raiser round. Supports microphone speech or text typing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interview Track
              </label>
              <select
                value={interviewType}
                onChange={e => setInterviewType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="technical">Technical Architecture & Trade-offs</option>
                <option value="hr">Behavioral & STAR Leadership</option>
                <option value="system_design">System Design & Scalability</option>
              </select>
            </div>
          </div>

          <button
            onClick={startSession}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" />
            <span>Enter Mock Interview Room</span>
          </button>
        </div>
      )}

      {/* Active Interview Room */}
      {sessionActive && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          {/* Status bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Session Active · Question {questionCount} of 4
              </span>
            </div>

            <button
              onClick={handleEndAndEvaluate}
              disabled={isProcessing}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              End & Generate Scorecard
            </button>
          </div>

          {/* Transcript Chat Viewport */}
          <div className="h-96 overflow-y-auto space-y-4 p-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-2 items-center text-xs text-slate-400 pl-11">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Interviewer is evaluating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input with Speech recognition */}
          <div className="pt-2">
            <AIChatInput
              onSend={handleSendMessage}
              disabled={isProcessing}
              isProcessing={isProcessing}
              placeholder="Speak or type your answer using the STAR method..."
            />
          </div>
        </div>
      )}

      {/* Final Evaluator Scorecard */}
      {feedback && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <CircularProgress
                score={feedback.overallScore}
                size={130}
                strokeWidth={11}
                label="Overall Interview Score"
                sublabel="Senior Bar-Raiser Assessment"
              />
              <div className="max-w-md">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Hiring Verdict
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Ready for Early Career Rounds
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {feedback.verdict}
                </p>
              </div>
            </div>

            {/* Scorecard breakdown */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {feedback.clarityScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Clarity
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  {feedback.technicalScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  Technical
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                <span className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                  {feedback.starMethodScore}%
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                  STAR Method
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Strengths</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {feedback.keyStrengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Actionable Areas for Improvement</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {feedback.improvementAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => { setFeedback(null); setMessages([]); }}
              className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Another Session</span>
            </button>

            <button
              onClick={() => setActivePage('opportunities')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm"
            >
              <span>Explore Matched Openings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
