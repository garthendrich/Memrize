import { useEffect } from "react";

export function useSubmitKeyShortcut(onSubmit: () => void) {
  useEffect(() => {
    const handleSubmit = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "Enter") onSubmit();
    };

    window.addEventListener("keydown", handleSubmit);

    return () => {
      window.removeEventListener("keydown", handleSubmit);
    };
  }, []);
}
