/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in src
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's CSS reset to preserve our base styling
  },
  theme: {
    extend: {},
  },
  plugins: [],
} 