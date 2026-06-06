"use client";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Rechercher une marque, un modèle ou un budget…",
}: SearchBarProps) {
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const query = (data.get("q") as string).trim();
    if (query) onSearch?.(query);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative flex items-center gap-3 rounded-2xl border px-5 py-4 border-black/15 bg-black/5 transition-all duration-300 focus-within:border-amber-400/50 focus-within:bg-black/10 focus-within:shadow-[0_0_0_4px_rgba(251,191,36,0.08)]"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-black/40"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        aria-label="Rechercher des véhicules"
        className="w-full bg-transparent text-sm text-(--text) placeholder-black/30 outline-none"
        name="q"
        placeholder={placeholder}
        type="search"
      />

      <button
        type="submit"
        aria-label="Lancer la recherche"
        className="shrink-0 rounded-xl bg-amber-400 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-900 transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95"
      >
        Rechercher
      </button>
    </form>
  );
}
