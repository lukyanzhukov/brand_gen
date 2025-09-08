// Клиентские функции палитры
// Серверные функции находятся в lib/palette-server.ts

export interface ColorPalette {
  // Основные цвета
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
  
  // Дополнительные цвета для блоков
  hero?: {
    background: string
    text: string
    accent: string
  }
  about?: {
    background: string
    text: string
    accent: string
  }
  tracks?: {
    background: string
    text: string
    accent: string
  }
  geo?: {
    background: string
    text: string
    accent: string
  }
  facts?: {
    background: string
    text: string
    accent: string
  }
  benefits?: {
    background: string
    text: string
    accent: string
  }
  culture?: {
    background: string
    text: string
    accent: string
  }
  media?: {
    background: string
    text: string
    accent: string
  }
  hiring?: {
    background: string
    text: string
    accent: string
  }
  cta?: {
    background: string
    text: string
    accent: string
  }
}

/**
 * Простая fallback палитра
 */
export const FALLBACK_PALETTE: ColorPalette = {
  primary: '#FF6B35',
  onPrimary: '#ffffff',
  secondary: '#64748b',
  onSecondary: '#ffffff',
  background: '#ffffff',
  surface: '#f8fafc',
  onBackground: '#0f172a',
  onSurface: '#334155',
  accent: '#F7931E',
  onAccent: '#ffffff',
  error: '#dc2626',
  onError: '#ffffff',
  outline: '#e2e8f0',
  
  // Блочные цвета (по умолчанию используют основные)
  hero: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  about: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  tracks: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  geo: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  facts: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  benefits: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  culture: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  media: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  hiring: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#FF6B35'
  },
  cta: {
    background: '#F7931E',
    text: '#ffffff',
    accent: '#ffffff'
  }
}

/**
 * Генерирует цветовую палитру на основе текста вакансий
 */
// Функция generatePalette перенесена в lib/palette-server.ts

/**
 * Проверяет валидность палитры
 */
function isValidPalette(palette: any): palette is ColorPalette {
  const requiredFields = [
    'primary', 'onPrimary', 'secondary', 'onSecondary', 
    'background', 'surface', 'onBackground', 'onSurface',
    'accent', 'onAccent', 'error', 'onError', 'outline'
  ]
  
  // Проверяем основные поля
  const hasRequiredFields = requiredFields.every(field => 
    palette[field] && 
    typeof palette[field] === 'string' && 
    /^#[0-9A-Fa-f]{6}$/.test(palette[field])
  )
  
  if (!hasRequiredFields) return false
  
  // Проверяем блочные цвета (если есть)
  const blockFields = ['hero', 'about', 'tracks', 'geo', 'facts', 'benefits', 'culture', 'media', 'hiring', 'cta']
  for (const block of blockFields) {
    if (palette[block]) {
      const blockColors = ['background', 'text', 'accent']
      const hasValidBlockColors = blockColors.every(color => 
        palette[block][color] && 
        typeof palette[block][color] === 'string' && 
        /^#[0-9A-Fa-f]{6}$/.test(palette[block][color])
      )
      if (!hasValidBlockColors) return false
    }
  }
  
  return true
}

/**
 * Применяет палитру к компоненту через CSS переменные
 */
export function applyPaletteToComponent(palette: ColorPalette, blockType: 'hero' | 'about' | 'tracks' | 'geo' | 'facts' | 'benefits' | 'culture' | 'media' | 'hiring' | 'cta') {
  const blockPalette = palette[blockType]
  
  if (!blockPalette) {
    // Используем основные цвета, если блочные не заданы
    return {
      '--block-bg': palette.background,
      '--block-text': palette.onBackground,
      '--block-accent': palette.primary
    }
  }
  
  return {
    '--block-bg': blockPalette.background,
    '--block-text': blockPalette.text,
    '--block-accent': blockPalette.accent
  }
}

/**
 * Генерирует CSS переменные для всей палитры
 */
export function generatePaletteCSS(palette: ColorPalette | undefined): Record<string, string> {
  // Используем fallback палитру, если palette не определена
  const safePalette = palette || FALLBACK_PALETTE
  
  return {
    '--primary': safePalette.primary,
    '--primary-foreground': safePalette.onPrimary,
    '--secondary': safePalette.secondary,
    '--secondary-foreground': safePalette.onSecondary,
    '--background': safePalette.background,
    '--surface': safePalette.surface,
    '--foreground': safePalette.onBackground,
    '--muted-foreground': safePalette.onSurface,
    '--accent': safePalette.accent,
    '--accent-foreground': safePalette.onAccent,
    '--destructive': safePalette.error,
    '--destructive-foreground': safePalette.onError,
    '--border': safePalette.outline,
    '--input': safePalette.outline,
    '--ring': safePalette.primary,
    
    // Блочные цвета - используем специфичные цвета если есть, иначе основные
    '--hero-bg': safePalette.hero?.background || safePalette.background,
    '--hero-text': safePalette.hero?.text || safePalette.onBackground,
    '--hero-accent': safePalette.hero?.accent || safePalette.primary,
    
    '--about-bg': safePalette.about?.background || safePalette.background,
    '--about-text': safePalette.about?.text || safePalette.onBackground,
    '--about-accent': safePalette.about?.accent || safePalette.primary,
    
    '--tracks-bg': safePalette.tracks?.background || safePalette.background,
    '--tracks-text': safePalette.tracks?.text || safePalette.onBackground,
    '--tracks-accent': safePalette.tracks?.accent || safePalette.primary,
    
    '--geo-bg': safePalette.geo?.background || safePalette.background,
    '--geo-text': safePalette.geo?.text || safePalette.onBackground,
    '--geo-accent': safePalette.geo?.accent || safePalette.primary,
    
    '--facts-bg': safePalette.facts?.background || safePalette.background,
    '--facts-text': safePalette.facts?.text || safePalette.onBackground,
    '--facts-accent': safePalette.facts?.accent || safePalette.primary,
    
    '--benefits-bg': safePalette.benefits?.background || safePalette.background,
    '--benefits-text': safePalette.benefits?.text || safePalette.onBackground,
    '--benefits-accent': safePalette.benefits?.accent || safePalette.primary,
    
    '--culture-bg': safePalette.culture?.background || safePalette.background,
    '--culture-text': safePalette.culture?.text || safePalette.onBackground,
    '--culture-accent': safePalette.culture?.accent || safePalette.primary,
    
    '--media-bg': safePalette.media?.background || safePalette.background,
    '--media-text': safePalette.media?.text || safePalette.onBackground,
    '--media-accent': safePalette.media?.accent || safePalette.primary,
    
    '--hiring-bg': safePalette.hiring?.background || safePalette.background,
    '--hiring-text': safePalette.hiring?.text || safePalette.onBackground,
    '--hiring-accent': safePalette.hiring?.accent || safePalette.primary,
    
    '--cta-bg': safePalette.cta?.background || safePalette.accent,
    '--cta-text': safePalette.cta?.text || safePalette.onAccent,
    '--cta-accent': safePalette.cta?.accent || safePalette.onAccent
  }
}
