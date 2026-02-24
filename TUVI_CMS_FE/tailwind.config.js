/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'border-green-500',
    'text-green-700',
    'border-yellow-500',
    'text-yellow-600',
    'border-red-500',
    'text-red-700',
  ],
}