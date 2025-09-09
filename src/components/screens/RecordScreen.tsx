import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Square, 
  Play, 
  Upload,
  Zap,
  Timer,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp
} from 'lucide-react';

interface RecordScreenProps {
  onNavigate: (view: string) => void;
}

const RecordScreen = ({ onNavigate }: RecordScreenProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedTest, setSelectedTest] = useState<string>('situps');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const testTypes = [
    { id: 'situps', name: 'Sit-ups', duration: 60, icon: Target },
    { id: 'jump', name: 'Vertical Jump', duration: 10, icon: TrendingUp },
    { id: 'shuttle', name: 'Shuttle Run', duration: 30, icon: Zap },
  ];

  useEffect(() => {
    initializeCamera();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasCamera(false);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAnalysisProgress(0);
    setShowResults(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate AI analysis
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    let progress = 0;
    const analysisInterval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      
      if (progress >= 100) {
        clearInterval(analysisInterval);
        setShowResults(true);
      }
    }, 200);
  };

  const currentTest = testTypes.find(t => t.id === selectedTest);
  const TestIcon = currentTest?.icon || Target;

  if (showResults) {
    return (
      <div className="p-4 space-y-4">
        <Card className="border-2 border-success">
          <CardHeader className="text-center">
            <div className="gradient-success w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">Analysis Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">24</div>
                <div className="text-sm text-muted-foreground">Reps Detected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Form Score</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance Rating</span>
                <span className="text-success font-semibold">Excellent</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="hero" 
                className="flex-1"
                onClick={() => onNavigate('dashboard')}
              >
                View Stats
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowResults(false)}
              >
                Record Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Test Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Select Test Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {testTypes.map((test) => {
              const Icon = test.icon;
              return (
                <Button
                  key={test.id}
                  variant={selectedTest === test.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTest(test.id)}
                  className="flex flex-col gap-1 h-16"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{test.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Camera View */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TestIcon className="w-5 h-5 text-secondary" />
              {currentTest?.name} Test
            </div>
            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                REC {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-muted">
            {hasCamera ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Camera access required</p>
                  <Button size="sm" onClick={initializeCamera} className="mt-2">
                    Enable Camera
                  </Button>
                </div>
              </div>
            )}
            
            {/* Recording Overlay */}
            {isRecording && (
              <div className="absolute inset-0 border-4 border-destructive animate-pulse" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recording Controls */}
      <Card>
        <CardContent className="p-4">
          {analysisProgress > 0 && analysisProgress < 100 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary animate-pulse" />
                <span className="font-semibold">Analyzing Performance...</span>
              </div>
              <Progress value={analysisProgress} className="h-3" />
              <p className="text-sm text-muted-foreground text-center">
                AI is detecting movements and counting reps
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                variant={isRecording ? "destructive" : "record"}
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!hasCamera}
                className="flex-1"
              >
                {isRecording ? (
                  <>
                    <Square className="w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Test
                  </>
                )}
              </Button>
              
              <Button variant="outline" size="lg">
                <Upload className="w-5 h-5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            Test Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Position yourself in front of the camera</p>
          <p>• Ensure good lighting and clear visibility</p>
          <p>• Perform the exercise with proper form</p>
          <p>• AI will automatically count reps and analyze form</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordScreen;