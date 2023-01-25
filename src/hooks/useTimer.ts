import { useEffect, useState } from "react";

export interface TimerOptions {
  seconds: number;
  onFinish: () => void;
  willAutoStart?: boolean;
}

export function useTimer({
  seconds,
  onFinish: finish,
  willAutoStart = false,
}: TimerOptions) {
  const [timer, setTimer] = useState(willAutoStart ? seconds : -1);

  useEffect(() => {
    if (timer < 0) return undefined;
    if (timer === 0) finish();

    const timeout = setTimeout(() => setTimer(timer - 1), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer]);

  return { timer: timer <= 0 ? 0 : timer, start: () => setTimer(seconds) };
}
