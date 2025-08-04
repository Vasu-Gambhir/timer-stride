import { Plus, ArrowUpDown } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';
import { TimerCard } from '../components/TimerCard';
import { useNavigate } from 'react-router-dom';

const TimersList = () => {
  const navigate = useNavigate();
  const { timers, projects, tasks } = useAppSelector((state) => state.timer);

  const activeTimers = timers.filter(timer => timer.status !== 'stopped');

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <h1 className="text-white text-2xl font-bold">Timesheets</h1>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ArrowUpDown className="text-white" size={18} />
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
          >
            <Plus className="text-white" size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 mb-6">
        <div className="flex gap-8">
          <button className="text-white text-sm pb-2">Favorites</button>
          <button className="text-white text-sm pb-2 border-b-2 border-white">Odoo</button>
          <button className="text-white text-sm pb-2">Local</button>
        </div>
      </div>

      {/* Timer Count */}
      <div className="px-4 mb-4">
        <p className="text-white/80 text-sm">
          You have {activeTimers.length} Timer{activeTimers.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Timers List */}
      <div className="px-4">
        {activeTimers.map((timer) => {
          const project = projects.find(p => p.id === timer.projectId);
          const task = tasks.find(t => t.id === timer.taskId);
          
          if (!project || !task) return null;
          
          return (
            <TimerCard
              key={timer.id}
              timer={timer}
              project={project}
              task={task}
            />
          );
        })}
        
        {activeTimers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No active timers</p>
            <button 
              onClick={() => navigate('/create')}
              className="mt-4 px-6 py-2 bg-white/20 text-white rounded-xl"
            >
              Create your first timer
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/50 backdrop-blur-sm"></div>
    </div>
  );
};

export default TimersList;