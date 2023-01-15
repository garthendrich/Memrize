export interface HeaderProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  isFixed?: boolean;
}

function Header({ children, className = "", isFixed }: HeaderProps) {
  return (
    <div
      className={`${
        isFixed ? "fixed top-0 left-0" : ""
      } flex h-20 w-full px-8 ${className}`}
    >
      {children}
    </div>
  );
}

interface HeaderSegmentProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}

function HeaderSegment({ children, className = "" }: HeaderSegmentProps) {
  return (
    <div className={`flex flex-1 items-center ${className}`}>{children}</div>
  );
}

Header.defaultProps = {
  isFixed: false,
  className: "",
};

HeaderSegment.defaultProps = {
  children: null,
  className: "",
};

Header.Segment = HeaderSegment;

export { Header };
