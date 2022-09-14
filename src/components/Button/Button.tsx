export interface ButtonProps {
  variant?: "primary" | "secondary";
  children: String | JSX.Element;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  const stylesBasedOnChildren =
    typeof children === "string" ? "px-4 py-2 rounded" : "p-2 rounded-full";

  const buttonVariantStyles = {
    primary: "bg-white text-stroke hover:bg-slate-200",
    secondary: "border border-white text-white hover:bg-slate-900",
  };

  return (
    <button
      type="button"
      className={`shadow-button active:translate-y-1 active:shadow-none ${stylesBasedOnChildren} ${buttonVariantStyles[variant]}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
};
