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
  primary: '#2563eb',
  onPrimary: '#ffffff',
  secondary: '#64748b',
  onSecondary: '#ffffff',
  background: '#ffffff',
  surface: '#f8fafc',
  onBackground: '#0f172a',
  onSurface: '#334155',
  accent: '#f59e0b',
  onAccent: '#ffffff',
  error: '#dc2626',
  onError: '#ffffff',
  outline: '#e2e8f0',
  
  // Блочные цвета (по умолчанию используют основные)
  hero: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#2563eb'
  },
  about: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  tracks: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  geo: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  facts: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#2563eb'
  },
  benefits: {
    background: '#f8fafc',
    text: '#0f172a',
    accent: '#2563eb'
  },
  culture: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  media: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  hiring: {
    background: '#ffffff',
    text: '#0f172a',
    accent: '#2563eb'
  },
  cta: {
    background: '#f59e0b',
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
    
    // Блочные цвета
    ...(safePalette.hero && {
      '--hero-bg': safePalette.hero.background,
      '--hero-text': safePalette.hero.text,
      '--hero-accent': safePalette.hero.accent
    }),
    ...(safePalette.about && {
      '--about-bg': safePalette.about.background,
      '--about-text': safePalette.about.text,
      '--about-accent': safePalette.about.accent
    }),
    ...(safePalette.tracks && {
      '--tracks-bg': safePalette.tracks.background,
      '--tracks-text': safePalette.tracks.text,
      '--tracks-accent': safePalette.tracks.accent
    }),
    ...(safePalette.geo && {
      '--geo-bg': safePalette.geo.background,
      '--geo-text': safePalette.geo.text,
      '--geo-accent': safePalette.geo.accent
    }),
    ...(safePalette.facts && {
      '--facts-bg': safePalette.facts.background,
      '--facts-text': safePalette.facts.text,
      '--facts-accent': safePalette.facts.accent
    }),
    ...(safePalette.benefits && {
      '--benefits-bg': safePalette.benefits.background,
      '--benefits-text': safePalette.benefits.text,
      '--benefits-accent': safePalette.benefits.accent
    }),
    ...(safePalette.culture && {
      '--culture-bg': safePalette.culture.background,
      '--culture-text': safePalette.culture.text,
      '--culture-accent': safePalette.culture.accent
    }),
    ...(safePalette.media && {
      '--media-bg': safePalette.media.background,
      '--media-text': safePalette.media.text,
      '--media-accent': safePalette.media.accent
    }),
    ...(safePalette.hiring && {
      '--hiring-bg': safePalette.hiring.background,
      '--hiring-text': safePalette.hiring.text,
      '--hiring-accent': safePalette.hiring.accent
    }),
    ...(safePalette.cta && {
      '--cta-bg': safePalette.cta.background,
      '--cta-text': safePalette.cta.text,
      '--cta-accent': safePalette.cta.accent
    })
  }
}
