import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Camera, 
  BarChart3, 
  Trophy, 
  User,
  Zap,
  Play
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Layout = ({ children, currentView, onNavigate }: LayoutProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'record', icon: Camera, label: 'Record' },
    { id: 'dashboard', icon: BarChart3, label: 'Stats' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Status Bar */}
      <div className="gradient-hero text-white p-4 text-center font-semibold">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" />
          AI Sports Talent Scout
          <Zap className="w-5 h-5" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <Card className="border-t-2 border-primary/20 rounded-none">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col gap-1 h-16 px-2 ${
                  isActive ? 'shadow-glow' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Layout;