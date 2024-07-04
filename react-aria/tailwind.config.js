/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        torusPopOverOpen: "torusPopOverOpen 150ms ease-in",
        torusPopOverClose: "torusPopOverClose 150ms ease-in",
        torusButtonActive: "torusButtonActive 0.5s",
        buttonHoverAnimation: "buttonHoverAnimation 1s ease-in-out ",
      },
      keyframes: {
        torusPopOverOpen: {
          "0%": {
            opacity: "0",
          },
          "25%": {
            opacity: "0.25",
          },
          "50%": {
            opacity: "0.5",
          },
          "75%": {
            opacity: "0.75",
          },
          "100%": {
            opacity: "1",
          },
        },
        torusPopOverClose: {
          "0%": {
            opacity: "1",
          },
          "25%": {
            opacity: "0.75",
          },
          "50%": {
            opacity: "0.5",
          },
          "75%": {
            opacity: "0.25",
          },
          "100%": {
            opacity: "0",
          },
        },
        torusButtonActive: {
          "from, to": { transform: "scale(1, 1)" },
          "25% ": { transform: "scale(0.9, 1.1)" },
          "50%": { transform: "scale(1.1, 0.9)" },
          "75%": { transform: "scale(0.95, 1.05)" },
        },
        buttonHoverAnimation: {
          "0%, 10%, 20%, 30%, 40%, 60%, 70%, 80%, 90%, 100%": {
            transform: "scale(1)",
          },
          "50%": { transform: "scaleY(0)" },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "pressed","active"],
    },
  },
  plugins: [require("tailwindcss-react-aria-components")({ prefix: "torus" })],
};
