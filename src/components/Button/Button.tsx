type ButtonColors = "primary" | "secondary";
type ButtonVariants = "regular" | "outlined";

const getCustomStyles = (color: ButtonColors, variant: ButtonVariants) => {
  if (variant === "regular" && color === "primary") {
    return "hover:bg-slate-900";
  }

  if (variant === "regular" && color === "secondary") {
    return "text-primary-900 hover:bg-slate-200";
  }

  if (variant === "outlined" && color === "primary") {
    return "border-primary-900 text-primary-900 hover:bg-slate-200";
  }

  if (variant === "outlined" && color === "secondary") {
    return "border-white hover:bg-slate-900";
  }

  return "";
};

export interface ButtonProps {
  className?: string;
  color?: ButtonColors;
  variant?: ButtonVariants;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: String | JSX.Element;
}

export function Button({
  className = "",
  color = "secondary",
  variant = "regular",
  onClick,
  children,
}: ButtonProps) {
  const stylesBasedOnChildren =
    typeof children === "string" ? "px-4 py-2 rounded" : "p-2 rounded-full";

  const colorStyles = {
    primary: "bg-primary-900",
    secondary: "bg-white",
  };

  const variantStyles = {
    regular: "",
    outlined: "border bg-transparent",
  };

  return (
    <button
      type="button"
      className={`min-w-fit shadow-button shadow-slate-500 active:translate-y-1 active:shadow-none ${stylesBasedOnChildren} ${
        colorStyles[color]
      } ${variantStyles[variant]} ${getCustomStyles(
        color,
        variant
      )} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  color: "secondary",
  variant: "regular",
  onClick: null,
};
