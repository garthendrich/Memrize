import { Link } from "react-router-dom";

import { MemrizeLogo } from "@/assets/svgs";
import { GameModeItem, Header, MainPanel } from "@/components";
import { gameModeInfo, gameModes } from "@/shared";
import { capitalize } from "@/utils";

export function HomePage() {
  return (
    <>
      <Header>
        <Header.Segment className="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl">Memrize</p>
        </Header.Segment>
      </Header>
      <MainPanel className="mt-4 mb-24">
        <p className="mb-8 text-xl font-semibold">Choose a game mode</p>
        <div className="grid max-w-screen-lg gap-8 px-8 sm:grid-cols-2">
          {gameModes.map((gameMode) => (
            <Link to={gameMode.replace(" ", "-")} key={gameMode}>
              <GameModeItem
                label={capitalize(gameMode)}
                imageSrc={gameModeInfo[gameMode].imageSource}
              />
            </Link>
          ))}
        </div>
      </MainPanel>
    </>
  );
}
