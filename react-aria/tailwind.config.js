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
        buttonHoverAnimation: "buttonHoverAnimation 0.5s ease-in-out ",
        dropdownOpen: "dropdownOpen 0.5s ease-in-out",
        dropdownClose: "dropdownClose 0.5s ease-in-out",
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
        dropdownOpen: {
          "from, to" :{
            opacity: "0",
            transform: "translateY(-100%)"},
            "75%": { transform: "translateY(0)" },
            "100%": { opacity: "1" },
        },
        dropdodropdownClose: {
          "from": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "to": {
            opacity: "0",
            transform: "translateY(-100%)",
          },
        },

        cardHoverAnimation: {
          "0%, 10%, 20%, 30%, 40%, 60%, 70%, 80%, 90%, 100%": {
            transform: "scale(1)",
          },
          "50%": { transform: "scaleY(0)" },
        },
        buttonHoverAnimation: {
          "0%,50%": { transform: "scale(1)", border: "none" },
          "100%": {
            transform: "scale(0.98)",
            transition: "transform 0.5s ease-in-out",
          },
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        plexsans: ["IBM Plex Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      scrollbar: {
        none: "none",
      },
    },
  },
  variants: {
    extend: {
      animation: ["torus-hover"],
      borderWidth: ["torus-hover"],
      borderColor: ["torus-hover"],
      transform: ["torus-hover"],
    },
    extends: {},
  },
  plugins: [require("tailwindcss-react-aria-components")({ prefix: "torus" })],
};
