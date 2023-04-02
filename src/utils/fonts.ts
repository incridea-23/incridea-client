import { Poppins, Trade_Winds } from "@next/font/google";

export const titleFont = Trade_Winds({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--trade-winds-font",
});

export const bodyFont = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});
