import { Play, Pause, Star, Briefcase, Calendar, Square } from 'lucide-react';
import { Timer, Project, Task } from '../store/types';
import { useAppDispatch } from '../hooks/redux';
import { startTimer, pauseTimer, stopTimer, clearTimer, toggleFavorite } from '../store/timerSlice';
import { formatTime } from '../utils/time';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface TimerCardProps {
  timer: Timer;
  project: Project;
  task: Task;
}

export const TimerCard = ({ timer, project, task }: TimerCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentElapsed, setCurrentElapsed] = useState(timer.elapsedTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer.status === 'running' && timer.startTime) {
      interval = setInterval(() => {
        const elapsed = timer.elapsedTime + Math.floor((Date.now() - timer.startTime!) / 1000);
        setCurrentElapsed(elapsed);
      }, 1000);
    } else {
      setCurrentElapsed(timer.elapsedTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.status, timer.startTime, timer.elapsedTime]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timer.status === 'running') {
      dispatch(pauseTimer(timer.id));
    } else {
      dispatch(startTimer(timer.id));
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(timer.id));
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(stopTimer(timer.id));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(clearTimer(timer.id));
  };

  const handleCardClick = () => {
    navigate(`/timer/${timer.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card-translucent backdrop-blur-sm rounded-2xl p-4 mb-3 cursor-pointer transition-all duration-200 hover:bg-card border border-border"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleFavoriteToggle}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <Star 
                size={16} 
                className={timer.isFavorite ? 'fill-current' : ''} 
              />
            </button>
            <h3 className="text-foreground font-medium text-sm">
              {task.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Briefcase size={12} />
            <span>{project.code}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar size={12} />
            <span>Deadline {timer.deadline}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-foreground font-mono text-sm">
              {formatTime(currentElapsed)}
            </div>
            <div className={`text-xs ${
              timer.status === 'running' ? 'text-timer-active' : 
              timer.status === 'paused' ? 'text-timer-paused' : 
              'text-timer-stopped'
            }`}>
              {timer.status}
            </div>
          </div>
          
          <div className="flex gap-1">
            {timer.status !== 'stopped' && (
              <>
                <button
                  onClick={handlePlayPause}
                  className={`w-10 h-8 rounded-full flex items-center justify-center transition-colors ${
                    timer.status === 'running' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white text-background'
                  }`}
                >
                  {timer.status === 'running' ? (
                    <Pause size={12} />
                  ) : (
                    <Play size={12} />
                  )}
                </button>
                <button
                  onClick={handleStop}
                  className="w-10 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center transition-colors hover:bg-red-500"
                >
                  <Square size={10} />
                </button>
              </>
            )}
            {timer.status === 'stopped' && timer.elapsedTime > 0 && (
              <button
                onClick={handleClear}
                className="w-20 h-8 rounded-full bg-white/20 text-white flex items-center justify-center transition-colors text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};