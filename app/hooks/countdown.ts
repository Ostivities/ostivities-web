import { useEffect, useState } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(600); // Default to 10 minutes
  const [isActive, setIsActive] = useState(false); // Controls whether the timer runs

  useEffect(() => {
    if (!isActive || seconds <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount or state change
  }, [isActive, seconds]);

  const setTimer = (value: number) => setSeconds(value);

  const startTimer = () => setIsActive(true); // Starts the timer
  const pauseTimer = () => setIsActive(false); // Pauses the timer
  const resetTimer = (value: number = 600) => {
    setIsActive(false);
    setSeconds(value); // Resets to default or specified value
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const timer = `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

  return { minutes, remainingSeconds, timer, setTimer, startTimer, pauseTimer, resetTimer };
};
