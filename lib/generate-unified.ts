import OpenAI from 'openai'
import { ExtractedContent } from './extract'
import { ColorPalette } from './palette'

export interface PageBlock {
  type: string
  variant: string
  props: Record<string, any>
  imageSlots?: Array<{
    role: string
    required: boolean
    source?: string
  }>
}

export interface PageLayout {
  blocks: PageBlock[]
  metadata?: {
    title: string
    description: string
  }
}

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

export interface UnifiedGenerationResult {
  layout: PageLayout
  copy: BlockCopy
}

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.AUTH_TOKEN,
    baseURL: process.env.BASE_URL || 'https://api.openai.com/v1',
  })
}

export async function generateUnifiedContent(
  companyData: any,
  colorPalette?: ColorPalette
): Promise<UnifiedGenerationResult> {
  
  try {
    const systemPrompt = `Создай бренд-страницу работодателя. ОБЯЗАТЕЛЬНО включи ВСЕ 10 блоков в этом порядке:

1. hero - главный блок с логотипом и направлениями
2. about - о компании
3. tracks - направления работы
4. geo - география
5. facts - цифры и факты
6. benefits - преимущества работы
7. culture - информация о корпоративной культуре
8. media - список статей и медиа
9. hiring - шаги как попасть в команду
10. cta - призыв к действию

Верни JSON в формате:
{
  "layout": {
    "blocks": [
      {"type": "hero", "props": {"logoUrl": "https://img.hhcdn.ru/employer-logo-original/1439083.png"}, "imageSlots": []},
      {"type": "about", "props": {}, "imageSlots": []},
      {"type": "tracks", "props": {}, "imageSlots": []},
      {"type": "geo", "props": {}, "imageSlots": []},
      {"type": "facts", "props": {}, "imageSlots": []},
      {"type": "benefits", "props": {}, "imageSlots": []},
      {"type": "culture", "props": {}, "imageSlots": []},
      {"type": "media", "props": {}, "imageSlots": []},
      {"type": "hiring", "props": {}, "imageSlots": []},
      {"type": "cta", "props": {}, "imageSlots": []}
    ]
  },
  "copy": {
    "hero": {
      "title": "Heads&Hands",
      "subtitle": "Создаем супераппы и цифровые экосистемы для лидеров рынка",
      "cta": "Посмотреть вакансии",
      "directions": [
        {"title": "Разработка супераппов", "description": "Создаем мобильные приложения нового поколения", "icon": "📱"},
        {"title": "Цифровые экосистемы", "description": "Интегрированные решения для крупного бизнеса", "icon": "🌐"},
        {"title": "Полный цикл разработки", "description": "От идеи до запуска и поддержки", "icon": "⚡"}
      ]
    },
    "about": {
      "title": "О компании",
      "content": "Heads&Hands — лидер в разработке цифровых экосистем для крупного бизнеса. Мы работаем с такими гигантами, как Т-банк, LaModa и Спортмастер, создавая приложения, которые вы используете каждый день.",
      "bullets": [
        "2 место в Рейтинге Рунета среди разработчиков для крупного бизнеса",
        "200+ специалистов в команде",
        "13 лет успешной работы на рынке"
      ],
      "achievements": [
        {"number": "200+", "label": "Специалистов", "description": "В команде разработки"},
        {"number": "13", "label": "Лет опыта", "description": "На рынке разработки"},
        {"number": "2", "label": "Место в рейтинге", "description": "Среди разработчиков для крупного бизнеса"},
        {"number": "50+", "label": "Проектов", "description": "Успешно реализовано"}
      ]
    },
    "tracks": {
      "title": "Направления работы",
      "tracks": [
        {"title": "Мобильная и веб-разработка", "description": "iOS, Android, React Native, Flutter", "icon": "📱", "examples": ["Swift", "Kotlin", "React Native", "Flutter"]},
        {"title": "Аналитика и тестирование", "description": "Data Science, QA, Performance Testing", "icon": "📊", "examples": ["Python", "Selenium", "JMeter", "Tableau"]},
        {"title": "UX/UI дизайн", "description": "User Experience, Interface Design, Prototyping", "icon": "🎨", "examples": ["Figma", "Sketch", "Adobe XD", "Principle"]}
      ]
    },
    "geo": {
      "title": "География",
      "locations": [
        {"city": "Санкт-Петербург", "country": "Россия", "type": "Главный офис", "description": "Центральный офис компании"},
        {"city": "Новосибирск", "country": "Россия", "type": "Филиал", "description": "Сибирский филиал"},
        {"city": "Саранск", "country": "Россия", "type": "Филиал", "description": "Поволжский филиал"},
        {"city": "Саратов", "country": "Россия", "type": "Филиал", "description": "Южный филиал"}
      ]
    },
    "facts": {
      "title": "Цифры и факты",
      "facts": [
        {"number": "1.5-3 года", "label": "Средняя длительность проектов", "description": "Время от старта до релиза"},
        {"number": "50+", "label": "Успешных проектов", "description": "Для крупного бизнеса"},
        {"number": "100%", "label": "Работа только с крупным бизнесом", "description": "Фокус на enterprise-клиентах"}
      ]
    },
    "benefits": {
      "title": "Преимущества работы",
      "benefits": [
        {"title": "Современные технологии", "description": "Работа с последним стеком технологий", "category": "career", "icon": "🚀"},
        {"title": "Качественные проекты", "description": "Отсутствие легаси-проектов", "category": "career", "icon": "✨"},
        {"title": "Стабильность", "description": "Стабильные и долгосрочные проекты", "category": "financial", "icon": "💼"},
        {"title": "Команда экспертов", "description": "Работа с лучшими специалистами отрасли", "category": "social", "icon": "👥"}
      ]
    },
    "culture": {
      "title": "Корпоративная культура",
      "items": [
        {"title": "Стабильность проектов", "description": "Команда ведет проект с нуля до релиза без смены состава", "icon": "🎯"},
        {"title": "Глубокое погружение", "description": "Возможность детально изучить каждый аспект разработки", "icon": "🔍"},
        {"title": "Высокое качество", "description": "Фокус на качестве кода и архитектурных решениях", "icon": "⭐"},
        {"title": "Непрерывное обучение", "description": "Регулярные воркшопы и конференции", "icon": "📚"}
      ]
    },
    "media": {
      "title": "Статьи и медиа",
      "articles": [
        {"title": "Как мы создаем супераппы для Т-банка", "description": "Подробный разбор архитектуры и подходов", "url": "#", "type": "article"},
        {"title": "Инновационные подходы Heads&Hands в разработке", "description": "Наши методологии и инструменты", "url": "#", "type": "article"},
        {"title": "Интервью с основателем компании", "description": "История создания и развития компании", "url": "#", "type": "video"}
      ]
    },
    "hiring": {
      "title": "Как попасть в команду",
      "items": [
        {"title": "Подача заявки", "description": "Отправьте резюме через наш сайт или HeadHunter", "duration": "5 минут", "icon": "📝"},
        {"title": "Техническое интервью", "description": "Обсуждение опыта и решение практических задач", "duration": "1-2 часа", "icon": "💻"},
        {"title": "Встреча с командой", "description": "Знакомство с будущими коллегами и обсуждение проектов", "duration": "1 час", "icon": "👥"},
        {"title": "Финальное решение", "description": "Обратная связь и предложение о работе", "duration": "1-3 дня", "icon": "✅"}
      ]
    },
    "cta": {
      "title": "Присоединяйтесь к нам",
      "description": "Хотите стать частью команды, создающей будущее цифровых технологий? Ознакомьтесь с нашими вакансиями и подайте заявку!",
      "buttonText": "Посмотреть вакансии",
      "buttonUrl": "https://hh.ru/employer/1439083"
    }
  }
}

КРИТИЧЕСКИ ВАЖНО - СТРУКТУРЫ ДАННЫХ:
- hero.cta (НЕ buttonText)
- about.content (НЕ description) + bullets (НЕ achievements) + achievements как массив объектов
- facts.facts[].number (НЕ value) + description
- geo.locations[].country (ОБЯЗАТЕЛЬНО)
- benefits.benefits[].category (ОБЯЗАТЕЛЬНО: 'financial' | 'social' | 'career')
- culture.items (НЕ culture) - массив объектов
- media.articles[].description + type (ОБЯЗАТЕЛЬНО)
- hiring.items (НЕ process) - массив объектов с title, description, duration, icon

ВАЖНО: 
- ВСЕ данные должны быть в объекте "copy", а не в "props"
- В hero блоке логотип должен быть в props.logoUrl
- Все массивы должны содержать 3-5 элементов
- Все тексты должны быть информативными и интересными
- Используй реальные данные компании
- ОБЯЗАТЕЛЬНО используй переданную цветовую палитру в описаниях и контенте
- НЕ используй стандартные синие цвета, если передана другая палитра
- В описаниях блоков упоминай цвета из переданной палитры
- Все цвета должны соответствовать переданной палитре`

    const userPrompt = `Компания: ${companyData.name || 'Heads&Hands'}
Описание: ${companyData.companyCorpus || 'Нет данных о компании'}
Логотип: ${companyData.logoUrl || 'Нет логотипа'}

${colorPalette ? `ЦВЕТОВАЯ ПАЛИТРА (ОБЯЗАТЕЛЬНО ИСПОЛЬЗУЙ ЭТИ ЦВЕТА):
- Основной цвет: ${colorPalette.primary}
- Акцентный цвет: ${colorPalette.accent}
- Фон: ${colorPalette.background}
- Поверхность: ${colorPalette.surface}

КРИТИЧЕСКИ ВАЖНО: 
1. Используй ТОЛЬКО эти цвета в описаниях и контенте!
2. НЕ используй стандартные синие цвета (#2563eb, #3B82F6) если передана другая палитра!
3. Все цвета должны соответствовать переданной палитре!
4. В описаниях блоков упоминай цвета из палитры!` : ''}

Создай JSON с 10 блоками для бренд-страницы. Используй данные компании.

ВАЖНО: В hero блоке логотип должен быть в props.logoUrl, а не в props.logo!`

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 8000,
    }, {
      timeout: 180000 // 3 минуты таймаут
    })

    const rawOutput = completion.choices[0]?.message?.content || '{}'

    // Парсим JSON ответ
    let result: any
    let parseError: string | undefined

    try {
      const jsonMatch = rawOutput.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('LLM не вернул валидный JSON')
      }

      result = JSON.parse(jsonMatch[0])
    } catch (error) {
      parseError = error instanceof Error ? error.message : 'Unknown parsing error'
      console.error('JSON parsing error:', parseError)
      throw error
    }

    return result as UnifiedGenerationResult

  } catch (error) {
    console.error('LLM generation error:', error)
    throw error
  }
}