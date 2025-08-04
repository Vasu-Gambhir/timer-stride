export interface Project {
  id: string;
  name: string;
  code: string;
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
}

export interface Timer {
  id: string;
  projectId: string;
  taskId: string;
  description: string;
  isFavorite: boolean;
  status: 'running' | 'paused' | 'stopped';
  startTime: number | null;
  elapsedTime: number; // in seconds
  deadline?: string;
  assignedTo?: string;
  completedAt?: number;
}

export interface TimerState {
  timers: Timer[];
  projects: Project[];
  tasks: Task[];
  activeTimerId: string | null;
}

export interface RootState {
  timer: TimerState;
}