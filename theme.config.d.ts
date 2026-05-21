export interface ThemeColorPalette {
  primary: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  purple: string;
  gold: string;
  charcoal: string;
  glass: string;
}

export type ColorScheme = 'light' | 'dark';

export const Colors: Record<ColorScheme, ThemeColorPalette>;
