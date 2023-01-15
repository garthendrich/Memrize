import { MemrizeLogo } from "@/assets/svgs";
import { Button, Header, MainPanel } from "@/components";
import { GameMode, gameModeInfo } from "@/shared";
import { capitalize } from "@/utils/capitalize";

export interface GameModePageProps {
  gameMode: GameMode;
}

export function GameModePage({ gameMode }: GameModePageProps) {
  return (
    <>
      <Header isFixed>
        <Header.Segment className="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl text-white">Memrize</p>
        </Header.Segment>
      </Header>
      <MainPanel>
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-stroke px-12">
          <img
            className="h-72"
            src={gameModeInfo[gameMode].imageSource}
            alt={gameMode}
          />
          <p className="text-3xl font-semibold text-white">
            {capitalize(gameMode)}
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button className="w-48">Start</Button>
            <p className="cursor-pointer select-none text-white">
              Change settings
            </p>
          </div>
        </div>
      </MainPanel>
    </>
  );
}
