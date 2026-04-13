import { Link, useLocation } from 'wouter';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  MessageSquare,
  Map,
  Dumbbell,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chat', label: 'Tutor', icon: MessageSquare },
  { path: '/map', label: 'Concept Map', icon: Map },
  { path: '/practice', label: 'Practice', icon: Dumbbell },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const { profile, user, signOut } = useAuth();
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Student';

  return (
    <aside className="flex w-64 flex-col bg-card shadow-ambient">
      {/* Logo */}
      <div className="flex items-center gap-2 p-5 pb-6">
        <GraduationCap className="h-7 w-7 text-primary" />
        <span className="text-lg font-semibold tracking-tight">MathematiTron</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.startsWith(path);
          return (
            <Link key={path} href={path}>
              <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'surface-low text-primary'
                  : 'text-muted-foreground hover:surface-low hover:text-foreground'
              }`}>
                <Icon className="h-5 w-5" />
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 mt-auto">
        <div className="flex items-center justify-between rounded-xl surface-low px-3 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              {displayName[0].toUpperCase()}
            </div>
            <span className="truncate text-sm font-medium">
              {displayName}
            </span>
          </div>
          <button
            onClick={signOut}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:surface-mid transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
