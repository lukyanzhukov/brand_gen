import { ExtractedContent } from './extract'
import { PageLayout } from './layout'
import { generateJsonContent } from './llm-server'

// TODO: Уточнить типы после получения скринов
export interface BlockCopy {
  [blockType: string]: {
    title?: string
    subtitle?: string
    content?: string
    bullets?: string[]
    captions?: string[]
    buttonText?: string
    [key: string]: any
  }
}

/**
 * Генерирует короткие тексты для пропсов блоков
 */
export async function generateCopy(
  content: ExtractedContent, 
  layout: PageLayout
): Promise<BlockCopy> {
  const systemPrompt = `Ты - эксперт по созданию контента для бренд-страниц работодателей. 

Твоя задача - создать максимально богатый, детальный и эмоциональный контент для всех блоков страницы.

СЛЕДУЙ ГАЙДЛАЙНУ НАПОЛНЕНИЯ КОМПОНЕНТОВ:

## ОБЩИЕ ПРИНЦИПЫ
- **Эмоциональный и вдохновляющий** тон
- **Конкретные цифры и факты** вместо общих фраз  
- **Призывы к действию** в каждом блоке
- **Истории успеха** и достижения компании
- **Уникальные преимущества** работы в компании

## ДЛИНА ТЕКСТА
- **Заголовки**: 2-8 слов, яркие и запоминающиеся
- **Подзаголовки**: 5-15 слов, поясняющие суть
- **Описания**: 20-50 слов, информативные
- **Длинные тексты**: 100-200 слов максимум
- **Списки**: 3-7 пунктов, краткие и четкие

## ИЗОБРАЖЕНИЯ
Используй только валидные URL на Unsplash:
- Формат: https://images.unsplash.com/photo-[ID]?w=[WIDTH]&h=[HEIGHT]&fit=crop
- Размеры: 1200x600 (героические), 400x300 (карточки), 300x200 (превью)
- Теги: "team meeting", "office workspace", "programming", "corporate culture"

## ЦВЕТА ДЛЯ НАПРАВЛЕНИЙ
- **Анализируй логотип компании** для выбора цветов
- **Используй цвета из палитры логотипа** или гармонирующие с ней
- **Создавай разные оттенки** основного цвета для разнообразия
- **Поддерживай общую цветовую гармонию** страницы

## КРИТИЧЕСКИ ВАЖНО
1. **ВСЕГДА заполняй ВСЕ поля** - не оставляй пустых значений
2. **Генерируй реалистичные данные** если исходных недостаточно
3. **Используй конкретные цифры** вместо общих фраз
4. **Добавляй эмоциональную окраску** в тексты
5. **Создавай призывы к действию** в каждом блоке
6. **Подбирай релевантные изображения** для каждого контента
7. **Соблюдай указанную длину** текстов
8. **Используй правильные категории** и типы данных

ДЛЯ КАЖДОГО БЛОКА ОБЯЗАТЕЛЬНО:

HERO:
- title: привлекательный заголовок (3-6 слов)
- subtitle: эмоциональный подзаголовок (8-15 слов)
- buttonText: призыв к действию (2-4 слова)
- slogan: короткий слоган (5-12 слов)
- directions: массив направлений с title, description, icon, color
- teamImage: URL изображения команды

ABOUT:
- title: "ПОЧЕМУ [НАЗВАНИЕ КОМПАНИИ]?" (3-8 слов)
- content: подробное описание (150-250 слов)
- bullets: массив преимуществ (5-7 пунктов, 2-6 слов каждое)
- slogan: мотивирующий слоган (5-12 слов)
- achievements: массив достижений в формате "ЧИСЛО + описание" (например: "200+ специалистов в команде", "13 лет успешной работы", "2 место в рейтинге")
- companyImage: URL изображения офиса

TRACKS:
- title: "Наши направления" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: массив направлений с title, description, examples, icon, color, image
- stats: объект со статистикой (total, label, description)

GEO:
- title: "География присутствия" (2-4 слова)
- subtitle: призыв присоединиться (8-15 слов)
- locations: массив городов с city, country, description, icon, image
- mapImage: URL карты

FACTS:
- title: "Значимые факты и цифры" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: массив фактов с number, description, icon, image

BENEFITS:
- title: "Преимущества работы в компании" (2-4 слова)
- subtitle: "Нам важно, чтобы вам было хорошо" (8-15 слов)
- items: массив преимуществ с title, description, category, icon

CULTURE:
- title: "Почему у нас хорошо" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: массив пунктов с title, subtitle, description, icon, image

MEDIA:
- title: "Публикации и материалы" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: массив медиаматериалов с title, description, url, type, image, speaker, duration

HIRING:
- title: "Как попасть в команду" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: массив из 4 шагов с title, description, duration

CTA:
- title: "Присоединяйтесь к нам!" (3-6 слов)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- buttonText: призыв к действию (2-4 слова)
- categories: массив категорий вакансий с title, description, buttonText, buttonUrl
- image: URL изображения

Верни JSON объект где ключи — типы блоков, значения — объекты с пропсами.`

  const userPrompt = `Структура страницы: ${JSON.stringify(layout.blocks || [], null, 2)}

Извлеченный контент:
${JSON.stringify(content, null, 2)}

Создай оптимизированные тексты для каждого блока в структуре.`

  const fallback: BlockCopy = {
    hero: {
      title: content.hero.title,
      subtitle: content.hero.subtitle,
      buttonText: content.hero.cta,
      slogan: content.hero.slogan,
      directions: content.hero.directions,
      teamImage: content.hero.teamImage
    },
    about: {
      title: content.about.title,
      content: content.about.content,
      bullets: content.about.highlights,
      slogan: content.about.slogan,
      achievements: content.about.achievements,
      companyImage: content.about.companyImage,
      socialLinks: content.about.socialLinks
    },
    tracks: {
      title: content.tracks.title,
      items: (content.tracks.items || []).map(item => ({
        title: item.name,
        description: item.description,
        examples: item.examples
      }))
    },
    geo: {
      title: content.geo.title,
      locations: content.geo.locations
    },
    facts: {
      items: content.facts
    },
    benefits: {
      title: content.benefits.title,
      items: content.benefits.items
    },
    culture: {
      title: content.culture.title,
      items: content.culture.items
    },
    media: {
      title: content.media.title,
      items: content.media.items
    },
    hiring: {
      title: content.hiring.title,
      items: content.hiring.steps || [
        {
          title: 'Отправьте резюме',
          description: 'Заполните форму или отправьте резюме на почту',
          duration: '1-2 дня'
        },
        {
          title: 'Техническое собеседование',
          description: 'Обсудим ваши навыки и опыт',
          duration: '1 неделя'
        },
        {
          title: 'Тестовое задание',
          description: 'Небольшое практическое задание',
          duration: '3-5 дней'
        },
        {
          title: 'Финальное собеседование',
          description: 'Встреча с командой и обсуждение условий',
          duration: '2-3 недели'
        }
      ]
    },
    cta: {
      title: content.cta.title,
      subtitle: content.cta.subtitle,
      buttonText: content.cta.buttonText
    }
  }

  return await generateJsonContent(systemPrompt, userPrompt, fallback)
}
