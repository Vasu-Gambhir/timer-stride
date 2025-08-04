import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Square, Edit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { startTimer, pauseTimer, stopTimer } from '../store/timerSlice';
import { formatTime } from '../utils/time';

const TaskDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { timers, projects, tasks } = useAppSelector((state) => state.timer);
  
  const [activeTab, setActiveTab] = useState<'timesheets' | 'details'>('timesheets');
  const [currentElapsed, setCurrentElapsed] = useState(0);

  const timer = timers.find(t => t.id === id);
  const project = timer ? projects.find(p => p.id === timer.projectId) : null;
  const task = timer ? tasks.find(t => t.id === timer.taskId) : null;

  useEffect(() => {
    if (!timer) return;
    
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
  }, [timer?.status, timer?.startTime, timer?.elapsedTime]);

  if (!timer || !project || !task) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <p className="text-white">Timer not found</p>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (timer.status === 'running') {
      dispatch(pauseTimer(timer.id));
    } else {
      dispatch(startTimer(timer.id));
    }
  };

  const handleStop = () => {
    dispatch(stopTimer(timer.id));
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button 
          onClick={() => navigate('/')}
          className="text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-lg font-medium flex-1 text-center mx-4">
          {task.name}
        </h1>
        <button className="text-white">
          <Edit size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 mb-6">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('timesheets')}
            className={`text-white text-sm pb-2 ${
              activeTab === 'timesheets' ? 'border-b-2 border-white' : ''
            }`}
          >
            Timesheets
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={`text-white text-sm pb-2 ${
              activeTab === 'details' ? 'border-b-2 border-white' : ''
            }`}
          >
            Details
          </button>
        </div>
      </div>

      {activeTab === 'timesheets' ? (
        <div className="px-4">
          {/* Active Timer Card */}
          <div className="bg-card-translucent backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="text-white/80 text-sm mb-1">
              Monday
            </div>
            <div className="text-white/80 text-sm mb-4">
              {new Date().toLocaleDateString('en-GB')}
            </div>
            <div className="text-white/80 text-sm mb-2">
              Start Time 10:00
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-white text-4xl font-mono">
                {formatTime(currentElapsed)}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleStop}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"
                >
                  <Square size={20} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-background"
                >
                  {timer.status === 'running' ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Description</span>
                <Edit className="text-white/60" size={16} />
              </div>
              <p className="text-white text-sm">
                {timer.description}
              </p>
              <button className="text-white/60 text-sm mt-1">Read More</button>
            </div>
          </div>

          {/* Completed Records */}
          <div className="mb-6">
            <h3 className="text-white/80 text-sm mb-4">Completed Records</h3>
            
            {/* Sample completed records */}
            <div className="space-y-3">
              <div className="bg-card-translucent backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-white text-sm">Sunday</span>
                    </div>
                    <div className="text-white/60 text-xs ml-8">
                      {new Date(Date.now() - 86400000).toLocaleDateString('en-GB')}
                    </div>
                    <div className="text-white/60 text-xs ml-8">
                      Start Time 10:00
                    </div>
                  </div>
                  <div className="text-white font-mono">08:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4">
          {/* Project Details */}
          <div className="bg-card-translucent backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <div className="text-accent text-sm font-medium mb-1">Project</div>
              <div className="text-white text-lg">{project.name}</div>
            </div>
            
            <div className="mb-4">
              <div className="text-white/80 text-sm mb-1">Deadline</div>
              <div className="text-white">{timer.deadline}</div>
            </div>
            
            <div className="mb-6">
              <div className="text-white/80 text-sm mb-1">Assigned to</div>
              <div className="text-white">{timer.assignedTo}</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card-translucent backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white/80 text-sm">Description</div>
              <Edit className="text-white/60" size={16} />
            </div>
            <p className="text-white">
              {timer.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;