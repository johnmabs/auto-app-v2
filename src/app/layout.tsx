import { Viewport } from "next";
import { Toaster } from "sonner";
import { fontVariables } from "@/config/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fontVariables} light`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {children}

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-3)",
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              borderRadius: "10px",
            },
          }}
          richColors
        />
      </body>
    </html>
  );
}
