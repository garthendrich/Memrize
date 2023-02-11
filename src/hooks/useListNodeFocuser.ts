import { useEffect, useRef, useState } from "react";

export function useListNodeFocuser() {
  const nodesRef = useRef<HTMLElement[]>([]);
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);
  const [highestFocusedNodeIndex, setHighestFocusedNodeIndex] = useState(0);

  const focusAt = (
    nodeIndex: number,
    scrollOptions: ScrollOptions = { behavior: "smooth" }
  ) => {
    const node = nodesRef.current[nodeIndex];
    const nodeMiddlePos = node.offsetTop + node.clientHeight / 2;
    const screenMiddlePos = window.innerHeight / 2;
    window.scroll({ top: nodeMiddlePos - screenMiddlePos, ...scrollOptions });

    node.focus();
  };

  const focusNextNode = () => {
    setFocusedNodeIndex((previousValue) =>
      Math.min(previousValue + 1, nodesRef.current.length - 1)
    );
  };

  const focusPreviousNode = () => {
    setFocusedNodeIndex((previousValue) => Math.max(previousValue - 1, 0));
  };

  const focusFirstNode = () => {
    setFocusedNodeIndex(0);
  };

  const focusEndmostFocusedNode = () => {
    setFocusedNodeIndex(highestFocusedNodeIndex);
  };

  useEffect(() => focusAt(0, { behavior: "auto" }), []);

  useEffect(() => {
    focusAt(focusedNodeIndex);

    setHighestFocusedNodeIndex((previousValue) =>
      focusedNodeIndex > previousValue ? focusedNodeIndex : previousValue
    );
  }, [focusedNodeIndex]);

  useEffect(() => {
    const handleWheelNavigation = (event: WheelEvent) => {
      event.preventDefault();

      if (event.deltaY > 0) focusNextNode();
      else focusPreviousNode();
    };

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case "Enter":
          if (event.ctrlKey) return;

          if (event.shiftKey) focusPreviousNode();
          else focusNextNode();
          break;
        case "ArrowDown":
          focusNextNode();
          break;
        case "ArrowUp":
          focusPreviousNode();
          break;
        case "Home":
          focusFirstNode();
          break;
        case "End":
          focusEndmostFocusedNode();
          break;
        default:
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
  }, [highestFocusedNodeIndex]);

  useEffect(() => {
    const getDistanceToScreenMiddle = (node: HTMLElement) => {
      const screenMiddlePos =
        document.documentElement.scrollTop + window.innerHeight / 2;

      const nodeMiddlePos = node.offsetTop + node.clientHeight / 2;
      const nodeDistance = nodeMiddlePos - screenMiddlePos;
      return nodeDistance;
    };

    const focusNearest = () => {
      for (
        let nodeIndex = 0;
        nodeIndex < nodesRef.current.length;
        nodeIndex += 1
      ) {
        const currentNode = nodesRef.current[nodeIndex];
        const nodeDistance = getDistanceToScreenMiddle(currentNode);

        if (nodeDistance > 0 || nodeIndex === nodesRef.current.length - 1) {
          const previousNode = nodesRef.current[Math.max(nodeIndex - 1, 0)];
          const previousNodeDistance = getDistanceToScreenMiddle(previousNode);

          if (Math.abs(previousNodeDistance) < Math.abs(nodeDistance)) {
            setFocusedNodeIndex(nodeIndex - 1);
            focusAt(nodeIndex - 1);
          } else {
            setFocusedNodeIndex(nodeIndex);
            focusAt(nodeIndex);
          }

          break;
        }
      }
    };

    const handleMouseUpOnScrollBar = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.tagName === "HTML") setTimeout(focusNearest, 20);
    };

    window.addEventListener("mouseup", handleMouseUpOnScrollBar);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpOnScrollBar);
    };
  }, []);

  const setNodesRef = (nodeIndex: number, node: HTMLElement) => {
    nodesRef.current[nodeIndex] = node;
  };

  return {
    setNodesRef,
    setFocusedNodeIndex,
    highestFocusedNodeIndex,
    focusNextNode,
    focusPreviousNode,
    focusFirstNode,
    focusEndmostFocusedNode,
  };
}
