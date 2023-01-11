import {
  classicNumbersImageSrc,
  classicWordsImageSrc,
  flashNumbersImageSrc,
  flashWordsImageSrc,
} from "@/assets/images";
import { MemrizeLogo } from "@/assets/svgs";
import { Button, Header, MainPanel } from "@/components";
import { GameMode } from "@/types";
import { capitalize } from "@/utils/capitalize";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export interface GameModePageProps {
  gameMode: GameMode;
}

const gameModePhoto: {
  [gameMode in GameMode]: string;
} = {
  "classic words": classicWordsImageSrc,
  "flash words": flashWordsImageSrc,
  "classic numbers": classicNumbersImageSrc,
  "flash numbers": flashNumbersImageSrc,
};

export function GameModePage({ gameMode }: GameModePageProps) {
  return (
    <>
      <Header isFixed>
        <Header.Segment justify="justify-start">
          <Link to="/">
            <Button variant="secondary">
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
          </Link>
        </Header.Segment>
        <Header.Segment justify="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl text-white">Memrize</p>
        </Header.Segment>
        <Header.Segment />
      </Header>
      <MainPanel>
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-stroke px-12">
          <img className="h-72" src={gameModePhoto[gameMode]} alt={gameMode} />
          <p className="text-3xl font-semibold text-white">
            {capitalize(gameMode)}
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button className="w-48">Start</Button>
            <p className="cursor-pointer text-white">Change settings</p>
          </div>
        </div>
      </MainPanel>
    </>
  );
}
