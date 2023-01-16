import { useEffect, useState } from "react";

export interface TimerProps {
  seconds: number;
  onFinish: () => void;
  willAutoStart?: boolean;
}

export function useTimer({
  seconds,
  onFinish: finish,
  willAutoStart = false,
}: TimerProps) {
  const [timer, setTimer] = useState(willAutoStart ? seconds : -1);

  useEffect(() => {
    if (timer === 0) finish();
    if (timer <= 0) return;

    setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  return { timer: timer <= 0 ? 0 : timer, start: () => setTimer(seconds) };
}
