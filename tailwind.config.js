/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6b2d91",
        "primary-light": "#8b4dc4",
        "primary-dark": "#4a1f66",
        gold: "#ffbe0b",
        "gold-light": "#ffd54f",
        "gold-dim": "#e6a800",
        grape: "#8b4dc4",
        saffron: "#ffbe0b",
        mango: "#f5a623",
        magenta: "#9b59c6",
        rose: "#e84393",
        leaf: "#2fd6a6",
        line: "rgba(139, 77, 196, 0.18)",
        "line-strong": "rgba(255, 190, 11, 0.22)",
        ink: "#f5f0fa",
        "ink-dim": "#c4b8d4",
        "ink-faint": "#958aa8",
        base: "#0f0b14",
        surface: "#1a1326",
        "surface-2": "#271e38",
      },
      borderRadius: {
        "xl2": "1.5rem",
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop": "pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "shimmer": "shimmer 1.8s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(14px) scale(0.99)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "pop": {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "shimmer": {
          from: {
            "background-position": "-200% 0",
          },
          to: {
            "background-position": "200% 0",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },
}

