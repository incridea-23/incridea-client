import { Montserrat, Trade_Winds } from "@next/font/google";

export const titleFont = Trade_Winds({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--trade-winds-font",
});

export const bodyFont = Montserrat({
  weight: ["300"],
  subsets: ["latin"],
});
