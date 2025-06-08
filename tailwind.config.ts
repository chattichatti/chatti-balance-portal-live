import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'chatti-primary': '#64339B',   // Chatti Purple
        'chatti-secondary': '#F9DAF4', // Chatti Light Pink
        'qantas-red': '#DD0000',       // Qantas Red
        'chatti-gold': '#FEA901',      // Gold button color
      },
    },
  },
  plugins: [],
};

export default config;
