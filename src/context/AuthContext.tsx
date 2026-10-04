import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { initialUser } from '../data/mockData';

const demoUsers: Record<string, UserProfile> = {
  ananya: initialUser,
  alex: {
    id: 'usr_alex_02',
    name: 'Alex Chen',
    email: 'alex.chen@gatech.edu',
    headline: 'Machine Learning & Data Science Senior · Georgia Tech · PyTorch & Distributed Data',
    college: 'Georgia Institute of Technology',
    degree: 'B.S. Computer Science & AI',
    major: 'Machine Learning',
    graduationYear: 2026,
    targetRole: 'Machine Learning Engineer',
    targetCompanies: ['Google DeepMind', 'OpenAI', 'Anthropic', 'Meta', 'NVIDIA'],
    preferredLocations: ['San Francisco, CA', 'Seattle, WA', 'Remote'],
    workPreference: 'Remote',
    bio: 'CS Senior specializing in LLM fine-tuning, retrieval-augmented generation (RAG), and high-throughput vector indexing.',
    githubUrl: 'https://github.com/alexchen-ml',
    linkedinUrl: 'https://linkedin.com/in/alex-chen-ml',
    portfolioUrl: 'https://alexchen.ai',
    careerReadinessScore: 79,
    onboardingCompleted: true
  },
  marcus: {
    id: 'usr_marcus_03',
    name: 'Marcus Vance',
    email: 'mvance@purdue.edu',
    headline: 'Frontend Engineer & Interaction Craftsman · Purdue University',
    college: 'Purdue University',
    degree: 'B.S. Software Engineering',
    major: 'Human-Computer Interaction',
    graduationYear: 2026,
    targetRole: 'Frontend Engineer',
    targetCompanies: ['Linear', 'Vercel', 'Airbnb', 'Notion', 'Apple'],
    preferredLocations: ['New York, NY', 'San Francisco, CA', 'Austin, TX'],
    workPreference: 'Hybrid',
    bio: 'Crafting responsive, delightful web micro-interactions. Heavy focus on React 19, WebGL spatial shaders, and accessible design systems.',
    githubUrl: 'https://github.com/marcusvance-ui',
    linkedinUrl: 'https://linkedin.com/in/marcus-vance',
    portfolioUrl: 'https://marcusvance.design',
    careerReadinessScore: 82,
    onboardingCompleted: true
  }
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (data: { name: string; email: string; college: string; targetRole: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  switchDemoUser: (preset: 'ananya' | 'alex' | 'marcus') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('firsthire_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    return initialUser; // Default to Ananya Sharma for seamless immediate exploration
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('firsthire_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('firsthire_user');
    }
  }, [user]);

  const login = async (email: string) => {
    // Check if matches a demo user
    const matchedKey = Object.keys(demoUsers).find(k => demoUsers[k].email.toLowerCase() === email.toLowerCase());
    if (matchedKey) {
      setUser(demoUsers[matchedKey]);
      return true;
    }
    // Generic fallback user
    const newUser: UserProfile = {
      ...initialUser,
      id: 'usr_' + Date.now(),
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      careerReadinessScore: 70
    };
    setUser(newUser);
    return true;
  };

  const register = async (data: { name: string; email: string; college: string; targetRole: string }) => {
    const newUser: UserProfile = {
      ...initialUser,
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      college: data.college,
      targetRole: data.targetRole,
      headline: `Aspiring ${data.targetRole} · Student at ${data.college}`,
      careerReadinessScore: 68,
      onboardingCompleted: false
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const switchDemoUser = (preset: 'ananya' | 'alex' | 'marcus') => {
    if (demoUsers[preset]) {
      setUser(demoUsers[preset]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        switchDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
