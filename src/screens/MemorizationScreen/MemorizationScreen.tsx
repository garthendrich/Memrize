import { useState } from "react";

import {
  Button,
  GameHeader,
  ItemFlasher,
  ItemListWrapper,
  Modal,
} from "@/components";
import { useKey, useTimer } from "@/hooks";
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
    seconds: 60,
    onFinish: ["classic words", "classic numbers"].includes(gameMode)
      ? endPhase
      : undefined,
  });

  const [isNextPhaseModalShown, setIsNextPhaseModalShown] = useState(false);

  const renderBody = () => {
    switch (gameMode) {
      case "classic words":
      case "classic numbers":
        return (
          <ItemListWrapper>
            {items.map((item) => (
              <p>{item}</p>
            ))}
          </ItemListWrapper>
        );
      case "flash words":
      case "flash numbers":
        return <ItemFlasher items={items} onEnd={endPhase} />;
      default:
        return null;
    }
  };

  // [START] recall phase modal shortcuts

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

  // [END] recall phase modal shortcuts

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
