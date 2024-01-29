/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        scroll: "scroll 60s linear infinite",
        "scroll-reverse": "scroll-reverse 60s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 10))" },
        },
        "scroll-reverse": {
          "0%": { transform: "translateX(calc(-250px * 10))" },
          "100%": { transform: "translateX(0)" },
        },
      },
      colors: {
        primary: {
          50: "#8285CF",
          100: "#7377C9",
          200: "#595EC0",
          300: "#4248AD",
          400: "#383D94",
          500: "#2D3176",
          600: "#222559",
          700: "#181A3F",
          800: "#0D0E22",
          900: "#0A0B1A",
          950: "#080916",
        },
        secondary: {
          50: "#F0A189",
          100: "#EE9377",
          200: "#E9724F",
          300: "#E4562B",
          400: "#D5461B",
          500: "#B53C17",
          600: "#9A3314",
          700: "#7A2810",
          800: "#5F1F0C",
          900: "#3F1508",
          950: "#321006",
        },
        accent: {
          50: "#E199B5",
          100: "#DD8DAD",
          200: "#D57199",
          300: "#CC5283",
          400: "#C1396F",
          500: "#A6315F",
          600: "#8A2950",
          700: "#6D203F",
          800: "#531830",
          900: "#3B1122",
          950: "#2B0D19",
        },
      },
    },
  },
  plugins: [],
};
