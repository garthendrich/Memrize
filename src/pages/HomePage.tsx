import {
  classicNumbersImageSrc,
  classicWordsImageSrc,
  flashNumbersImageSrc,
  flashWordsImageSrc,
} from "@/assets/images";
import { MemrizeLogo } from "@/assets/svgs";
import { GameModeItem, Header, MainPanel } from "@/components";

export function HomePage() {
  return (
    <>
      <Header>
        <Header.Segment justify="justify-center">
          <MemrizeLogo className="mr-4 h-8 w-8" />
          <p className="text-2xl text-white">Memrize</p>
        </Header.Segment>
      </Header>
      <MainPanel className="mt-4 mb-8">
        <p className="mb-8 text-xl font-semibold text-white">
          Choose a game mode
        </p>
        <div className="grid max-w-screen-lg grid-cols-2 gap-8">
          <GameModeItem label="Classic words" imageSrc={classicWordsImageSrc} />
          <GameModeItem label="Flash words" imageSrc={flashWordsImageSrc} />
          <GameModeItem
            label="Classic numbers"
            imageSrc={classicNumbersImageSrc}
          />
          <GameModeItem label="Flash numbers" imageSrc={flashNumbersImageSrc} />
        </div>
      </MainPanel>
    </>
  );
}
