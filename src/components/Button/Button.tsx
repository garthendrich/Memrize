export interface ButtonProps {
  variant?: "primary" | "secondary";
  children: String;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  const buttonTypeStyles = {
    primary: " bg-white text-stroke hover:bg-slate-200",
    secondary: " border border-white text-white hover:bg-slate-900",
  };

  return (
    <button
      type="button"
      className={`rounded px-4 py-2 shadow-button active:translate-y-1 active:shadow-none ${buttonTypeStyles[variant]}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
};
