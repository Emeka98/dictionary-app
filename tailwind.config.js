/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "bg-navy": "#394160",
      "bg-dark": "#1e293b",
      "bg-milk": "#e2e2e2",
      "light-brown": "#8d4f21",
      "dark-milk": "#9b9c9a",
      "dark-teal": "#747494",
      "light-teal": "#3a7d85",
      "btn-brown": "#8b4a49",
      "light-navy": "#94a4ac",
      "light-pink": "#e2c9c2",
      "light-slate": "#8ca4bc",
    },
  },
  plugins: [],
};
