/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0F1E2A', soft: '#33434F', muted: '#4A5A66', line: '#2A3B48' },
        paper: { DEFAULT: '#F6F7F5', card: '#FFFFFF', line: '#DCE2E5', tint: '#EEF1F2' },
        sky: { DEFAULT: '#0B6FA4', deep: '#08507A', soft: '#E3F0F7', light: '#7CC4EA' },
        amber: { mark: '#FBE3B0', soft: '#FFF3DC', text: '#6B4200', bright: '#F2C46D' },
        plum: { mark: '#E2DAF3', soft: '#EFEAF8', text: '#4B3A7A' },
        rust: { soft: '#F7E1DE', text: '#7A2E22' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        dash: { to: { strokeDashoffset: '-24' } },
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        dash: 'dash 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
