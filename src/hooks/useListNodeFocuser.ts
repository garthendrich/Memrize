import { useEffect, useRef, useState } from "react";

export function useListNodeFocuser() {
  const nodesRef = useRef<HTMLElement[]>([]);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  const focusAt = (
    nodeIndex: number,
    scrollOptions: ScrollOptions = { behavior: "smooth" }
  ) => {
    setTimeout(() => {
      const node = nodesRef.current[nodeIndex];
      const nodeMiddlePos = node.offsetTop + node.clientHeight / 2;
      const screenMiddlePos = window.innerHeight / 2;
      window.scroll({ top: nodeMiddlePos - screenMiddlePos, ...scrollOptions });
    }, 20);
  };

  useEffect(() => focusAt(0, { behavior: "auto" }), []);

  useEffect(() => focusAt(focusedNodeIndex), [focusedNodeIndex]);

  useEffect(() => {
    const goToNextFocusedNode = () => {
      setFocusedNodeIndex((previousValue) =>
        Math.min(previousValue + 1, nodesRef.current.length - 1)
      );
    };

    const goToPreviousFocusedNode = () => {
      setFocusedNodeIndex((previousValue) => Math.max(previousValue - 1, 0));
    };

    const handleWheelNavigation = (event: WheelEvent) => {
      event.preventDefault();

      if (event.deltaY > 0) goToNextFocusedNode();
      else goToPreviousFocusedNode();
    };

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "Enter", "Tab"].includes(event.code))
        return;

      event.preventDefault();

      if (["Enter", "Tab"].includes(event.code)) {
        if (event.shiftKey) goToPreviousFocusedNode();
        else goToNextFocusedNode();
      } else if (event.code === "ArrowDown") {
        goToNextFocusedNode();
      } else if (event.code === "ArrowUp") {
        goToPreviousFocusedNode();
      }
    };

    document.body.addEventListener("wheel", handleWheelNavigation, {
      passive: false,
    });
    window.addEventListener("keydown", handleKeyNavigation);

    return () => {
      document.body.removeEventListener("wheel", handleWheelNavigation);
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, []);

  const setNodesRef = (nodeIndex: number, node: HTMLElement) => {
    nodesRef.current[nodeIndex] = node;
  };

  return { setNodesRef };
}
