import { useState } from "react";

import { Button, GameHeader, ItemList, Modal } from "@/components";
import { useListNodeFocuser, useTimer } from "@/hooks";
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

  const { setNodesRef } = useListNodeFocuser();

  const itemNodeBuilder = (item: Item, nodeIndex: number) => (
    <p key={item} ref={(p) => setNodesRef(nodeIndex, p!)}>
      {item}
    </p>
  );

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

      <ItemList items={items} itemNodeBuilder={itemNodeBuilder} />

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
