import { cn } from "@/lib/utils";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function FormTextarea({ label, error, ...props }: Props) {
  return (
    <div>
      <label className="block mb-1.5 text-xs uppercase tracking-widest">
        {label} <span className="text-(--accent)">*</span>
      </label>

      <textarea
        {...props}
        aria-invalid={!!error}
        className={cn(
          "w-full px-4 py-3 rounded-(--r) text-[0.88rem] text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors resize-none",
          "border border-(--border) bg-(--bg-3)",
          error ? "border-red-500" : "border-(--border)",
        )}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
