import { CompanyData } from './normalize'
import { generateJsonContent } from './llm-server'

// TODO: Уточнить типы после получения скринов
export interface ExtractedContent {
  hero: {
    title: string
    subtitle: string
    cta: string
    directions?: Array<{
      title: string
      description: string
      icon?: string
      color?: string
    }>
    slogan?: string
    teamImage?: string
  }
  about: {
    title: string
    content: string
    highlights: string[]
    slogan?: string
    achievements?: Array<{
      number: string
      label: string
      description?: string
      image?: string
      icon?: string
    }>
    companyImage?: string
    socialLinks?: Array<{
      platform: string
      url: string
      icon: string
    }>
  }
  tracks: {
    title: string
    subtitle?: string
    items: Array<{
      name: string
      description?: string
      examples: string[]
      hasArrow?: boolean
      isSpecial?: boolean
    }>
    stats?: {
      employees: string
      services: string
      users: string
    }
  }
  geo: {
    title: string
    subtitle?: string
    locations: Array<{
      name: string
      type: string
      description?: string
      highlighted?: boolean
      coordinates?: {
        x: number
        y: number
      }
    }>
    mapImage?: string
  }
  facts: {
    title?: string
    subtitle?: string
    items: Array<{
      number: string
      label: string
      description?: string
      rank?: string
      chart?: {
        type: 'line' | 'bar' | 'pie'
        data: Array<{
          label: string
          value: number
          color?: string
        }>
        growth?: string
      }
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-middle' | 'bottom-right'
    }>
  }
  benefits: {
    title: string
    subtitle?: string
    items: Array<{
      title: string
      description?: string
      category?: string
      icon?: string
    }>
  }
  culture: {
    title: string
    subtitle?: string
    items: Array<{
      title: string
      subtitle?: string
      description: string
      image?: string
      video?: {
        thumbnail: string
        title: string
        duration?: string
      }
    }>
  }
  media: {
    title: string
    subtitle?: string
    items: Array<{
      title: string
      description?: string
      url: string
      type: 'article' | 'video' | 'podcast' | 'social'
      thumbnail?: string
      speaker?: string
      duration?: string
      chat?: {
        title: string
        message: string
        time: string
        avatar: string
      }
    }>
  }
  hiring: {
    title: string
    subtitle?: string
    steps: Array<{
      step: number
      title: string
      description: string
      timeframe?: string
      details?: string[]
      action?: {
        text: string
        url: string
      }
      color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
    }>
  }
  cta: {
    title: string
    subtitle?: string
    buttonText: string
    buttonUrl?: string
    categories?: Array<{
      title: string
      description?: string
      url?: string
    }>
    image?: string
    logo?: string
  }
}

/**
 * Извлекает контент для всех блоков из нормализованных данных
 */
export async function extractContent(data: CompanyData): Promise<ExtractedContent> {
  const systemPrompt = `Ты - эксперт по анализу вакансий и созданию контента для бренд-страниц работодателей. 

Твоя задача - извлечь максимально богатый и детальный контент из данных о компании и вакансиях для создания привлекательной бренд-страницы.

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

## КРИТИЧЕСКИ ВАЖНО
1. **ВСЕГДА заполняй ВСЕ поля** - не оставляй пустых значений
2. **Генерируй реалистичные данные** если исходных недостаточно
3. **Используй конкретные цифры** вместо общих фраз
4. **Добавляй эмоциональную окраску** в тексты
5. **Создавай призывы к действию** в каждом блоке
6. **Подбирай релевантные изображения** для каждого контента
7. **Соблюдай указанную длину** текстов
8. **Используй правильные категории** и типы данных

СТРУКТУРА КОНТЕНТА:

HERO (обязательно):
- title: привлекательный заголовок с названием компании (3-6 слов)
- subtitle: эмоциональный подзаголовок о миссии/ценностях (8-15 слов)
- cta: призыв к действию (2-4 слова)
- slogan: короткий слоган компании (5-12 слов)
- directions: 3-4 направления работы с описаниями, иконками, цветами
- teamImage: URL изображения команды

ABOUT (обязательно):
- title: "ПОЧЕМУ [НАЗВАНИЕ КОМПАНИИ]?" (3-8 слов)
- content: подробное описание компании (150-250 слов)
- highlights: 5-7 ключевых преимуществ (2-6 слов каждое)
- slogan: мотивирующий слоган (5-12 слов)
- achievements: 3-5 достижений с цифрами, описаниями, иконками, изображениями
- companyImage: URL изображения офиса/компании

TRACKS (обязательно):
- title: "Наши направления" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: 4-6 направлений с названиями, описаниями, примерами вакансий, иконками, цветами
- stats: статистика (общее количество позиций, средняя зарплата, рост)

GEO (обязательно):
- title: "География присутствия" (2-4 слова)
- subtitle: призыв присоединиться (8-15 слов)
- locations: 4-6 городов с названиями, описаниями, иконками, изображениями
- mapImage: URL карты

FACTS (обязательно):
- title: "Значимые факты и цифры" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: 4-6 фактов с цифрами, описаниями, иконками, изображениями

BENEFITS (обязательно):
- title: "Преимущества работы в компании" (2-4 слова)
- subtitle: "Нам важно, чтобы вам было хорошо" (8-15 слов)
- items: 6-8 преимуществ с названиями, описаниями, категориями, иконками

CULTURE (обязательно):
- title: "Почему у нас хорошо" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: 3-4 пункта о корпоративной культуре с названиями, подзаголовками, описаниями, изображениями

MEDIA (обязательно):
- title: "Публикации и материалы" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- items: 3-4 медиаматериала с названиями, описаниями, URL, типами, превью, спикерами, длительностью

HIRING (обязательно):
- title: "Как попасть в команду" (2-4 слова)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- steps: 3-4 шага с названиями, описаниями, временными рамками, деталями, иконками, изображениями

CTA (обязательно):
- title: "Присоединяйтесь к нам!" (3-6 слов)
- subtitle: мотивирующий подзаголовок (8-15 слов)
- buttonText: призыв к действию (2-4 слова)
- categories: категории вакансий с названиями, описаниями, кнопками
- image: URL изображения

Верни JSON объект с полями: hero, about, tracks, geo, facts, benefits, culture, media, hiring, cta.`

  const userPrompt = `Компания: ${data.name}
Описание компании: ${data.companyCorpus}

Вакансии и требования: ${data.vacancyCorpus}

Отрасли: ${data.industries.join(', ')}
Ключевые навыки: ${data.keySkills.join(', ')}
Преимущества: ${data.perks.join(', ')}
Регион: ${data.area || 'Не указан'}

Извлеки контент для всех блоков, основываясь на этих данных.`

  const fallback: ExtractedContent = {
    hero: {
      title: data.name,
      subtitle: 'Мы ищем талантливых специалистов для создания инновационных решений',
      cta: 'Присоединиться к команде',
      slogan: 'Инновации. Качество. Развитие.',
      directions: data.industries.slice(0, 4).map((industry, index) => ({
        title: industry,
        description: `Передовые технологии в сфере ${industry}`,
        icon: ['code', 'design', 'analytics', 'mobile'][index] || 'code',
        color: ['blue', 'green', 'purple', 'orange'][index] || 'blue'
      })),
      teamImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
    },
    about: {
      title: 'ПОЧЕМУ ' + data.name.toUpperCase() + '?',
      content: data.description || 'Мы — команда профессионалов, создающая инновационные решения для бизнеса. Наша миссия — помогать компаниям расти и развиваться с помощью современных технологий.',
      highlights: data.perks.slice(0, 5) || [
        'Конкурентная зарплата',
        'Гибкий график работы', 
        'Профессиональное развитие',
        'Современные технологии',
        'Дружная команда'
      ],
      slogan: 'БУДУЩЕЕ ПРИНАДЛЕЖИТ ТЕБЕ!',
      achievements: [
        {
          number: '75+',
          label: 'Лет на рынке',
          description: 'Опыт и надежность',
          icon: '🏗️'
        },
        {
          number: '32,000',
          label: 'Сотрудников по всему миру',
          description: 'Глобальная команда профессионалов',
          icon: '👥'
        },
        {
          number: '100+',
          label: 'Стран присутствия',
          description: 'Международный масштаб деятельности',
          icon: '🌍'
        }
      ],
      socialLinks: [
        {
          platform: 'VK',
          url: '#',
          icon: 'VK'
        }
      ]
    },
    tracks: {
      title: 'Направления работы',
      subtitle: 'Выберите направление, которое вам интересно',
      items: [
        {
          name: 'Разработка',
          description: 'Создание современных веб-приложений и мобильных решений',
          examples: ['Frontend Developer', 'Backend Developer', 'Full-stack Developer', 'Mobile Developer', 'DevOps Engineer'],
          // icon: 'code',
          // color: 'blue'
        },
        {
          name: 'Аналитика',
          description: 'Анализ данных и принятие решений на основе метрик',
          examples: ['Data Analyst', 'Business Analyst', 'Product Analyst', 'Marketing Analyst', 'BI Developer'],
          // icon: 'chart',
          // color: 'green'
        },
        {
          name: 'Дизайн',
          description: 'Создание пользовательских интерфейсов и опыта',
          examples: ['UI/UX Designer', 'Product Designer', 'Graphic Designer', 'Motion Designer', 'Design System Lead'],
          // icon: 'design',
          // color: 'purple'
        },
        {
          name: 'Менеджмент',
          description: 'Управление проектами и продуктами',
          examples: ['Product Manager', 'Project Manager', 'Scrum Master', 'Team Lead', 'Engineering Manager'],
          // icon: 'users',
          // color: 'orange'
        }
      ],
      stats: {
        employees: '50+',
        services: '150,000₽',
        users: '+25%'
      }
    },
    geo: {
      title: 'Присоединяйтесь к нашей команде в любой точке России!',
      locations: [
        {
          name: 'Северо-Запад',
          type: 'Офис',
          description: 'Санкт-Петербург и регионы',
          coordinates: { x: 15, y: 25 }
        },
        {
          name: 'Центр',
          type: 'Офис',
          description: 'Москва и Центральный регион',
          coordinates: { x: 35, y: 30 },
          highlighted: true
        },
        {
          name: 'Юг',
          type: 'Офис',
          description: 'Южные регионы России',
          coordinates: { x: 25, y: 60 }
        },
        {
          name: 'Поволжье',
          type: 'Офис',
          description: 'Волжский регион',
          coordinates: { x: 45, y: 35 }
        },
        {
          name: 'Урал',
          type: 'Офис',
          description: 'Уральский регион',
          coordinates: { x: 55, y: 30 }
        },
        {
          name: 'Сибирь',
          type: 'Офис',
          description: 'Сибирский регион',
          coordinates: { x: 65, y: 40 },
          highlighted: true
        },
        {
          name: 'Дальний Восток',
          type: 'Офис',
          description: 'Дальневосточный регион',
          coordinates: { x: 85, y: 35 }
        }
      ]
    },
    facts: {
      title: 'Активно растём',
      items: [
        {
          number: '№1*',
          label: 'Среди сайтов объявлений в мире',
          description: 'По данным независимых исследований',
          position: 'top-left'
        },
        {
          number: '72 млн',
          label: 'Ежемесячная аудитория',
          description: 'Пользователей в месяц',
          chart: {
            type: 'line',
            data: [
              { label: 'март 2022', value: 55.9 },
              { label: 'июнь 2022', value: 58.2 },
              { label: 'сент 2022', value: 61.5 },
              { label: 'дек 2022', value: 65.8 },
              { label: 'март 2023', value: 72.0 }
            ],
            growth: '+11% за год'
          },
          position: 'top-right'
        },
        {
          number: '№4**',
          label: 'В списке самых дорогих интернет-компаний России по версии Forbes',
          description: 'Рейтинг Forbes 2023',
          position: 'bottom-left'
        },
        {
          number: '10 сделок',
          label: 'Совершается каждую секунду',
          description: 'Средний показатель активности',
          position: 'bottom-middle'
        },
        {
          number: '240 млн',
          label: 'Активных объявлений',
          description: 'На платформе',
          position: 'bottom-right'
        }
      ]
    },
    benefits: {
      title: 'Нам важно, чтобы вам было хорошо —',
      subtitle: 'не только в рабочие часы. Поэтому мы заботимся и о том, что происходит за пределами задач и встреч',
      items: [
        {
          title: 'ДМС с первого месяца',
          description: 'Полное медицинское страхование',
          category: 'Здоровье',
          icon: 'umbrella'
        },
        {
          title: 'Всё для роста и развития',
          description: 'Обучение, конференции, менторство',
          category: 'Карьера',
          icon: 'trophy'
        },
        {
          title: 'Спорт',
          description: 'Корпоративные спортивные мероприятия',
          category: 'Активность',
          icon: 'sport'
        },
        {
          title: 'И ещё',
          description: 'Дополнительные бонусы и льготы',
          category: 'Прочее',
          icon: 'more'
        }
      ]
    },
    culture: {
      title: 'Почему у нас хорошо',
      subtitle: 'Мы создаем условия для профессионального роста и личного развития',
      items: [
        {
          title: 'Помогаем миллионам',
          subtitle: 'Создаём инструменты для пользователей по всей стране',
          description: 'Каждый день вы будете помогать миллионам людей решать самые разные задачи',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop'
        },
        {
          title: 'Стремимся к большему',
          subtitle: 'Ставим амбициозные цели и даём возможность их добиваться',
          description: 'Если ответственность вас бодрит, а амбициозные цели вдохновляют — вам у нас понравится',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop'
        }
      ]
    },
    media: {
      title: 'Вместе мы создаём технологии и продукты, которые делают жизнь проще и интереснее',
      subtitle: 'Познакомьтесь с нашими проектами и командой',
      items: [
        {
          title: 'Как приложениями пользуются незрячие люди?',
          description: 'Узнайте о доступности технологий',
          url: 'https://example.com/video1',
          type: 'video',
          thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
          speaker: 'Анатолий Попко',
          duration: '5:30'
        },
        {
          title: 'Как нейросети переводят видео в прямом эфире?',
          description: 'Технологии машинного обучения в действии',
          url: 'https://example.com/video2',
          type: 'video',
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
          speaker: 'Сергей Корбан',
          duration: '7:15'
        }
      ]
    },
    hiring: {
      title: 'Как попасть в нашу Команду',
      subtitle: 'Простой и понятный процесс найма',
      steps: [
        {
          step: 1,
          title: 'Отклик',
          description: 'Откликнитесь на вакансии направления',
          timeframe: 'до 23 июня',
          details: ['Далее — HR-собеседование'],
          action: {
            text: 'Подать заявку',
            url: 'https://hh.ru/employer/123456'
          },
          color: 'blue'
        },
        {
          step: 2,
          title: 'Отбор',
          description: 'Число этапов интервью и испытания зависят от вакансии',
          timeframe: 'через 1-5 дней после отклика',
          details: ['2-3 технических интервью'],
          color: 'green'
        },
        {
          step: 3,
          title: 'Оформление',
          description: 'Подпишите договор и другие документы',
          timeframe: 'в течение 1-3 недель',
          details: ['Получите оффер!'],
          color: 'yellow'
        }
      ]
    },
    cta: {
      title: 'Вакансии',
      subtitle: 'Найдите подходящую позицию в нашей команде',
      buttonText: 'Смотреть вакансии',
      buttonUrl: 'https://hh.ru/employer/123456',
      categories: [
        {
          title: 'IT-специалисты',
          description: 'Разработка, тестирование, DevOps'
        },
        {
          title: 'Маркетинг, дизайн, PR',
          description: 'Креативные и коммуникационные роли'
        },
        {
          title: 'Продажи',
          description: 'B2B и B2C продажи'
        },
        {
          title: 'HR, финансы, юриспруденция',
          description: 'Поддержка и администрирование'
        }
      ]
    }
  }

  return await generateJsonContent(systemPrompt, userPrompt, fallback)
}
