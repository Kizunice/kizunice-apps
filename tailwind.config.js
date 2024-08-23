/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: '#222222',
        white: '#ffffff',
        whitegray: '#d0d0d0',
        grey: '#2e2e2e',
        primary: '#8ac444',
        secondary: '#004421',
        tersier:'#b67736',
        // primary: '#53AFBE',
        // secondary: '#243B50',
        green: '#9dd49d',
        red: '#ef9a9a',
        danger: '#E02929',
        kinPrimary:'#AF282F',
        kinSecondary :'#243B50'
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};