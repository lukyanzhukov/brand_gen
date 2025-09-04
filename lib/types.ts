// Основные типы для генератора страниц

export interface PageLayout {
  blocks: Array<{
    type: string
    variant: string
  }>
}

export interface BlockCopy {
  hero: any
  about: any
  tracks: any
  geo: any
  facts: any
  benefits: any
  culture: any
  media: any
  hiring: any
  cta: any
}

export interface ColorPalette {
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  background: string
  surface: string
  onBackground: string
  onSurface: string
  accent: string
  onAccent: string
  error: string
  onError: string
  outline: string
  blocks: {
    [key: string]: {
      primary: string
      secondary: string
    }
  }
}
