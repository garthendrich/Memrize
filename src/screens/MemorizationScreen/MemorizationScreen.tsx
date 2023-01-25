import { useState } from "react";

import { Button, GameHeader, Modal } from "@/components";
import { useTimer } from "@/hooks";
import { Item } from "@/shared";

export interface MemorizationScreenProps {
  items: Item[];
  onPhaseEnd: () => void;
}

export function MemorizationScreen({
  items,
  onPhaseEnd: endPhase,
}: MemorizationScreenProps) {
  const { timer } = useTimer({
    seconds: 300,
    onFinish: endPhase,
    willAutoStart: true,
  });

  const [isRecallModalShown, setIsRecallModalShown] = useState(false);

  console.log(items);

  return (
    <>
      <GameHeader
        timer={timer}
        gamePhase="memorization phase"
        nextPhaseButton={
          <Button onClick={() => setIsRecallModalShown(true)}>
            Start recall
          </Button>
        }
      />

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
