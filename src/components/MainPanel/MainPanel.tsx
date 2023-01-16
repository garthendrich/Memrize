export interface MainPanelProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export function MainPanel({ className = "", children }: MainPanelProps) {
  return (
    <div className={`${className} flex flex-col items-center text-white`}>
      {children}
    </div>
  );
}

MainPanel.defaultProps = {
  className: "",
};
