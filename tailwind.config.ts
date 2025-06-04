
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chatti: {
          primary: '#64339B',
          secondary: '#F9DAF4',
          button: '#FEA901',
          qantas: '#DD0000',
          white: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
}

export default config
