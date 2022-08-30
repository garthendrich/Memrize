export interface NumberInputProps {
  value: number;
  setValue(value: number): void;
  min?: number;
  max?: number;
}

export function NumberInput({ value, setValue, min, max }: NumberInputProps) {
  return (
    <input
      className="rounded border border-slate-400 bg-slate-100 px-3 py-2 text-stroke placeholder:text-slate-400 focus:border-primary-900"
      type="number"
      value={String(value)}
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      onChange={(event) => setValue(Number(event.target.value))}
      min={min}
      max={max}
    />
  );
}

NumberInput.defaultProps = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
};
