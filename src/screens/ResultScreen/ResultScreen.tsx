import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Button, Header, MainPanel } from "@/components";
import { useKey, useScoreAnimation } from "@/hooks";
import { GameMode } from "@/shared";
import { capitalize } from "@/utils";

export interface ResultScreenProps {
  items: string[];
  answers: string[];
  gameMode: GameMode;
  restartGame: () => void;
}

export function ResultScreen({
  items,
  answers,
  gameMode,
  restartGame,
}: ResultScreenProps) {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const [isScoreAnimating, setIsScoreAnimating] = useState(true);

  const score = answers.reduce(
    (acc: number, answer, answerIndex) =>
      answer === items[answerIndex] ? acc + 1 : acc,
    0
  );

  const { counter: animatedScore } = useScoreAnimation({
    score,
    onFinish: () => {
      setTimeout(() => setIsScoreAnimating(false), 1000);
    },
  });

  const lastNonEmptyAnswerIndex = answers.reduce(
    (value: number, answer, answerIndex) =>
      answer !== "" ? answerIndex : value,
    0
  );
  const nonEmptyAnswers = answers.slice(0, lastNonEmptyAnswerIndex + 1);

  const fadeInClass = `transition-[opacity,transform] duration-500 ${
    isScoreAnimating ? "opacity-0 scale-90 pointer-events-none" : ""
  }`;

  useKey({ code: "Enter", ctrlKey: true }, () => restartGame());

  return (
    <>
      <Header isFixed>
        <Header.Segment>
          <Link to="/">
            <Button variant="outlined">
              <HomeIcon className="h-6 w-6" />
            </Button>
          </Link>
        </Header.Segment>
      </Header>
      <MainPanel>
        <div className="flex h-full min-h-screen w-[28rem] max-w-full flex-col items-center gap-8 bg-stroke px-12 pt-24 pb-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-2xl font-semibold">
              {capitalize(gameMode)}
            </p>
            <div className="flex items-end gap-2 font-semibold">
              <p className="text-8xl">{animatedScore}</p>
              <p className="text-3xl">/ {nonEmptyAnswers.length}</p>
            </div>
            <p className="text-center text-xl">correct answers!</p>
          </div>
          <div className={`flex w-full flex-col gap-4 ${fadeInClass}`}>
            <Button onClick={restartGame}>Play again</Button>
          </div>
          <div
            className={`flex w-full flex-col items-center gap-4 ${fadeInClass}`}
          >
            <hr className="my-4 w-full border-slate-700" />
            <p className="mb-4 text-xl font-semibold">Your answers:</p>
            {nonEmptyAnswers.map((answer, answerIndex) => (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                  {answer === items[answerIndex] ? (
                    <CheckIcon className="h-6 w-6 fill-green-500" />
                  ) : (
                    <XMarkIcon className="h-6 w-6 fill-red-500" />
                  )}
                  {answer !== "" ? (
                    <p className="text-xl">{answer}</p>
                  ) : (
                    <p className="text-xl text-slate-400">—</p>
                  )}
                  <div className="h-6 w-6" />
                </div>
                {answer !== items[answerIndex] && (
                  <div className="flex gap-1 text-slate-400">
                    <p className="text-center">correct answer:</p>
                    <p className="text-center font-semibold">
                      {items[answerIndex]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </MainPanel>
    </>
  );
}
