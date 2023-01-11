export interface MainPanelProps {
  children: JSX.Element | JSX.Element[];
}

export function MainPanel({ children }: MainPanelProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-12">{children}</div>
  );
}
