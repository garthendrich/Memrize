import { MainPanel } from "@/components/MainPanel";

export interface ItemListWrapperProps {
  children: JSX.Element[];
}

export function ItemListWrapper({ children }: ItemListWrapperProps) {
  return (
    <MainPanel>
      <div className="h-[50vh]" />
      <div className="flex w-full flex-col items-center gap-8 text-2xl">
        {children}
      </div>
      <div className="h-[50vh]" />

      <div className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary-900 to-transparent" />
    </MainPanel>
  );
}
