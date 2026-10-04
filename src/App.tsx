import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ResumeAnalysisPage } from './pages/ResumeAnalysisPage';
import { PortfolioBuilderPage } from './pages/PortfolioBuilderPage';
import { CareerAnalysisPage } from './pages/CareerAnalysisPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { PracticePage } from './pages/PracticePage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AICareerStudioPage } from './pages/AICareerStudioPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activePage } = useApp();

  // Route protection
  const renderCurrentPage = () => {
    // Public pages
    if (activePage === 'landing') return <LandingPage />;
    if (activePage === 'login') return <AuthPage />;

    // Protected pages
    if (!isAuthenticated) {
      return <AuthPage />;
    }

    switch (activePage) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'resume-builder':
        return <ResumeBuilderPage />;
      case 'resume-analysis':
        return <ResumeAnalysisPage />;
      case 'portfolio-builder':
        return <PortfolioBuilderPage />;
      case 'career-analysis':
        return <CareerAnalysisPage />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'practice':
        return <PracticePage />;
      case 'mock-interview':
        return <MockInterviewPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'application-tracker':
        return <ApplicationTrackerPage />;
      case 'ai-studio':
        return <AICareerStudioPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
