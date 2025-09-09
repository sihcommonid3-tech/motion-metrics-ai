import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target,
  Activity,
  Zap,
  Calendar,
  Award
} from 'lucide-react';

const DashboardScreen = () => {
  const weeklyStats = [
    { day: 'Mon', situps: 20, jumps: 25 },
    { day: 'Tue', situps: 22, jumps: 28 },
    { day: 'Wed', situps: 18, jumps: 23 },
    { day: 'Thu', situps: 24, jumps: 30 },
    { day: 'Fri', situps: 26, jumps: 32 },
    { day: 'Sat', situps: 28, jumps: 35 },
    { day: 'Sun', situps: 30, jumps: 38 },
  ];

  const performanceMetrics = [
    {
      title: 'Sit-ups PB',
      value: '30',
      change: '+6',
      trend: 'up',
      icon: Target,
      color: 'success'
    },
    {
      title: 'Vertical Jump',
      value: '38cm',
      change: '+3cm',
      trend: 'up',
      icon: TrendingUp,
      color: 'secondary'
    },
    {
      title: 'Tests This Week',
      value: '12',
      change: '+4',
      trend: 'up',
      icon: Activity,
      color: 'primary'
    },
    {
      title: 'Current Streak',
      value: '7 days',
      change: 'New record!',
      trend: 'up',
      icon: Zap,
      color: 'warning'
    }
  ];

  const recentTests = [
    { test: 'Sit-ups', score: 30, date: '2024-01-15', improvement: '+6' },
    { test: 'Vertical Jump', score: '38cm', date: '2024-01-15', improvement: '+3cm' },
    { test: 'Shuttle Run', score: '4.2s', date: '2024-01-14', improvement: '-0.3s' },
    { test: 'Sit-ups', score: 24, date: '2024-01-14', improvement: '+2' },
  ];

  const maxSitups = Math.max(...weeklyStats.map(s => s.situps));
  const maxJumps = Math.max(...weeklyStats.map(s => s.jumps));

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Performance Dashboard
        </h1>
        <p className="text-muted-foreground">Track your athletic progress</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success font-medium">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`gradient-${metric.color} p-2 rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 gradient-success rounded-full"></div>
                Sit-ups
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 gradient-secondary rounded-full"></div>
                Vertical Jump (cm)
              </span>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weeklyStats.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                  <div className="space-y-1">
                    <div className="relative">
                      <div 
                        className="gradient-success rounded-sm"
                        style={{ 
                          height: `${(day.situps / maxSitups) * 40 + 8}px`,
                          minHeight: '8px'
                        }}
                      />
                      <span className="text-xs font-medium absolute -top-5 left-1/2 transform -translate-x-1/2">
                        {day.situps}
                      </span>
                    </div>
                    <div className="relative">
                      <div 
                        className="gradient-secondary rounded-sm"
                        style={{ 
                          height: `${(day.jumps / maxJumps) * 30 + 8}px`,
                          minHeight: '8px'
                        }}
                      />
                      <span className="text-xs font-medium absolute -top-5 left-1/2 transform -translate-x-1/2">
                        {day.jumps}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary" />
            Recent Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium">{test.test}</div>
                <div className="text-sm text-muted-foreground">{test.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{test.score}</div>
                <Badge variant="outline" className="text-xs">
                  {test.improvement}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Complete 50 sit-up tests</span>
              <span className="font-medium">24/50</span>
            </div>
            <Progress value={48} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Achieve 40cm vertical jump</span>
              <span className="font-medium">38cm/40cm</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Maintain 7-day streak</span>
              <span className="font-medium text-success">Complete! ✓</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardScreen;