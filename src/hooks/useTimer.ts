import { useEffect, useState } from "react";

export interface TimerOptions {
  seconds: number;
  onFinish?: () => void;
}

export function useTimer({ seconds, onFinish: finish }: TimerOptions) {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    const timeout = setTimeout(() => setTimer((_timer) => _timer - 1), 1000);

    if (timer === 0) {
      finish?.();
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timer]);

  return { timer };
}
