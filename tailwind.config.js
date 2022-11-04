/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: true,
    theme: {
      extend: {
        animation: {
            bounce200: 'bounce 1s infinite 200ms',
            bounce400: 'bounce 1s infinite 400ms',
        },
      },
    },
    plugins: [
        require('flowbite/plugin')
    ],
  }