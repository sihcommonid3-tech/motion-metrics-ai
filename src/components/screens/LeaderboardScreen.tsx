import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Trophy, 
  Medal, 
  Crown,
  Target,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';

const LeaderboardScreen = () => {
  const categories = [
    { id: 'situps', name: 'Sit-ups', icon: Target },
    { id: 'jump', name: 'Vertical Jump', icon: TrendingUp },
    { id: 'shuttle', name: 'Shuttle Run', icon: Zap },
  ];

  const leaderboardData = {
    situps: [
      { rank: 1, name: 'Alex Chen', score: '45 reps', improvement: '+8', avatar: 'AC', isCurrentUser: false },
      { rank: 2, name: 'Maria Santos', score: '42 reps', improvement: '+5', avatar: 'MS', isCurrentUser: false },
      { rank: 3, name: 'David Kim', score: '38 reps', improvement: '+3', avatar: 'DK', isCurrentUser: false },
      { rank: 4, name: 'Sarah Johnson', score: '35 reps', improvement: '+7', avatar: 'SJ', isCurrentUser: false },
      { rank: 5, name: 'You', score: '30 reps', improvement: '+6', avatar: 'YU', isCurrentUser: true },
    ],
    jump: [
      { rank: 1, name: 'Marcus Lee', score: '48cm', improvement: '+4cm', avatar: 'ML', isCurrentUser: false },
      { rank: 2, name: 'Emma Wilson', score: '45cm', improvement: '+2cm', avatar: 'EW', isCurrentUser: false },
      { rank: 3, name: 'Carlos Rodriguez', score: '42cm', improvement: '+5cm', avatar: 'CR', isCurrentUser: false },
      { rank: 4, name: 'You', score: '38cm', improvement: '+3cm', avatar: 'YU', isCurrentUser: true },
      { rank: 5, name: 'Nina Patel', score: '36cm', improvement: '+1cm', avatar: 'NP', isCurrentUser: false },
    ],
    shuttle: [
      { rank: 1, name: 'Jordan Taylor', score: '3.8s', improvement: '-0.2s', avatar: 'JT', isCurrentUser: false },
      { rank: 2, name: 'Lisa Zhang', score: '3.9s', improvement: '-0.3s', avatar: 'LZ', isCurrentUser: false },
      { rank: 3, name: 'Mike Brown', score: '4.1s', improvement: '-0.1s', avatar: 'MB', isCurrentUser: false },
      { rank: 4, name: 'You', score: '4.2s', improvement: '-0.3s', avatar: 'YU', isCurrentUser: true },
      { rank: 5, name: 'Amy Foster', score: '4.3s', improvement: '-0.2s', avatar: 'AF', isCurrentUser: false },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState('situps');
  const currentLeaderboard = leaderboardData[selectedCategory as keyof typeof leaderboardData];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-warning" />;
      case 2:
        return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3:
        return <Medal className="w-5 h-5 text-warning/70" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'gradient-hero';
      case 2:
        return 'gradient-primary';
      case 3:
        return 'gradient-secondary';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-warning" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">Compete with athletes worldwide</p>
      </div>

      {/* Category Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-smooth ${
                    selectedCategory === category.id
                      ? 'gradient-primary text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="gradient-hero p-6 text-white text-center">
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-16 h-12 gradient-primary rounded-t-lg flex items-center justify-center mb-2">
                  <Medal className="w-6 h-6" />
                </div>
                <Avatar className="mx-auto mb-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentLeaderboard[1]?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{currentLeaderboard[1]?.name}</div>
                <div className="text-xs opacity-90">{currentLeaderboard[1]?.score}</div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="w-20 h-16 gradient-secondary rounded-t-lg flex items-center justify-center mb-2">
                  <Crown className="w-8 h-8" />
                </div>
                <Avatar className="mx-auto mb-2 w-12 h-12">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {currentLeaderboard[0]?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="font-bold">{currentLeaderboard[0]?.name}</div>
                <div className="text-sm opacity-90">{currentLeaderboard[0]?.score}</div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-16 h-10 gradient-success rounded-t-lg flex items-center justify-center mb-2">
                  <Medal className="w-5 h-5" />
                </div>
                <Avatar className="mx-auto mb-2">
                  <AvatarFallback className="bg-success text-success-foreground">
                    {currentLeaderboard[2]?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{currentLeaderboard[2]?.name}</div>
                <div className="text-xs opacity-90">{currentLeaderboard[2]?.score}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Full Rankings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentLeaderboard.map((player, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                player.isCurrentUser 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getRankIcon(player.rank)}
                </div>
                
                <Avatar>
                  <AvatarFallback className={player.isCurrentUser ? 'bg-primary text-primary-foreground' : ''}>
                    {player.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className={`font-medium ${player.isCurrentUser ? 'text-primary' : ''}`}>
                    {player.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.score}
                  </div>
                </div>
              </div>
              
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  player.improvement.startsWith('+') || player.improvement.startsWith('-')
                    ? 'text-success border-success/50'
                    : ''
                }`}
              >
                {player.improvement}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="border-2 border-secondary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-5 h-5 text-secondary" />
            Weekly Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-3">
            <div className="gradient-secondary p-4 rounded-lg">
              <Trophy className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold">Beat Your Personal Best</div>
              <div className="text-white/90 text-sm">Complete any test with a new record</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Reward: 100 XP + Exclusive Badge
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardScreen;