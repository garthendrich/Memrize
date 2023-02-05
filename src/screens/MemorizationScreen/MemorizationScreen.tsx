import { useState } from "react";

import { Button, GameHeader, ItemFlasher, ItemList, Modal } from "@/components";
import { useListNodeFocuser, useTimer } from "@/hooks";
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

  const [isRecallModalShown, setIsRecallModalShown] = useState(false);

  const renderBody = () => {
    switch (gameMode) {
      case "classic words":
      case "classic numbers":
        // eslint-disable-next-line no-case-declarations
        const { setNodesRef } = useListNodeFocuser();

        // eslint-disable-next-line no-case-declarations
        const itemNodeBuilder = (item: string, nodeIndex: number) => (
          <p ref={(p) => setNodesRef(nodeIndex, p!)}>{item}</p>
        );

        return <ItemList items={items} itemNodeBuilder={itemNodeBuilder} />;
      case "flash words":
      case "flash numbers":
        return <ItemFlasher items={items} onEnd={endPhase} />;
      default:
        return null;
    }
  };

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
          <Button onClick={() => setIsRecallModalShown(true)}>
            Start recall
          </Button>
        }
      />

      {renderBody()}

      <Modal isShown={isRecallModalShown}>
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
            onClick={() => setIsRecallModalShown(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
