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

// Типы для компонентов блоков
export interface CTABlockProps {
  title: string
  description: string
  buttonText: string
  buttonUrl: string
  variant?: string
}

export interface HeroBlockProps {
  title: string
  subtitle: string
  cta: string
  directions?: Array<{
    title: string
    description: string
    icon?: string
    color?: string
  }>
  logoUrl?: string
  variant: 'imageLeft' | 'imageFull' | 'withDirections' | 'withTeam'
  teamImage?: string
  slogan?: string
}

export interface AboutBlockProps {
  title: string
  content: string
  bullets?: string[]
  slogan?: string
  achievements?: Array<{
    number: string
    label: string
    description?: string
    image?: string
  }>
  companyImage?: string
  socialLinks?: any[]
  variant: 'withImage' | 'withAchievements' | 'withHighlights'
}

export interface TracksBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    icon?: string
    examples?: string[]
    image?: string
  }>
  variant: 'grid' | 'list' | 'cards'
  stats?: Array<{ label: string; value: string }>
}

export interface GeoBlockProps {
  title: string
  subtitle?: string
  locations: Array<{
    city: string
    country: string
    description?: string
    type?: string
    image?: string
  }>
  variant: string
  mapImage?: string
}

export interface FactsBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    number: string
    label: string
    description?: string
  }>
  variant: string
}

export interface BenefitsBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    category: 'financial' | 'social' | 'career'
    icon?: string
  }>
  variant: string
}

export interface CultureBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    icon?: string
    image?: string
  }>
  variant: string
}

export interface MediaBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    url: string
    type: string
    image?: string
  }>
  variant: string
}

export interface HiringBlockProps {
  title: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    duration?: string
    icon?: string
    image?: string
  }>
  variant: string
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
