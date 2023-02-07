import { useEffect } from "react";

export interface ModalFunctions {
  isModalShown: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function useModalKeyShortcuts({
  isModalShown,
  onConfirm: confirm,
  onCancel: cancel,
}: ModalFunctions) {
  useEffect(() => {
    const handleKeyShortcuts = (event: KeyboardEvent) => {
      if (!isModalShown) return;

      if (event.code === "Enter") confirm();
      else if (event.code === "Escape") cancel();
    };

    window.addEventListener("keydown", handleKeyShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyShortcuts);
    };
  }, [isModalShown]);
}
