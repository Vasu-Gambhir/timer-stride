// components/LocalStorageSync.tsx
import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux";

const LocalStorageSync = () => {
  const timers = useAppSelector((state) => state.timer.timers);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  return null;
};

export default LocalStorageSync;
