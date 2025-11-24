import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Pause, RotateCcw } from 'lucide-react';

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
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {isAnimating ? <Pause size={18} /> : <Play size={18} />}
          {isAnimating ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={maxFrames - 1}
            value={currentFrame}
            onChange={(e) => setCurrentFrame(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-600 mt-1">
            Frame: {currentFrame + 1} / {maxFrames}
          </div>
        </div>
      </div>
    </div>
  );
};
