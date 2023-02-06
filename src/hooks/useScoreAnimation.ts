import { useEffect, useRef, useState } from "react";

export interface ScoreAnimationOptions {
  score: number;
  onFinish: () => void;
}

const preferredDuration = 1000;
const maxInterval = 100;

export function useScoreAnimation({
  score,
  onFinish: finish,
}: ScoreAnimationOptions) {
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const startDateRef = useRef(Date.now());
  const [counter, setCounter] = useState(0);

  const clearAnimator = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const maxDuration = score * maxInterval;
    const duration =
      preferredDuration < maxDuration ? preferredDuration : maxDuration;

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startDateRef.current;
      setCounter(Math.floor((elapsedTime / duration) * score));
    }, 1);

    return clearAnimator;
  }, []);

  useEffect(() => {
    if (counter >= score) {
      clearAnimator();
      finish();
    }
  }, [counter]);

  return { counter };
}
