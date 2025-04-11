/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // <-- Ensure this is 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ['MyFont', 'sans-serif'],
      },
      // Add any specific light/dark theme color variables if needed for complex overrides
      // colors: {
      //   light: {
      //     background: '#FFFFFF',
      //     text: '#111827',
      //     primary: '#3B82F6',
      //     card: '#F3F4F6',
      //   },
      //   dark: { // You can define dark colors explicitly too
      //     background: '#111827',
      //     text: '#E5E7EB',
      //     primary: '#60A5FA',
      //     card: '#1F2937',
      //   }
      // },
      // Keep existing extensions
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};