import { useState } from "react";

import { Button, GameHeader, ItemList, Modal } from "@/components";
import { useKey, useListNodeFocuser, useTimer } from "@/hooks";

export interface RecallScreenProps {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  onPhaseEnd: () => void;
}

export function RecallScreen({
  answers,
  setAnswers,
  onPhaseEnd: endPhase,
}: RecallScreenProps) {
  const { timer } = useTimer({
    seconds: 600,
    onFinish: endPhase,
  });

  const [isNextPhaseModalShown, setIsNextPhaseModalShown] = useState(false);

  const {
    setNodesRef,
    setFocusedNodeIndex,
    highestFocusedNodeIndex,
    focusPreviousNode,
    focusNextNode,
  } = useListNodeFocuser();

  const itemNodeBuilder = (item: string, itemIndex: number) => (
    <input
      onFocus={() => setFocusedNodeIndex(itemIndex)}
      className="w-full bg-transparent text-center outline-none focus:placeholder-transparent"
      type="text"
      value={item}
      placeholder={itemIndex <= highestFocusedNodeIndex ? "—" : ""}
      ref={(input) => setNodesRef(itemIndex, input!)}
      onChange={(event) => {
        const newItem: string = event.target.value;

        setAnswers((previousAnswers) =>
          previousAnswers.map((_item, _itemIndex) => {
            if (_itemIndex === itemIndex) {
              return newItem;
            }
            return _item;
          })
        );
      }}
    />
  );

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

  // [END] next phase modal shortcuts

  return (
    <>
      <GameHeader
        timer={timer}
        gamePhase="recall phase"
        nextPhaseButton={
          <Button onClick={() => setIsNextPhaseModalShown(true)}>Finish</Button>
        }
      />

      <ItemList
        items={answers}
        itemNodeBuilder={itemNodeBuilder}
        focusPreviousNode={focusPreviousNode}
        focusNextNode={focusNextNode}
      />

      <Modal isShown={isNextPhaseModalShown}>
        <Modal.Body>
          <p>Are you sure want to finish the game?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={endPhase}>
            Finish
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsNextPhaseModalShown(false)}
          >
            Not yet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
