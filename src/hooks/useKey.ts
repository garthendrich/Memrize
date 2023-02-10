import { useEffect } from "react";

interface Combination {
  code: KeyboardEvent["code"];
  altKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
}

export function useKey(
  combination: Combination,
  action: () => void,
  dependencies?: React.DependencyList
) {
  useEffect(() => {
    const handleSubmit = (event: KeyboardEvent) => {
      if (
        event.code === combination.code &&
        (combination.altKey === undefined ||
          event.altKey === combination.altKey) &&
        (combination.ctrlKey === undefined ||
          event.ctrlKey === combination.ctrlKey) &&
        (combination.shiftKey === undefined ||
          event.shiftKey === combination.shiftKey)
      ) {
        action();
      }
    };

    window.addEventListener("keydown", handleSubmit);

    return () => {
      window.removeEventListener("keydown", handleSubmit);
    };
  }, dependencies ?? []);
}
