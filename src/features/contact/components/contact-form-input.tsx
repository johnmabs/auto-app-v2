import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FormInput({ label, error, required, ...props }: Props) {
  return (
    <div>
      <label className="block mb-1.5 text-xs uppercase tracking-widest">
        {label}
      </label>

      <input
        {...props}
        required={required}
        aria-invalid={!!error}
        className={cn(
          "w-full px-4 py-3 rounded-(--r)",
          "border bg-(--bg-3)",
          error ? "border-red-500" : "border-(--border)",
        )}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
