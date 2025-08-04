import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { createTimer } from '../store/timerSlice';

const CreateTimer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects, tasks } = useAppSelector((state) => state.timer);
  
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [description, setDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  const availableTasks = tasks.filter(task => task.projectId === selectedProject);
  const selectedProjectObj = projects.find(p => p.id === selectedProject);
  const selectedTaskObj = tasks.find(t => t.id === selectedTask);

  const handleSubmit = () => {
    if (!selectedProject || !selectedTask || !description.trim()) {
      return;
    }

    dispatch(createTimer({
      projectId: selectedProject,
      taskId: selectedTask,
      description: description.trim(),
      isFavorite,
      deadline: '07/20/2023', // Mock deadline
      assignedTo: 'Ivan Zhuikov', // Mock assignee
    }));

    navigate('/');
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
        <h1 className="text-white text-xl font-medium">Create Timer</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Project Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="w-full bg-card-translucent backdrop-blur-sm border border-input-border rounded-2xl p-4 flex items-center justify-between text-left"
          >
            <span className={selectedProjectObj ? 'text-foreground' : 'text-muted-foreground'}>
              {selectedProjectObj ? selectedProjectObj.name : 'Project'}
            </span>
            <ChevronDown className="text-muted-foreground" size={20} />
          </button>
          
          {showProjectDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-input-border rounded-2xl overflow-hidden z-10">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project.id);
                    setSelectedTask(''); // Reset task when project changes
                    setShowProjectDropdown(false);
                  }}
                  className="w-full p-4 text-left hover:bg-muted transition-colors text-foreground"
                >
                  {project.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Task Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTaskDropdown(!showTaskDropdown)}
            disabled={!selectedProject}
            className="w-full bg-card-translucent backdrop-blur-sm border border-input-border rounded-2xl p-4 flex items-center justify-between text-left disabled:opacity-50"
          >
            <span className={selectedTaskObj ? 'text-foreground' : 'text-muted-foreground'}>
              {selectedTaskObj ? selectedTaskObj.name : 'Task'}
            </span>
            <ChevronDown className="text-muted-foreground" size={20} />
          </button>
          
          {showTaskDropdown && selectedProject && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-input-border rounded-2xl overflow-hidden z-10">
              {availableTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task.id);
                    setShowTaskDropdown(false);
                  }}
                  className="w-full p-4 text-left hover:bg-muted transition-colors text-foreground"
                >
                  {task.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full bg-card-translucent backdrop-blur-sm border border-input-border rounded-2xl p-4 text-foreground placeholder-muted-foreground resize-none h-24"
          />
        </div>

        {/* Make Favorite */}
        <div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center gap-3 text-foreground"
          >
            <ChevronDown 
              className={`transition-transform ${isFavorite ? 'rotate-0' : 'rotate-180'}`}
              size={20} 
            />
            <span>Make Favorite</span>
          </button>
        </div>
      </div>

      {/* Create Button */}
      <div className="fixed bottom-8 left-4 right-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedProject || !selectedTask || !description.trim()}
          className="w-full bg-gradient-button text-white py-4 rounded-2xl font-medium disabled:opacity-50 disabled:bg-muted"
        >
          Create Timer
        </button>
      </div>
    </div>
  );
};

export default CreateTimer;