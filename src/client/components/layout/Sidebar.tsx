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
  const { profile, signOut } = useAuth();

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border p-4">
        <GraduationCap className="h-7 w-7 text-primary" />
        <span className="text-lg font-semibold">MathematiTron</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.startsWith(path);
          return (
            <Link key={path} href={path}>
              <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}>
                <Icon className="h-4 w-4" />
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              {profile?.display_name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <span className="truncate text-sm font-medium">
              {profile?.display_name ?? 'Student'}
            </span>
          </div>
          <button
            onClick={signOut}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
