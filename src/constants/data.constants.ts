/** Fixed domain values for the sales dataset (match the Excel source). */

export const PLATFORMS = ['Lazada', 'Shopee', 'Tiktok'] as const;

export type Platform = (typeof PLATFORMS)[number];

export const BRANDS = [
  'Apex Athletics',
  'Aura Apparel',
  'Lumina Tech',
  'Nova Beauty',
  'Zenith Goods',
] as const;

/** Series colors taken from the mockup spec. */
export const PLATFORM_COLORS: Record<Platform, string> = {
  Lazada: '#8B7A1E', // olive-gold
  Shopee: '#F4C430', // yellow
  Tiktok: '#1B3A57', // navy
};

/** Color for the Gross Orders line (right Y axis). */
export const GROSS_ORDERS_COLOR = '#5DADE2';
