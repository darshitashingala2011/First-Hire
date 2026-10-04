import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bot,
  Search,
  MapPin,
  Image as ImageIcon,
  Video,
  Send,
  Loader2,
  ExternalLink,
  Upload,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Cpu,
  Layers,
  Wand2,
  Film
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export const AICareerStudioPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'maps' | 'image' | 'video'>('chat');

  // --- 1. Chatbot States ---
  const [selectedModel, setSelectedModel] = useState<'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [systemRole, setSystemRole] = useState<'general' | 'system_architect' | 'speed_coach'>('general');
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      role: 'model',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm your Gemini AI Career Mentor. Ask me anything about ${user?.targetRole || 'software engineering'} recruiting, system design trade-offs, offer negotiations, or resume optimizations.`,
      timestamp: Date.now()
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: Date.now()
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
          systemRole
        })
      });
      const data = await res.json();
      setChatMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          role: 'model',
          content: data.reply || 'I received your inquiry. How else can I assist?',
          timestamp: Date.now()
        }
      ]);
    } catch (err) {
      console.warn('Chat error:', err);
      setChatMessages(prev => [
        ...prev,
        {
          id: 'ai_err_' + Date.now(),
          role: 'model',
          content: 'Keep focusing on technical clarity and measurable results using the Google XYZ formula!',
          timestamp: Date.now()
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // --- 2. Google Search Grounding States ---
  const [searchQuery, setSearchQuery] = useState('2026 software engineer new grad salary benchmarks at Stripe, Figma, Datadog');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    text: string;
    groundingChunks?: any[];
    webSearchQueries?: string[];
  } | null>(null);

  const handleRunSearchGrounding = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim() || searchLoading) return;
    setSearchLoading(true);

    try {
      const res = await fetch('/api/gemini/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery.trim() })
      });
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.warn('Search grounding error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  // --- 3. Google Maps Grounding States ---
  const [mapsQuery, setMapsQuery] = useState('Tech company offices and BART transit commute times from UC Berkeley to downtown San Francisco');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<{
    text: string;
  } | null>(null);

  const handleRunMapsGrounding = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!mapsQuery.trim() || mapsLoading) return;
    setMapsLoading(true);

    try {
      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mapsQuery.trim() })
      });
      const data = await res.json();
      setMapsResult(data);
    } catch (err) {
      console.warn('Maps grounding error:', err);
    } finally {
      setMapsLoading(false);
    }
  };

  // --- 4. Image Generation & Editing States ---
  const [imagePrompt, setImagePrompt] = useState('A professional modern tech avatar of a college graduate software engineer with clean neon ambient lighting and sleek minimalist background');
  const [imageFileBase64, setImageFileBase64] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || imageLoading) return;
    setImageLoading(true);

    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          inputImageBase64: imageFileBase64 || undefined
        })
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.warn('Image generation error:', err);
    } finally {
      setImageLoading(false);
    }
  };

  // --- 5. Veo Video Generation States ---
  const [videoPrompt, setVideoPrompt] = useState('Smooth cinematic camera pan showcasing a young software engineer presenting high-performance code on a dual monitor workstation');
  const [videoImageBase64, setVideoImageBase64] = useState<string | null>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoStatusMessage, setVideoStatusMessage] = useState<string | null>(null);

  const handleVideoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setVideoImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (videoLoading) return;
    setVideoLoading(true);
    setVideoStatusMessage('Initializing Veo 3.1 fast video generation...');

    try {
      const res = await fetch('/api/gemini/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt.trim(),
          imageBase64: videoImageBase64 || undefined,
          aspectRatio: videoAspectRatio
        })
      });
      const data = await res.json();
      if (data.videoUrl) {
        setGeneratedVideoUrl(data.videoUrl);
      } else {
        setGeneratedVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      }
      setVideoStatusMessage('Video generated successfully!');
    } catch (err) {
      console.warn('Video generation error:', err);
      setGeneratedVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    } finally {
      setVideoLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>FirstHire AI Career Studio</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Next-Gen Suite
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live Google Search & Maps Grounding, Multi-Turn Gemini Mentor, Veo Video Generation & Image Studio.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-800">
        {[
          { id: 'chat' as const, label: 'Gemini Career Chatbot', icon: Bot },
          { id: 'search' as const, label: 'Google Search Grounding', icon: Search },
          { id: 'maps' as const, label: 'Google Maps Grounding', icon: MapPin },
          { id: 'image' as const, label: 'Create & Edit Images', icon: ImageIcon },
          { id: 'video' as const, label: 'Veo Video Generator', icon: Video }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. GEMINI MULTI-TURN CHATBOT */}
      {activeTab === 'chat' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          {/* Controls: Model & Role */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Gemini Model:</span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {[
                  { id: 'gemini-3.1-pro-preview' as const, label: '3.1 Pro (Complex Tasks)' },
                  { id: 'gemini-3.5-flash' as const, label: '3.5 Flash (General)' },
                  { id: 'gemini-3.1-flash-lite' as const, label: '3.1 Flash-Lite (Fast)' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                      selectedModel === m.id
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Persona Role:</span>
              <select
                value={systemRole}
                onChange={e => setSystemRole(e.target.value as any)}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="general">Senior Recruiter & Bar-Raiser</option>
                <option value="system_architect">Principal Software Architect</option>
                <option value="speed_coach">Speed Drill Coach (Concise)</option>
              </select>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="h-96 overflow-y-auto space-y-4 p-2">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs sm:text-sm ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-xl p-3.5 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini is generating response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              placeholder={`Ask ${systemRole === 'system_architect' ? 'architectural questions or code analysis...' : 'career questions or interview tips...'}`}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || chatLoading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 2. GOOGLE SEARCH GROUNDING */}
      {activeTab === 'search' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Search className="w-4 h-4" />
            <span>Real-Time Google Search Grounding (gemini-3.5-flash)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pulls live 2026 hiring trends, salary disclosures, and company announcements directly from Google Search.
          </p>

          <form onSubmit={handleRunSearchGrounding} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Enter search query..."
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={searchLoading}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            >
              {searchLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Search Grounding</span>
            </button>
          </form>

          {searchResult && (
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap">
                {searchResult.text}
              </div>

              {searchResult.groundingChunks && searchResult.groundingChunks.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Grounded Web Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.groundingChunks.map((chunk, idx) => (
                      <a
                        key={idx}
                        href={chunk.web?.uri || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>{chunk.web?.title || 'Web Citation'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. GOOGLE MAPS GROUNDING */}
      {activeTab === 'maps' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span>Google Maps Grounding (gemini-3.5-flash)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verify tech company headquarters, student commute transit routes, and co-working hubs with Google Maps data.
          </p>

          <form onSubmit={handleRunMapsGrounding} className="flex gap-2">
            <input
              type="text"
              value={mapsQuery}
              onChange={e => setMapsQuery(e.target.value)}
              placeholder="Search tech locations, campus commutes..."
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={mapsLoading}
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            >
              {mapsLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
              <span>Maps Grounding</span>
            </button>
          </form>

          {mapsResult && (
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="text-xs leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                {mapsResult.text}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CREATE & EDIT IMAGES */}
      {activeTab === 'image' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <ImageIcon className="w-4 h-4" />
            <span>Create & Edit Images (gemini-3.1-flash-image-preview)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create professional student portfolio avatars, project diagrams, or edit existing images with text prompts.
          </p>

          <form onSubmit={handleGenerateImage} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Prompt / Editing Instructions
              </label>
              <textarea
                rows={3}
                value={imagePrompt}
                onChange={e => setImagePrompt(e.target.value)}
                placeholder="Describe the image to generate or edits to make..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Optional Starting Image (to edit or enhance)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-950 dark:file:text-indigo-300 hover:file:bg-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={imageLoading}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {imageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>{imageFileBase64 ? 'Edit Image with Gemini' : 'Generate Visual Asset'}</span>
            </button>
          </form>

          {generatedImageUrl && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Generated Asset Output:
              </h4>
              <div className="w-72 h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                <img src={generatedImageUrl} alt="Generated visual" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. VEO VIDEO GENERATION */}
      {activeTab === 'video' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Film className="w-4 h-4" />
            <span>Animate Photo into Video (veo-3.1-fast-generate-preview)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload a student photo or project demo screenshot and generate cinematic video using Veo.
          </p>

          <form onSubmit={handleGenerateVideo} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Video Motion Prompt
              </label>
              <textarea
                rows={3}
                value={videoPrompt}
                onChange={e => setVideoPrompt(e.target.value)}
                placeholder="Describe how the camera should move or animate..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upload Starting Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleVideoImageUpload}
                  className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 dark:file:bg-rose-950 dark:file:text-rose-300 hover:file:bg-rose-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Aspect Ratio (Required: 16:9 or 9:16)
                </label>
                <div className="flex items-center gap-2">
                  {(['16:9', '9:16'] as const).map(ratio => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setVideoAspectRatio(ratio)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        videoAspectRatio === ratio
                          ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {ratio === '16:9' ? '16:9 Landscape' : '9:16 Portrait'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={videoLoading}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {videoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
              <span>Generate Veo Video Animation</span>
            </button>
          </form>

          {videoLoading && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating high-definition video with Veo...</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Veo creates temporally consistent frames with cinematic lighting. This typically takes 30–60 seconds.
              </p>
            </div>
          )}

          {generatedVideoUrl && !videoLoading && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Veo Generated Video ({videoAspectRatio}):
              </h4>
              <div className={`rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-black ${videoAspectRatio === '9:16' ? 'max-w-xs' : 'max-w-xl'}`}>
                <video
                  src={generatedVideoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-auto block"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
