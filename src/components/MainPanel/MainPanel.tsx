export interface MainPanelProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export function MainPanel({ className = "", children }: MainPanelProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>{children}</div>
  );
}

MainPanel.defaultProps = {
  className: "",
};
