import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Zap, 
  Target, 
  TrendingUp,
  Award,
  Activity,
  Trophy
} from 'lucide-react';
import heroImage from '@/assets/hero-sports.jpg';

interface HomeScreenProps {
  onNavigate: (view: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const quickStats = [
    { label: 'Tests Completed', value: '12', icon: Activity, color: 'success' },
    { label: 'Best Jump', value: '28cm', icon: TrendingUp, color: 'secondary' },
    { label: 'Current Rank', value: '#47', icon: Trophy, color: 'primary' },
  ];

  const availableTests = [
    {
      id: 'situps',
      name: 'Sit-ups Test',
      description: 'Core strength assessment',
      duration: '60 seconds',
      icon: Target,
    },
    {
      id: 'jump',
      name: 'Vertical Jump',
      description: 'Explosive power measurement',
      duration: '3 attempts',
      icon: TrendingUp,
    },
    {
      id: 'shuttle',
      name: 'Shuttle Run',
      description: 'Agility & speed test',
      duration: '30 seconds',
      icon: Zap,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden border-2 border-primary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative gradient-hero p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Ready to Train?</h1>
          <p className="text-white/90 mb-4">
            AI-powered performance analysis at your fingertips
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => onNavigate('record')}
            className="shadow-lg"
          >
            <Play className="w-5 h-5" />
            Start Recording
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Your Progress
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center p-3">
                <CardContent className="p-0">
                  <Icon className={`w-6 h-6 mx-auto mb-2 text-${stat.color}`} />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Available Tests */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-secondary" />
          Available Tests
        </h2>
        <div className="space-y-3">
          {availableTests.map((test) => {
            const Icon = test.icon;
            return (
              <Card key={test.id} className="hover:shadow-lg transition-smooth">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-3">
                    <div className="gradient-primary p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{test.name}</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        {test.description}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {test.duration}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => onNavigate('record')}
                  >
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-success" />
            Recent Achievement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="gradient-success p-3 rounded-full">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold">Personal Best!</div>
              <div className="text-sm text-muted-foreground">
                New vertical jump record: 28cm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;