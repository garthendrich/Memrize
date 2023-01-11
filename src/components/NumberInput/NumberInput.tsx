const limitToRange = (number: number, min: number, max: number) =>
  Math.max(min, Math.min(max, number));

export interface NumberInputProps {
  className?: string;
  value: number;
  setValue(value: number): void;
  min?: number;
  max?: number;
}

export function NumberInput({
  className = "",
  value,
  setValue,
  min = -Infinity,
  max = Infinity,
}: NumberInputProps) {
  return (
    <input
      className={`rounded border border-slate-400 bg-slate-100 px-3 py-2 text-stroke placeholder:text-slate-400 focus:border-primary-900 ${className}`}
      type="number"
      value={String(value)}
      onKeyDown={(event) => {
        if (".e".includes(event.key)) {
          event.preventDefault();
        }
      }}
      onChange={(event) =>
        setValue(limitToRange(Number(event.target.value), min, max))
      }
      min={min}
      max={max}
    />
  );
}

NumberInput.defaultProps = {
  className: "",
  min: -Infinity,
  max: Infinity,
};
