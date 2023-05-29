/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'typography-primary': '#1d4ed8',
        'typography-secondary': '#64748b',
        'container-main': '#f1f5f9',
        'container-secondary': '#cbd5e1',
        'container-tertiary': '#bae6fd',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
