/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    spacing: {
      0: "0",
      "2xsm": "2px",
      xsm: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px",
      "4xl": "80px",
      "5xl": "96px",
      sideBar: "200px",
    },
    fontSize: {
      xsm: "11px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "21px",
      "2xl": "28px",
      titleSm: "24px",
      titleMd: "32px",
      titleLg: "48px",
      headerTitle: "30px",
      titleXl: "64px",
			buttons: "18px"
    },
    extend: {
      margin: {
        sidebar: "280px",
      },

      colors: {
        logInBackground: "#FFFFEF",
        dashboard: "#F2F4F4",
        blueLetter: "#0D5AFF",
      },
    },
  },
  plugins: [],
};
