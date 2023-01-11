import {
  classicNumbersImageSrc,
  classicWordsImageSrc,
  flashNumbersImageSrc,
  flashWordsImageSrc,
} from "@/assets/images";

export const gameModes = [
  "classic words",
  "flash words",
  "classic numbers",
  "flash numbers",
] as const;

export type GameMode = typeof gameModes[number];

export type GameModesInfo = {
  [gameMode in GameMode]: { imageSource: string };
};

export const gameModeInfo: GameModesInfo = {
  "classic words": { imageSource: classicWordsImageSrc },
  "flash words": { imageSource: flashWordsImageSrc },
  "classic numbers": { imageSource: classicNumbersImageSrc },
  "flash numbers": { imageSource: flashNumbersImageSrc },
};
