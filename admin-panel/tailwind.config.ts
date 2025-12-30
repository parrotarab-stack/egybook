import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ألوان العلم المصري
        'egy-red': '#ce1126',
        'egy-white': '#ffffff',
        'egy-black': '#000000',
        'egy-gold': '#c19a3f',
        
        // ألوان فرعونية إضافية
        'pharaoh-blue': '#0d2b4e',
        'papyrus-yellow': '#f7e8aa',
        'nile-green': '#1a5f3e',
        'desert-orange': '#d2691e',
        'pyramid-sand': '#e6c9a8',
        
        // ألوان للوحة التحكم
        primary: '#ce1126',
        secondary: '#c19a3f',
        accent: '#0d2b4e',
        dark: '#1a1a2e',
        light: '#f8f9fa'
      },
      fontFamily: {
        'arabic': ['"Cairo"', 'sans-serif'],
        'title': ['"Amiri"', 'serif'],
        'hieroglyph': ['"Noto Sans Egyptian Hieroglyphs"', 'serif']
      },
      backgroundImage: {
        'pharaoh-pattern': "url('/patterns/pharaoh-bg.png')",
        'papyrus-texture': "url('/patterns/papyrus-texture.jpg')",
        'pyramid-gradient': 'linear-gradient(135deg, #e6c9a8 0%, #d2691e 100%)'
      }
    },
  },
  plugins: [],
}
export default config