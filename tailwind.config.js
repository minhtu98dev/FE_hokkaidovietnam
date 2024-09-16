const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}", "Components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "3.125rem",
        "2xl": "7rem",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1E1E1E",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#777171",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "#00d664",
        },
        warning: {
          DEFAULT: "#ffca47",
        },
        error: {
          DEFAULT: "#f45757",
        },
        info: {
          DEFAULT: "#0270ad",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideFromLeft: {
          "0%": { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideFromRight: {
          "0%": { transform: "translateX(200%) rotate(18deg)" },
          "100%": { transform: "translateX(270px) rotate(18deg)" },
        },
        slideFromBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideFrom1: {
          "0%": { transform: "translate(-100vw, -100vh)" },
          "100%": { transform: "translate(-90px, 40px)" },
        },
        slideFrom11: {
          "0%": { transform: "translate(-100vw, -100vh)" },
          "100%": { transform: "translate(-43px, 30px)" },
        },
        slideFrom2: {
          "0%": { transform: "translate(100vw, -100vh)" },
          "100%": { transform: "translate(390px, 10px)" },
        },
        slideFrom21: {
          "0%": { transform: "translate(100vw, -100vh)" },
          "100%": { transform: "translate(210px, 5px)" },
        },
        slideFrom3: {
          "0%": { transform: "translate(-100vw, 100vh)" },
          "100%": { transform: "translate(-18px, 190px)" },
        },
        slideFrom31: {
          "0%": { transform: "translate(-100vw, 100vh)" },
          "100%": { transform: "translate(-5px, 100px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 2s ease-in-out forwards",
        "slide-from-top": "slideFromTop 1.5s ease forwards",
        "slide-from-bottom": "slideFromBottom 1.5s ease forwards",
        "slide-from-right": "slideFromRight 1s ease-out",
        "slide-from-1": "slideFrom1 1.5s ease forwards",
        "slide-from-11": "slideFrom11 1.5s ease forwards",
        "slide-from-2": "slideFrom2 1.5s ease forwards",
        "slide-from-21": "slideFrom21 1.5s ease forwards",
        "slide-from-3": "slideFrom3 1.5s ease forwards",
        "slide-from-31": "slideFrom31 1.5s ease forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".animate-delay-1000": {
            "animation-delay": "1s",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
