import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/Button";
import { MainPanel } from "@/components/MainPanel";

export interface ItemListProps {
  items: string[];
  itemNodeBuilder: (item: string, itemIndex: number) => JSX.Element;
  focusPreviousNode: () => void;
  focusNextNode: () => void;
}

export function ItemList({
  items,
  itemNodeBuilder,
  focusPreviousNode,
  focusNextNode,
}: ItemListProps) {
  const isTouchEnabled =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return (
    <>
      <MainPanel>
        <div className="h-[50vh]" />
        <div className="flex w-full flex-col items-center gap-8 text-2xl">
          {items.map((item, itemIndex) => itemNodeBuilder(item, itemIndex))}
        </div>
        <div className="fixed top-0 left-0 -z-10 flex h-full w-full items-center justify-center ">
          <div className="h-16 w-full bg-stroke" />
        </div>
        <div className="h-[50vh]" />
        <div className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary-900 to-transparent" />
      </MainPanel>

      {isTouchEnabled && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          <Button onClick={focusPreviousNode} className="p-4">
            <ArrowUpIcon className="h-8 w-8" />
          </Button>
          <Button onClick={focusNextNode} className="p-4">
            <ArrowDownIcon className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  );
}
