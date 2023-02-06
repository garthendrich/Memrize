import randomWords from "random-words";

import { GameMode } from "@/shared";

const itemLength = 100;

const randomNumberStrings = () => {
  const numbers = Array.from({ length: itemLength }, () =>
    Math.floor(Math.random() * 100)
  );

  return numbers.map((number) => number.toString().padStart(2, "0"));
};

const hasConsecutiveDuplicates = (items: string[]) =>
  items.some((item, itemIndex) => item === items[itemIndex + 1]);

export const generateItems = (gameMode: GameMode) => {
  // can be optimized by replacing duplicates instead of re-generating whole array

  let items: string[] = [];

  do {
    switch (gameMode) {
      case "classic words":
      case "flash words":
        items = randomWords({ exactly: itemLength });
        break;
      case "classic numbers":
      case "flash numbers":
        items = randomNumberStrings();
        break;
      default:
    }
  } while (hasConsecutiveDuplicates(items));

  return items;
};
