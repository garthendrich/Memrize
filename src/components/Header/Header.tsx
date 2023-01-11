export interface HeaderProps {
  children: JSX.Element | JSX.Element[];
  isFixed?: boolean;
}

function Header({ children, isFixed }: HeaderProps) {
  return (
    <div className={`${isFixed && "fixed top-0 left-0"} flex h-20 w-full px-8`}>
      {children}
    </div>
  );
}

interface HeaderSegmentProps {
  children?: JSX.Element | JSX.Element[];
  justify?: "justify-start" | "justify-center" | "justify-end";
}

function HeaderSegment({
  children,
  justify = "justify-start",
}: HeaderSegmentProps) {
  return (
    <div className={`flex flex-1 items-center ${justify}`}>{children}</div>
  );
}

Header.defaultProps = {
  isFixed: false,
};

HeaderSegment.defaultProps = {
  justify: "justify-start",
  children: null,
};

Header.Segment = HeaderSegment;

export { Header };
