import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timer, TimerState, Project, Task } from "./types";

// Sample data
const sampleProjects: Project[] = [
  { id: "1", name: "Apexive: Content Planning", code: "SO056 - Booqio V2" },
  { id: "2", name: "iOS Development", code: "DEV001 - Mobile App" },
  { id: "3", name: "Web Platform", code: "WEB002 - Dashboard" },
];

const sampleTasks: Task[] = [
  { id: "1", name: "Get to know Apexer - Ivan", projectId: "1" },
  { id: "2", name: "iOS app deployment", projectId: "2" },
  { id: "3", name: "iOS app deployment with odd", projectId: "2" },
  { id: "4", name: "Design Review", projectId: "1" },
  { id: "5", name: "API Integration", projectId: "3" },
];

// 🧠 Load from localStorage
const getSavedTimers = (): Timer[] => {
  const stored = localStorage.getItem("timers");
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "1",
          projectId: "2",
          taskId: "2",
          description: "Working on iOS deployment pipeline",
          isFavorite: false,
          status: "paused",
          startTime: null,
          elapsedTime: 1800,
          deadline: "07/20/2023",
          assignedTo: "Ivan Zhuikov",
        },
        {
          id: "2",
          projectId: "2",
          taskId: "3",
          description: "iOS deployment with additional requirements",
          isFavorite: true,
          status: "paused",
          startTime: null,
          elapsedTime: 1800,
          deadline: "07/20/2023",
          assignedTo: "Ivan Zhuikov",
        },
        {
          id: "3",
          projectId: "2",
          taskId: "3",
          description: "Final testing and deployment",
          isFavorite: true,
          status: "paused",
          startTime: null,
          elapsedTime: 1800,
          deadline: "07/20/2023",
          assignedTo: "Ivan Zhuikov",
        },
      ];
};

const initialState: TimerState = {
  timers: getSavedTimers(),
  projects: sampleProjects,
  tasks: sampleTasks,
  activeTimerId: null,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    createTimer: (
      state,
      action: PayloadAction<
        Omit<Timer, "id" | "status" | "startTime" | "elapsedTime">
      >
    ) => {
      const newTimer: Timer = {
        ...action.payload,
        id: Date.now().toString(),
        status: "paused",
        startTime: null,
        elapsedTime: 0,
      };
      state.timers.unshift(newTimer);
    },

    startTimer: (state, action: PayloadAction<string>) => {
      const timerId = action.payload;
      const timer = state.timers.find((t) => t.id === timerId);

      if (timer) {
        if (state.activeTimerId && state.activeTimerId !== timerId) {
          const activeTimer = state.timers.find(
            (t) => t.id === state.activeTimerId
          );
          if (activeTimer && activeTimer.status === "running") {
            activeTimer.status = "paused";
            if (activeTimer.startTime) {
              activeTimer.elapsedTime += Math.floor(
                (Date.now() - activeTimer.startTime) / 1000
              );
            }
            activeTimer.startTime = null;
          }
        }

        timer.status = "running";
        timer.startTime = Date.now();
        state.activeTimerId = timerId;
      }
    },

    pauseTimer: (state, action: PayloadAction<string>) => {
      const timerId = action.payload;
      const timer = state.timers.find((t) => t.id === timerId);

      if (timer && timer.status === "running" && timer.startTime) {
        timer.status = "paused";
        timer.elapsedTime += Math.floor((Date.now() - timer.startTime) / 1000);
        timer.startTime = null;

        if (state.activeTimerId === timerId) {
          state.activeTimerId = null;
        }
      }
    },

    stopTimer: (state, action: PayloadAction<string>) => {
      const timerId = action.payload;
      const timer = state.timers.find((t) => t.id === timerId);

      if (timer) {
        if (timer.status === "running" && timer.startTime) {
          timer.elapsedTime += Math.floor(
            (Date.now() - timer.startTime) / 1000
          );
        }

        timer.status = "stopped";
        timer.startTime = null;
        timer.completedAt = Date.now();

        if (state.activeTimerId === timerId) {
          state.activeTimerId = null;
        }
      }
    },

    // ✅ Now removes the timer completely
    clearTimer: (state, action: PayloadAction<string>) => {
      const timerId = action.payload;
      state.timers = state.timers.filter((t) => t.id !== timerId);

      if (state.activeTimerId === timerId) {
        state.activeTimerId = null;
      }
    },

    updateTimerElapsed: (
      state,
      action: PayloadAction<{ timerId: string; elapsed: number }>
    ) => {
      const { timerId, elapsed } = action.payload;
      const timer = state.timers.find((t) => t.id === timerId);

      if (timer) {
        timer.elapsedTime = elapsed;
      }
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const timerId = action.payload;
      const timer = state.timers.find((t) => t.id === timerId);

      if (timer) {
        timer.isFavorite = !timer.isFavorite;
      }
    },
  },
});

export const {
  createTimer,
  startTimer,
  pauseTimer,
  stopTimer,
  clearTimer,
  updateTimerElapsed,
  toggleFavorite,
} = timerSlice.actions;

export default timerSlice.reducer;
