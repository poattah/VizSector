import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export const AnimationController: React.FC = () => {
  const { dataset, chartConfig, isAnimating, currentFrame, setIsAnimating, setCurrentFrame } = useStore();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const maxFrames = dataset?.data.length || 0;
  const canAnimate = chartConfig.animationEnabled && maxFrames > 0;

  useEffect(() => {
    if (isAnimating && canAnimate) {
      const id = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= maxFrames - 1) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, chartConfig.animationDuration);
      setIntervalId(id);

      return () => {
        if (id) clearInterval(id);
      };
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [isAnimating, canAnimate, chartConfig.animationDuration, maxFrames]);

  const handlePlayPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentFrame(0);
  };

  if (!canAnimate) {
    return null;
  }

  return (
    <div className="bg-card border-t border-border px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          onClick={handlePlayPause}
          className="gap-2"
        >
          {isAnimating ? <Pause size={18} /> : <Play size={18} />}
          {isAnimating ? 'Pause' : 'Play'}
        </Button>
        <Button
          onClick={handleReset}
          variant="secondary"
          className="gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </Button>
        <div className="flex-1">
          <Slider
            min={0}
            max={maxFrames - 1}
            value={currentFrame}
            onChange={(e) => setCurrentFrame(Number(e.target.value))}
          />
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Frame: {currentFrame + 1} / {maxFrames}
          </div>
        </div>
      </div>
    </div>
  );
};
