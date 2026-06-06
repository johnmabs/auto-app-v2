// config/fonts.ts

import {
  Bebas_Neue,
  DM_Mono,
  DM_Sans,
  Playfair_Display,
} from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const fontVariables = [
  dmSans.variable,
  dmMono.variable,
  bebasNeue.variable,
  playfairDisplay.variable,
].join(" ");
