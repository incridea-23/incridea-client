import { Trade_Winds, Outfit } from "@next/font/google";

export const titleFont = Trade_Winds({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--trade-winds-font",
});

export const bodyFont = Outfit({
  weight: ["300"],
  subsets: ["latin"],
});
