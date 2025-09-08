import { PageLayout } from './generate-unified'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Валидирует структуру страницы
 */
export function validatePage(layout: PageLayout, logoUrl?: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Проверяем наличие hero блока
  const heroBlocks = layout.blocks.filter(block => block.type === 'hero')
  if (heroBlocks.length === 0) {
    errors.push('Страница должна содержать hero блок')
  } else if (heroBlocks.length > 1) {
    errors.push('Страница должна содержать только один hero блок')
  }

  // Проверяем наличие финального CTA
  const ctaBlocks = layout.blocks.filter(block => block.type === 'cta')
  if (ctaBlocks.length === 0) {
    errors.push('Страница должна содержать CTA блок')
  }

  // Проверяем логотип в hero блоке
  if (heroBlocks.length > 0) {
    const heroBlock = heroBlocks[0]
    const hasLogo = heroBlock.props?.logoUrl || heroBlock.imageSlots?.some(slot => slot.role === 'logo' && slot.required)
    
    if (!hasLogo) {
      errors.push('Hero блок должен содержать обязательный логотип')
    }
    
    if (!logoUrl) {
      warnings.push('URL логотипа не предоставлен')
    }
  }

  // Проверяем количество блоков
  if (layout.blocks.length < 6) {
    warnings.push('Рекомендуется минимум 6 блоков на странице')
  }
  
  if (layout.blocks.length > 12) {
    warnings.push('Рекомендуется максимум 12 блоков на странице')
  }

  // Проверяем порядок блоков
  const blockTypes = layout.blocks.map(block => block.type)
  const heroIndex = blockTypes.indexOf('hero')
  const ctaIndex = blockTypes.lastIndexOf('cta')
  
  if (heroIndex !== 0) {
    errors.push('Hero блок должен быть первым')
  }
  
  if (ctaIndex !== blockTypes.length - 1) {
    warnings.push('CTA блок рекомендуется размещать в конце страницы')
  }

  // Проверяем дублирование блоков
  const blockCounts = blockTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  Object.entries(blockCounts).forEach(([type, count]) => {
    if (type !== 'cta' && count > 1) {
      warnings.push(`Блок "${type}" встречается ${count} раз`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}
