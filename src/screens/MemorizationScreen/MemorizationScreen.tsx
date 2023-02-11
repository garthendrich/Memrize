import { useState } from "react";

import { Button, GameHeader, ItemFlasher, ItemList, Modal } from "@/components";
import { useKey, useListNodeFocuser, useTimer } from "@/hooks";
import { GameMode } from "@/shared";

export interface MemorizationScreenProps {
  gameMode: GameMode;
  items: string[];
  onPhaseEnd: () => void;
}

export function MemorizationScreen({
  gameMode,
  items,
  onPhaseEnd: endPhase,
}: MemorizationScreenProps) {
  const { timer } = useTimer({
    seconds: 300,
    onFinish: ["classic words", "classic numbers"].includes(gameMode)
      ? endPhase
      : undefined,
  });

  const [isNextPhaseModalShown, setIsNextPhaseModalShown] = useState(false);

  const renderBody = () => {
    switch (gameMode) {
      case "classic words":
      case "classic numbers":
        // eslint-disable-next-line no-case-declarations
        const {
          setFocusedNodeIndex,
          setNodesRef,
          highestFocusedNodeIndex,
          focusPreviousNode,
          focusNextNode,
        } = useListNodeFocuser();

        // eslint-disable-next-line no-case-declarations
        const itemNodeBuilder = (item: string, itemIndex: number) => {
          const textColor =
            itemIndex > highestFocusedNodeIndex ? "text-primary-800" : "";

          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <p
              onClick={() => setFocusedNodeIndex(itemIndex)}
              ref={(p) => setNodesRef(itemIndex, p!)}
              className={`cursor-pointer select-none transition-colors ${textColor}`}
            >
              {item}
            </p>
          );
        };

        return (
          <ItemList
            items={items}
            itemNodeBuilder={itemNodeBuilder}
            focusPreviousNode={focusPreviousNode}
            focusNextNode={focusNextNode}
          />
        );
      case "flash words":
      case "flash numbers":
        return <ItemFlasher items={items} onEnd={endPhase} />;
      default:
        return null;
    }
  };

  // [START] next phase modal shortcuts

  useKey({ code: "Enter", ctrlKey: true }, () =>
    setIsNextPhaseModalShown(true)
  );

  useKey(
    { code: "Enter" },
    () => {
      if (isNextPhaseModalShown) endPhase();
    },
    [isNextPhaseModalShown]
  );

  useKey(
    { code: "Escape" },
    () => {
      if (isNextPhaseModalShown) setIsNextPhaseModalShown(false);
    },
    [isNextPhaseModalShown]
  );

  // [END] modal shortcuts

  return (
    <>
      <GameHeader
        timer={
          ["classic words", "classic numbers"].includes(gameMode)
            ? timer
            : undefined
        }
        gamePhase="memorization phase"
        nextPhaseButton={
          <Button onClick={() => setIsNextPhaseModalShown(true)}>
            Start recall
          </Button>
        }
      />

      {renderBody()}

      <Modal isShown={isNextPhaseModalShown}>
        <Modal.Body>
          <p>Are you sure you want to start recall?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={endPhase}>
            Start recall
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsNextPhaseModalShown(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
