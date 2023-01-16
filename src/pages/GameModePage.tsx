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
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-stroke px-12">
          <img
            className="h-72"
            src={gameModeInfo[gameMode].imageSource}
            alt={gameMode}
          />
          <div className="flex flex-col items-center gap-8">
            <p className="text-3xl font-semibold">{capitalize(gameMode)}</p>
            <Button className="w-full">Start</Button>
          </div>
        </div>
      </MainPanel>
    </>
  );
}
