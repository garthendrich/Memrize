import { MainPanel } from "@/components/MainPanel";

export interface ItemListProps {
  items: string[];
  itemNodeBuilder: (item: string, itemIndex: number) => JSX.Element;
}

export function ItemList({ items, itemNodeBuilder }: ItemListProps) {
  return (
    <MainPanel>
      <div className="h-[50vh]" />
      <div className="flex w-full flex-col items-center gap-8 text-2xl">
        {items.map((item, itemIndex) => itemNodeBuilder(item, itemIndex))}
      </div>
      <div className="h-[50vh]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary-900 to-transparent" />
    </MainPanel>
  );
}
