import { Link } from "react-router-dom";

import { MemrizeLogo } from "@/assets/svgs";
import { Button, Header, MainPanel } from "@/components";
import { GameMode, gameModeInfo } from "@/shared";
import { capitalize } from "@/utils";

export interface GameModePageProps {
  gameMode: GameMode;
}

export function GameModePage({ gameMode }: GameModePageProps) {
  return (
    <>
      <Header isFixed>
        <Header.Segment className="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl">Memrize</p>
        </Header.Segment>
      </Header>
      <MainPanel>
        <div className="flex min-h-screen max-w-[640px] flex-col items-center justify-center gap-8 bg-stroke px-12">
          <img
            className="min-h-[16rem] object-cover"
            src={gameModeInfo[gameMode].imageSource}
            alt={gameMode}
          />
          <div className="flex w-full flex-col items-center gap-8 sm:w-auto">
            <p className="text-center text-3xl font-semibold">
              {capitalize(gameMode)}
            </p>
            <Link to={`/game/${gameMode.replace(" ", "-")}`} className="w-full">
              <Button className="w-full">Start</Button>
            </Link>
          </div>
        </div>
      </MainPanel>
    </>
  );
}
