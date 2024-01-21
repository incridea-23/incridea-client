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
                fall: {
                    "0%": {
                        transform: "translateX(0) rotate(0deg)",
                        opacity: 1,
                    },
                    "80%": {
                        opacity: 1,
                    },
                    "100% ": {
                        transform: "translateX(85vh) rotate(360deg)",
                        opacity: 0,
                    },
                },
            },
            transitionTimingFunction: {
                // FIXME: give a better name
                "swap-card": "cubic-bezier(0.85, 0, 0.15, 1)",
            },
            colors: {
                primary: {
                    100: "#C9E2E5",
                    200: "#AED5D9",
                    300: "#93C8CD",
                    400: "#78BBC1",
                    500: "#5CA3AD",
                    600: "#4C868F",
                    700: "#3B6971",
                    800: "#2B4A53",
                    900: "#1A2D35",
                },
                secondary: {
                    100: "#F9FAFB",
                    200: "#F3F4F6",
                    300: "#E5E7EB",
                    400: "#D1D5DB",
                    500: "#9CA3AF",
                    600: "#6B7280",
                    700: "#4B5563",
                    800: "#374151",
                    900: "#1F2937",
                },
                accent: {
                    100: "#FEE2E2",
                    200: "#FECACA",
                    300: "#FCA5A5",
                    400: "#F87171",
                    500: "#EF4444",
                    600: "#DC2626",
                    700: "#B91C1C",
                    800: "#991B1B",
                    900: "#7F1D1D",
                },
            },
        },
    },
    plugins: [],
};
