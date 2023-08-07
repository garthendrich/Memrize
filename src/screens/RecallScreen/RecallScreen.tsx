import { useEffect, useRef, useState } from "react";

import { Button, GameHeader, ItemList, Modal } from "@/components";
import { useKey, useTimer } from "@/hooks";

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
    seconds: 300,
    onFinish: endPhase,
  });

  const [isNextPhaseModalShown, setIsNextPhaseModalShown] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const itemNodeBuilder = (item: string, itemIndex: number) => (
    <input
      ref={itemIndex === 0 ? firstInputRef : null}
      className="w-full bg-transparent text-center outline-none"
      type="text"
      value={item}
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

  useEffect(() => firstInputRef.current!.focus(), []);

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

      <ItemList items={answers} itemNodeBuilder={itemNodeBuilder} />

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
