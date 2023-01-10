export interface HeaderProps {
  children: JSX.Element | JSX.Element[];
}

function Header({ children }: HeaderProps) {
  return <div className="flex h-20 w-full">{children}</div>;
}

interface HeaderSegmentProps {
  children: JSX.Element | JSX.Element[];
  placement: "left" | "center" | "right";
}

function HeaderSegment({ children, placement }: HeaderSegmentProps) {
  const placementStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex flex-1 items-center ${placementStyles[placement]}`}>
      {children}
    </div>
  );
}

Header.Segment = HeaderSegment;

export { Header };
