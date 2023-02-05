import { useEffect, useRef, useState } from "react";

export interface TimerOptions {
  seconds: number;
  onFinish?: () => void;
}

export function useTimer({ seconds, onFinish: finish }: TimerOptions) {
  const [timer, setTimer] = useState(seconds);
  const startDateRef = useRef(Date.now());

  useEffect(() => {
    const drift = Date.now() - startDateRef.current - (seconds - timer) * 1000;

    const timeout = setTimeout(
      () => setTimer((_timer) => _timer - 1),
      1000 - drift
    );

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
