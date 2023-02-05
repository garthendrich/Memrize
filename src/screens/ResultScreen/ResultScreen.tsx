import { Link } from "react-router-dom";
import { CheckIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Button, Header, MainPanel } from "@/components";
import { GameMode } from "@/shared";
import { capitalize } from "@/utils";
import { useEffect } from "react";

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

  const score = answers.reduce(
    (acc: number, answer, answerIndex) =>
      answer === items[answerIndex] ? acc + 1 : acc,
    0
  );

  const lastNonEmptyAnswerIndex = answers.reduce(
    (value: number, answer, answerIndex) =>
      answer !== "" ? answerIndex : value,
    0
  );
  const nonEmptyAnswers = answers.slice(0, lastNonEmptyAnswerIndex + 1);

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
        <div className="flex min-h-screen min-w-[28rem] flex-col items-center gap-8 bg-stroke px-16 pt-24 pb-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-semibold">{capitalize(gameMode)}</p>
            <div className="flex items-end gap-2 font-semibold">
              <p className="text-8xl">{score}</p>
              <p className="text-3xl">/ {nonEmptyAnswers.length}</p>
            </div>
            <p className="text-xl">correct answers!</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button onClick={restartGame}>Play again</Button>
          </div>
          <div className="flex w-full flex-col items-center gap-4">
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
                  <p className="text-xl">{answer}</p>
                  <div className="h-6 w-6" />
                </div>
                {answer !== items[answerIndex] && (
                  <div className="flex gap-1 text-slate-400">
                    <p>correct answer:</p>
                    <p className="font-semibold">{items[answerIndex]}</p>
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