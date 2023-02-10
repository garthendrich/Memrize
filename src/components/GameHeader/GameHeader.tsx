import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { GamePhase } from "@/shared";
import { capitalize, displayTimer } from "@/utils";

export interface GameHeaderProps {
  timer?: number;
  gamePhase: GamePhase;
  nextPhaseButton: JSX.Element;
}

export function GameHeader({
  timer,
  gamePhase,
  nextPhaseButton,
}: GameHeaderProps) {
  const [isLeaveModalShown, setIsLeaveModalShown] = useState(false);

  return (
    <>
      <Header isFixed className="bg-stroke shadow-lg">
        <Header.Segment>
          <Button variant="outlined" onClick={() => setIsLeaveModalShown(true)}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </Button>
          <p className="ml-4 hidden text-lg font-semibold sm:block">
            {capitalize(gamePhase)}
          </p>
        </Header.Segment>
        <Header.Segment className="justify-end gap-4">
          <p className="text-xl font-semibold">
            {timer && displayTimer(timer)}
          </p>
          {nextPhaseButton}
        </Header.Segment>
        <div className="absolute bottom-0 left-0">
          <div className="pointer-events-none absolute top-0 left-0 h-24 w-screen bg-gradient-to-b from-primary-900 to-transparent" />
        </div>
      </Header>

      <Modal isShown={isLeaveModalShown}>
        <Modal.Body>
          <p>Are you sure you want to leave game?</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button
              className="bg-red-600 shadow-red-900 hover:bg-red-700"
              color="primary"
            >
              Leave
            </Button>
          </Link>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsLeaveModalShown(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

GameHeader.defaultProps = {
  timer: undefined,
};
