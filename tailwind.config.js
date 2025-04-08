// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      // If you have an 'app' directory for App Router features, add it too:
      // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        // Add any theme customizations here, e.g., colors, fonts
        // colors: {
        //   'custom-blue': '#007bff',
        // },
      },
    },
    plugins: [
      // Add any Tailwind plugins here
    ],
  }