import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Brain, Target, BarChart3, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-primary/5 px-12">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">MathematiTron</h1>
        </div>
        <h2 className="text-4xl font-bold leading-tight mb-6">
          Your personal AI<br />math tutor
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-md">
          Learn mathematics at your own pace with an AI tutor that adapts to you.
          From basic arithmetic to advanced topology — wherever you are, wherever
          you want to go.
        </p>

        <div className="space-y-6">
          {[
            { icon: Brain, title: 'Adaptive Learning', desc: 'The AI learns how you think and adapts its teaching style' },
            { icon: Target, title: 'Goal-Oriented', desc: 'Set your target and get a personalised path to reach it' },
            { icon: BarChart3, title: 'Track Progress', desc: 'See your mastery grow across every concept over time' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">MathematiTron</h1>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isSignUp ? 'Start your math journey today' : 'Continue your learning'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="At least 6 characters"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
