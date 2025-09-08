import { generateJsonContentWithImage } from './llm-server'
import { ColorPalette, FALLBACK_PALETTE } from './palette'

/**
 * Скачивает изображение и конвертирует в base64
 */
async function downloadImageAsBase64(url: string): Promise<string | null> {
  try {
    console.log('🖼️ Downloading image:', url)
    const response = await fetch(url)
    if (!response.ok) {
      console.log('❌ Failed to download image:', response.status)
      return null
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const mimeType = response.headers.get('content-type') || 'image/jpeg'
    
    console.log('✅ Image downloaded and converted to base64')
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error('❌ Error downloading image:', error)
    return null
  }
}

/**
 * Генерирует цветовую палитру на основе логотипа и информации о компании
 */
export async function generatePalette(vacancyCorpus: string, logoUrl?: string, companyName?: string): Promise<ColorPalette> {
  console.log('🎨 Generating palette for:', { companyName, logoUrl })

  const systemPrompt = `Ты - эксперт по цветовому дизайну и брендингу. Твоя задача - создать подходящую цветовую палитру для бренд-страницы работодателя.

## АНАЛИЗ ЛОГОТИПА И СОЗДАНИЕ ПАЛИТРЫ
- **ПРОАНАЛИЗИРУЙ ЛОГОТИП** - извлеки основные цвета из логотипа компании
- **Используй цвета логотипа** как основу для палитры
- **Создавай гармоничные сочетания** на основе цветов логотипа
- **Адаптируй палитру** под характер и сферу деятельности компании

## ПРИНЦИПЫ ДИЗАЙНА
- **Современные и профессиональные** цвета
- **Высокий контраст** для читаемости
- **Эмоционально подходящие** для IT-компании
- **Гармоничные сочетания** цветов
- **Доступность** для людей с нарушениями зрения

## СТРУКТУРА ПАЛИТРЫ
- **primary**: основной цвет (из логотипа или гармонирующий)
- **onPrimary**: контрастный к primary
- **secondary**: дополнительный цвет
- **onSecondary**: контрастный к secondary
- **background**: светлый фон
- **surface**: поверхность
- **onBackground**: основной текст
- **onSurface**: вторичный текст
- **accent**: акцентный цвет
- **onAccent**: контрастный к accent
- **error**: цвет ошибок
- **onError**: контрастный к error
- **outline**: границы

## БЛОЧНЫЕ ЦВЕТА
- **hero**: яркий, привлекательный, с градиентами
- **about**: профессиональный, доверительный
- **tracks**: технологичный, современный
- **geo**: нейтральный, информативный
- **facts**: контрастный, читаемый
- **benefits**: теплый, дружелюбный
- **culture**: вдохновляющий, живой
- **media**: динамичный, яркий
- **hiring**: четкий, структурированный
- **cta**: призывный, яркий

Верни объект с hex-цветами. Все цвета должны гармонично сочетаться и отражать характер компании.`

  const userPrompt = `СОЗДАЙ ЦВЕТОВУЮ ПАЛИТРУ ДЛЯ КОМПАНИИ:

${companyName ? `Компания: ${companyName}` : ''}
${logoUrl ? `Логотип предоставлен ниже` : ''}
${vacancyCorpus ? `Описание компании: ${vacancyCorpus}` : ''}

ЗАДАЧА:
1. **ПРОАНАЛИЗИРУЙ ЛОГОТИП** и извлеки основные цвета
2. **Используй цвета логотипа** как основу для палитры
3. **Создай гармоничную палитру** на основе цветов логотипа
4. **Адаптируй под характер компании** и сферу деятельности

Верни ТОЛЬКО JSON с цветовой палитрой в формате:
{
  "primary": "#цвет",
  "onPrimary": "#ffffff",
  "secondary": "#64748b",
  "onSecondary": "#ffffff",
  "background": "#ffffff",
  "surface": "#f8fafc",
  "onBackground": "#0f172a",
  "onSurface": "#334155",
  "accent": "#цвет",
  "onAccent": "#ffffff",
  "error": "#dc2626",
  "onError": "#ffffff",
  "outline": "#e2e8f0",
  "hero": {
    "background": "#f8fafc",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "about": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "tracks": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "geo": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "facts": {
    "background": "#f8fafc",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "benefits": {
    "background": "#f8fafc",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "culture": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "media": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "hiring": {
    "background": "#ffffff",
    "text": "#0f172a",
    "accent": "#цвет"
  },
  "cta": {
    "background": "#цвет",
    "text": "#ffffff",
    "accent": "#ffffff"
  }
}`

  try {
    console.log('🎨 Calling LLM for palette generation...')
    
    // Если есть логотип, скачиваем его и анализируем
    let imageBase64: string | null = null
    if (logoUrl) {
      imageBase64 = await downloadImageAsBase64(logoUrl)
    }
    
    // Используем vision модель если есть изображение
    const model = imageBase64 ? 'gpt-4o' : 'gpt-4o-mini'
    console.log('🎨 Using model:', model)

    const palette = await generateJsonContentWithImage(systemPrompt, userPrompt, FALLBACK_PALETTE, model, imageBase64)
    console.log('🎨 LLM returned palette:', JSON.stringify(palette, null, 2))

    // Валидация цветов
    if (isValidPalette(palette)) {
      console.log('✅ Palette validation passed')
      return palette
    } else {
      console.log('❌ Palette validation failed, trying again with simpler prompt')
      // Попробуем еще раз с более простым промптом
      const simplePrompt = `Создай цветовую палитру для компании "${companyName}". 
Используй психологию цветов и создай гармоничную палитру.
Верни JSON: {"primary": "#цвет", "accent": "#цвет", "background": "#ffffff", "surface": "#f8fafc", "onBackground": "#0f172a", "onSurface": "#334155"}`
      
      const retryPalette = await generateJsonContentWithImage(simplePrompt, '', FALLBACK_PALETTE, 'gpt-4o-mini')
      if (isValidPalette(retryPalette)) {
        console.log('✅ Retry palette validation passed')
        return retryPalette
      }
    }
  } catch (error) {
    console.error('❌ Error generating palette:', error)
  }

  // Если все попытки не удались, используем fallback
  console.log('🎨 All attempts failed, using fallback palette')
  return FALLBACK_PALETTE
}

/**
 * Проверяет валидность палитры
 */
function isValidPalette(palette: any): palette is ColorPalette {
  if (!palette || typeof palette !== 'object') {
    return false
  }
  
  // Проверяем только основные поля
  const requiredFields = ['primary', 'accent']
  
  return requiredFields.every(field => 
    palette[field] && 
    typeof palette[field] === 'string' && 
    palette[field].startsWith('#') &&
    palette[field].length === 7 // #RRGGBB
  )
}