import { MainPanel } from "@/components/MainPanel";
import { Item } from "@/shared";

export interface ItemListProps {
  items: Item[];
  itemNodeBuilder: (item: Item) => JSX.Element;
}

export function ItemList({ items, itemNodeBuilder }: ItemListProps) {
  return (
    <MainPanel>
      <div className="h-[50vh]" />
      <div className="flex w-full flex-col items-center gap-8 text-2xl">
        {items.map((item) => itemNodeBuilder(item))}
      </div>
      <div className="fixed top-0 left-0 -z-10 flex h-full w-full items-center justify-center ">
        <div className="h-16 w-full bg-stroke" />
      </div>
      <div className="h-[50vh]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary-900 to-transparent" />
    </MainPanel>
  );
}
