export interface MainPanelProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export function MainPanel({ className = "", children }: MainPanelProps) {
  return (
    <div className={`${className} flex flex-col items-center`}>{children}</div>
  );
}

MainPanel.defaultProps = {
  className: "",
};
