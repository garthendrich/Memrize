import { Link } from "react-router-dom";

import { MemrizeLogo } from "@/assets/svgs";
import { GameModeItem, Header, MainPanel } from "@/components";
import { gameModeInfo, gameModes } from "@/shared";
import { capitalize } from "@/utils/capitalize";

export function HomePage() {
  return (
    <>
      <Header>
        <Header.Segment className="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl text-white">Memrize</p>
        </Header.Segment>
      </Header>
      <MainPanel className="mt-4 mb-8">
        <p className="mb-8 text-xl font-semibold text-white">
          Choose a game mode
        </p>
        <div className="grid max-w-screen-lg grid-cols-2 gap-8">
          {gameModes.map((gameMode) => (
            <Link to={gameMode.replace(" ", "-")}>
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
