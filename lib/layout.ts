import { ExtractedContent } from './extract'
import { generateJsonContent } from './llm-server'

// TODO: Уточнить типы после получения скринов
export interface PageBlock {
  type: string
  variant: string
  propsFrom: string
  imageSlots?: Array<{
    role: string
    required: boolean
    source?: string
  }>
}

export interface PageLayout {
  blocks: PageBlock[]
  metadata: {
    title: string
    description: string
  }
}

/**
 * Планирует структуру страницы из блоков
 */
export async function planLayout(
  content: ExtractedContent, 
  logoUrl?: string
): Promise<PageLayout> {
  const systemPrompt = `Ты бренд-дизайнер hh.ru. Собери структуру страницы из наших блоков и выбери по одному варианту для каждого, соблюдая правила:
— 1 hero в начале с обязательным логотипом (URL из HH),
— финальный CTA обязателен,
— порядок соответствует гайдам (вакансии/медийный — после «О компании» и т.д.),
— 6–12 блоков всего.

Доступные блоки:
- hero: imageLeft, imageFull, withDirections, withTeam
- about: default, withBullets, hiltiStyle  
- tracks: grid, list, yandexStyle
- geo: cards, list, mapStyle
- facts: strip3, strip5, avitoStyle
- benefits: compact, withIcons, wellbeingStyle
- culture: cards, quotes, valuesStyle, mediaStyle
- media: cards, links, videoStyle, communityStyle
- hiring: steps, timeline, verticalStyle, horizontalStyle
- cta: primary, secondary, vacanciesStyle, internshipStyle, choiceStyle, orangeStyle

Верни массив блоков: [{type, variant, propsFrom, imageSlots}]`

  const userPrompt = `Создай структуру страницы для компании на основе извлеченного контента.
Логотип: ${logoUrl || 'не указан'}

Доступный контент:
- Hero: ${content.hero.title} - ${content.hero.subtitle || ''}
- About: ${content.about.title} - ${(content.about.content || '').substring(0, 100)}...
- Tracks: ${content.tracks?.items?.length || 0} направлений
- Geo: ${content.geo?.locations?.length || 0} локаций
- Facts: ${content.facts?.items?.length || 0} фактов
- Benefits: ${content.benefits?.items?.length || 0} преимуществ
- Culture: ${content.culture?.items?.length || 0} пунктов
- Media: ${content.media?.items?.length || 0} медиа
- Hiring: ${content.hiring?.steps?.length || 0} шагов
- CTA: ${content.cta.title}

Выбери оптимальную структуру и варианты блоков.`

  const fallback: PageLayout = {
    blocks: [
      {
        type: 'hero',
        variant: 'imageLeft',
        propsFrom: 'hero',
        imageSlots: logoUrl ? [{ role: 'logo', required: true, source: logoUrl }] : []
      },
      {
        type: 'about',
        variant: 'default',
        propsFrom: 'about'
      },
      {
        type: 'tracks',
        variant: 'grid',
        propsFrom: 'tracks'
      },
      {
        type: 'facts',
        variant: 'strip3',
        propsFrom: 'facts'
      },
      {
        type: 'benefits',
        variant: 'compact',
        propsFrom: 'benefits'
      },
      {
        type: 'culture',
        variant: 'cards',
        propsFrom: 'culture'
      },
      {
        type: 'hiring',
        variant: 'steps',
        propsFrom: 'hiring'
      },
      {
        type: 'cta',
        variant: 'primary',
        propsFrom: 'cta'
      }
    ],
    metadata: {
      title: content.hero.title,
      description: content.hero.subtitle
    }
  }

  return await generateJsonContent(systemPrompt, userPrompt, fallback)
}
