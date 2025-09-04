import OpenAI from 'openai'
import { PageLayout } from './layout'
import { BlockCopy } from './copy'
import { ExtractedContent } from './extract'
import { ColorPalette } from './palette'

export interface UnifiedGenerationResult {
  layout: PageLayout
  copy: BlockCopy
}

const openai = new OpenAI({
  baseURL: 'https://llmgtw.hhdev.ru/proxy/openai',
  apiKey: process.env.OPENAI_API_KEY || '81e71e36-ad00-4e86-93e3-81a459b39328'
})

export async function generateUnifiedContent(
  companyData: any,
  colorPalette?: ColorPalette
): Promise<UnifiedGenerationResult> {
  console.log('=== USING REAL LLM GENERATION ===')
  console.log('Company data:', JSON.stringify(companyData, null, 2))
  console.log('Color palette:', JSON.stringify(colorPalette, null, 2))
  
  try {
    const systemPrompt = `Создай бренд-страницу работодателя. ОБЯЗАТЕЛЬНО включи ВСЕ 10 блоков в этом порядке:

1. hero - главный блок с логотипом и направлениями
2. about - о компании
3. tracks - направления работы
4. geo - география
5. facts - цифры и факты
6. benefits - преимущества работы
7. culture - корпоративная культура
8. media - статьи и медиа
9. hiring - как попасть в команду
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
      "buttonText": "Посмотреть вакансии",
      "directions": [
        {"title": "Разработка супераппов", "description": "Создаем мобильные приложения нового поколения", "icon": "📱"},
        {"title": "Цифровые экосистемы", "description": "Интегрированные решения для крупного бизнеса", "icon": "🌐"},
        {"title": "Полный цикл разработки", "description": "От идеи до запуска и поддержки", "icon": "⚡"}
      ]
    },
    "about": {
      "title": "О компании",
      "description": "Heads&Hands — лидер в разработке цифровых экосистем для крупного бизнеса. Мы работаем с такими гигантами, как Т-банк, LaModa и Спортмастер, создавая приложения, которые вы используете каждый день.",
      "achievements": [
        "2 место в Рейтинге Рунета среди разработчиков для крупного бизнеса",
        "200+ специалистов в команде",
        "13 лет успешной работы на рынке"
      ]
    },
    "tracks": {
      "title": "Направления работы",
      "tracks": [
        {"title": "Мобильная и веб-разработка", "description": "iOS, Android, React Native, Flutter"},
        {"title": "Аналитика и тестирование", "description": "Data Science, QA, Performance Testing"},
        {"title": "UX/UI дизайн", "description": "User Experience, Interface Design, Prototyping"}
      ]
    },
    "geo": {
      "title": "География",
      "locations": [
        {"city": "Санкт-Петербург", "type": "Главный офис"},
        {"city": "Новосибирск", "type": "Филиал"},
        {"city": "Саранск", "type": "Филиал"},
        {"city": "Саратов", "type": "Филиал"}
      ]
    },
    "facts": {
      "title": "Цифры и факты",
      "facts": [
        {"value": "1.5-3 года", "label": "Средняя длительность проектов"},
        {"value": "50+", "label": "Успешных проектов"},
        {"value": "100%", "label": "Работа только с крупным бизнесом"}
      ]
    },
    "benefits": {
      "title": "Преимущества работы",
      "benefits": [
        {"title": "Современные технологии", "description": "Работа с последним стеком технологий"},
        {"title": "Качественные проекты", "description": "Отсутствие легаси-проектов"},
        {"title": "Стабильность", "description": "Стабильные и долгосрочные проекты"}
      ]
    },
    "culture": {
      "title": "Корпоративная культура",
      "culture": "Мы ценим стабильность и глубокое погружение в проекты. Команда ведет проект с нуля до релиза без смены состава, что позволяет достигать высочайшего качества."
    },
    "media": {
      "title": "Статьи и медиа",
      "articles": [
        {"title": "Как мы создаем супераппы для Т-банка", "url": "#"},
        {"title": "Инновационные подходы Heads&Hands в разработке", "url": "#"},
        {"title": "Интервью с основателем компании", "url": "#"}
      ]
    },
    "hiring": {
      "title": "Как попасть в команду",
      "process": "Мы ищем талантливых специалистов, готовых работать с крупными проектами. Наш процесс отбора включает собеседования и тестовые задания. Присоединяйтесь к лидерам разработки в России!"
    },
    "cta": {
      "title": "Присоединяйтесь к нам",
      "description": "Хотите стать частью команды, создающей будущее цифровых технологий? Ознакомьтесь с нашими вакансиями и подайте заявку!",
      "buttonText": "Посмотреть вакансии",
      "buttonUrl": "https://hh.ru/employer/1439083"
    }
  }
}

ВАЖНО: 
- ВСЕ данные должны быть в объекте "copy", а не в "props"
- В hero блоке логотип должен быть в props.logoUrl
- Все массивы должны содержать 3-5 элементов
- Все тексты должны быть информативными и интересными
- Используй реальные данные компании`

    const userPrompt = `Компания: ${companyData.name || 'Heads&Hands'}
Описание: ${companyData.companyCorpus || 'Нет данных о компании'}
Логотип: ${companyData.logoUrl || 'Нет логотипа'}

Создай JSON с 10 блоками для бренд-страницы. Используй данные компании.

ВАЖНО: В hero блоке логотип должен быть в props.logoUrl, а не в props.logo!`

    console.log('=== SENDING TO LLM ===')
    console.log('System prompt length:', systemPrompt.length)
    console.log('User prompt length:', userPrompt.length)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 8000
    })

    const rawOutput = completion.choices[0]?.message?.content || '{}'
    console.log('=== RAW LLM OUTPUT ===')
    console.log('Raw output length:', rawOutput.length)
    console.log('Raw output:', rawOutput)
    console.log('=== END RAW OUTPUT ===')

    // Парсим JSON ответ
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('LLM не вернул валидный JSON')
    }

    const result = JSON.parse(jsonMatch[0])
    console.log('=== PARSED RESULT ===')
    console.log(JSON.stringify(result, null, 2))
    console.log('=== END PARSED RESULT ===')

    // Выводим количество блоков для проверки
    const blockCount = result.layout?.blocks?.length || 0
    console.log('=== BLOCK COUNT CHECK ===')
    console.log('Blocks count:', blockCount)

    return result as UnifiedGenerationResult

  } catch (error) {
    console.error('=== LLM GENERATION ERROR ===')
    console.error('Error:', error)
    console.error('=== END ERROR ===')
    
    throw error
  }
}