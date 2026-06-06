import LoginForm from "@/features/auth/components/login-form";

type PageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const callbackUrl = params.callbackUrl?.startsWith("/")
    ? params.callbackUrl
    : "/admin";

  return (
    <main className="min-h-screen bg-(--bg) flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-display text-[1.6rem] tracking-[0.08em] text-(--gold)">
              AUTO
              <span className="text-(--text)">STORE</span>
            </span>
          </div>

          <p className="text-[0.82rem] text-(--muted)">
            Administration — Connexion requise
          </p>
        </div>

        <div className="bg-(--bg-2) border border-(--border-2) rounded-(--r-xl) p-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <h1 className="font-display text-[1.8rem] tracking-[0.04em] mb-1">
            CONNEXION
          </h1>

          <p className="text-[0.8rem] text-(--muted) mb-6">
            Accédez au tableau de bord
          </p>

          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </main>
  );
}
