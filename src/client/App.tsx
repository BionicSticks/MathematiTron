import { Route, Switch, Redirect } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ConceptMapPage } from './pages/ConceptMapPage';
import { TutorChatPage } from './pages/TutorChatPage';
import { PracticeModePage } from './pages/PracticeModePage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppRoutes() {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <LandingPage />;
  }

  // Logged in but needs onboarding (any status before 'active')
  if (profile && profile.onboarding_status !== 'active') {
    return (
      <Switch>
        <Route path="/onboarding" component={OnboardingPage} />
        <Route><Redirect to="/onboarding" /></Route>
      </Switch>
    );
  }

  // Fully authenticated
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/map" component={ConceptMapPage} />
      <Route path="/chat" component={TutorChatPage} />
      <Route path="/chat/:id" component={TutorChatPage} />
      <Route path="/practice" component={PracticeModePage} />
      <Route path="/practice/:conceptId" component={PracticeModePage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
