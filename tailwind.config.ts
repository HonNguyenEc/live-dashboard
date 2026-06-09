import type { Config } from 'tailwindcss';

/**
 * Theme colors mirror the Power BI mockup and src/config/app.config.ts.
 * Kept here as well so utility classes (bg-cream, text-navy, ...) are available.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF4D8',
        accent: '#EFC000',
        lazada: '#8B7A1E',
        shopee: '#F4C430',
        tiktok: '#1B3A57',
        grossLine: '#5DADE2',
      },
    },
  },
  plugins: [],
};

export default config;
