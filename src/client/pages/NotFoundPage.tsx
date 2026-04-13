import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-muted-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">Page not found</p>
        <Link href="/dashboard">
          <button className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
