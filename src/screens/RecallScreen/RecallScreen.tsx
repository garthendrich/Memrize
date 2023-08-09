import { useEffect, useRef, useState } from "react";

import { Button, GameHeader, ItemListWrapper, Modal } from "@/components";
import { useKey, useTimer } from "@/hooks";

export interface RecallScreenProps {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  onPhaseEnd: () => void;
}

const centerInput = (event: React.SyntheticEvent) => {
  const input = event.target as HTMLInputElement;

  const inputMiddlePos = input.offsetTop + input.clientHeight / 2;
  const screenMiddlePos = window.innerHeight / 2;
  window.scroll({
    top: inputMiddlePos - screenMiddlePos,
    behavior: "smooth",
  });
};

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

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => inputRefs.current![0].focus(), []);

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

      <ItemListWrapper>
        {answers.map((answer, answerIndex) => (
          <input
            ref={(input) => {
              inputRefs.current[answerIndex] = input!;
            }}
            className="w-full bg-transparent text-center outline-none focus:placeholder-transparent"
            type="text"
            placeholder="—"
            value={answer}
            onChange={(event) => {
              setAnswers((previousAnswers) =>
                previousAnswers.map((_item, _itemIndex) =>
                  _itemIndex === answerIndex ? event.target.value : _item
                )
              );
            }}
            onKeyDown={(event) => {
              if (event.code !== "Enter") return;

              let inputToFocus: HTMLInputElement | null = null;

              if (event.shiftKey && answerIndex > 0) {
                inputToFocus = inputRefs.current![answerIndex - 1];
              } else if (!event.shiftKey && answerIndex < answers.length - 1) {
                inputToFocus = inputRefs.current![answerIndex + 1];
              }

              if (inputToFocus) {
                inputToFocus.select();
              }
            }}
            onFocus={centerInput}
            onClick={centerInput}
          />
        ))}
      </ItemListWrapper>

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
