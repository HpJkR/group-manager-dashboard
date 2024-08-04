/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#121212',
        'bg-light': '#ffffff',
        'text-dark': '#ffffff',
        'text-light': '#000000',
      },
    },
  },
  plugins: [],
};

export default config;
