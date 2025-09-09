import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Trophy, 
  Target,
  Calendar,
  Award,
  Settings,
  Share2,
  Download,
  Zap,
  Star,
  Shield,
  Crown,
  TrendingUp
} from 'lucide-react';

const ProfileScreen = () => {
  const userStats = {
    name: 'Your Name',
    joinDate: 'January 2024',
    totalTests: 47,
    currentStreak: 7,
    level: 12,
    xp: 2840,
    nextLevelXP: 3000,
  };

  const achievements = [
    { id: 1, name: 'First Test', desc: 'Complete your first fitness test', icon: Target, earned: true, rarity: 'common' },
    { id: 2, name: 'Week Warrior', desc: 'Complete tests for 7 consecutive days', icon: Calendar, earned: true, rarity: 'rare' },
    { id: 3, name: 'Jump Master', desc: 'Achieve 40cm vertical jump', icon: TrendingUp, earned: false, rarity: 'epic' },
    { id: 4, name: 'Speed Demon', desc: 'Complete shuttle run under 4.0s', icon: Zap, earned: false, rarity: 'legendary' },
    { id: 5, name: 'Perfect Form', desc: 'Get 100% form score', icon: Star, earned: true, rarity: 'rare' },
    { id: 6, name: 'Top 10', desc: 'Reach top 10 in any leaderboard', icon: Crown, earned: false, rarity: 'epic' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground border-muted';
      case 'rare': return 'text-primary border-primary';
      case 'epic': return 'text-secondary border-secondary';
      case 'legendary': return 'text-warning border-warning';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const digitalPassport = {
    athleteId: 'AT-2024-001',
    verifiedTests: 47,
    blockchainHash: '0x1a2b3c4d5e6f...',
    lastVerification: '2024-01-15 14:30',
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="gradient-hero text-white">
        <CardContent className="p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="bg-white/20 text-white text-2xl">
              YU
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold mb-1">{userStats.name}</h1>
          <p className="text-white/90 text-sm mb-4">Member since {userStats.joinDate}</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{userStats.totalTests}</div>
              <div className="text-white/80 text-xs">Tests</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.currentStreak}</div>
              <div className="text-white/80 text-xs">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold">#{Math.floor(Math.random() * 100) + 1}</div>
              <div className="text-white/80 text-xs">Global Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            Level {userStats.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span className="font-medium">{userStats.xp}/{userStats.nextLevelXP}</span>
            </div>
            <Progress value={(userStats.xp / userStats.nextLevelXP) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {userStats.nextLevelXP - userStats.xp} XP to level {userStats.level + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-success" />
            Achievements ({achievements.filter(a => a.earned).length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`relative p-3 rounded-lg border-2 transition-smooth ${
                    achievement.earned 
                      ? `${getRarityColor(achievement.rarity)} bg-background`
                      : 'border-muted bg-muted/20 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`mx-auto mb-2 w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'gradient-success' : 'bg-muted'
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium mb-1">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.desc}</div>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 text-xs ${getRarityColor(achievement.rarity)}`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                  {achievement.earned && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 gradient-success rounded-full flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Digital Talent Passport */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Digital Talent Passport
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Athlete ID:</span>
              <div className="font-mono text-xs">{digitalPassport.athleteId}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Verified Tests:</span>
              <div className="font-semibold">{digitalPassport.verifiedTests}</div>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Blockchain Hash:</span>
              <div className="font-mono text-xs break-all">{digitalPassport.blockchainHash}</div>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Last Verification:</span>
              <div className="text-xs">{digitalPassport.lastVerification}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="w-4 h-4" />
              Export Passport
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <User className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4" />
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;