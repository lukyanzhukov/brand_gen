import { PageLayout, PageBlock } from './layout'
import { BlockCopy } from './copy'
import { ColorPalette } from './palette'

export interface UnifiedGenerationResult {
  layout: PageLayout
  copy: BlockCopy
}

export async function generateUnifiedContentTest(
  companyData: any,
  colorPalette: ColorPalette
): Promise<UnifiedGenerationResult> {
  // Тестовая версия без LLM - используем реальные данные компании
  console.log('Using TEST unified content generation with real company data...')
  console.log('Company data:', JSON.stringify(companyData, null, 2))
  console.log('Color palette:', JSON.stringify(colorPalette, null, 2))
  const layout: PageLayout = {
    blocks: [
      {
        type: 'hero',
        variant: 'withDirections',
        props: {
          title: companyData.name || 'Heads&Hands',
          subtitle: 'Создаем будущее вместе',
          description: companyData.description || 'Мы - команда профессионалов, которая стремится к инновациям и качеству в каждой детали нашей работы.',
          buttonText: 'Присоединиться',
          buttonUrl: '#',
          logoUrl: companyData.logoUrl || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=100&fit=crop',
          directions: [
            { name: 'Разработка', color: colorPalette?.primary || '#2563eb', icon: 'code' },
            { name: 'Дизайн', color: colorPalette?.secondary || '#64748b', icon: 'palette' },
            { name: 'Маркетинг', color: colorPalette?.accent || '#f59e0b', icon: 'trending-up' }
          ]
        }
      },
      {
        type: 'about',
        variant: 'withValues',
        props: {
          title: 'О компании',
          description: companyData.description || 'Мы создаем инновационные решения, которые помогают нашим клиентам достигать новых высот в бизнесе.',
          values: [
            'Инновации в каждой детали',
            'Качество превыше всего',
            'Команда профессионалов',
            'Клиентоориентированность'
          ]
        }
      },
      {
        type: 'tracks',
        variant: 'withExamples',
        props: {
          title: 'Направления',
          description: 'Мы работаем в различных областях, создавая комплексные решения для наших клиентов.',
          tracks: [
            {
              name: 'Веб-разработка',
              description: 'Создание современных веб-приложений',
              examples: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
              icon: 'code'
            },
            {
              name: 'Мобильная разработка',
              description: 'Разработка мобильных приложений для iOS и Android',
              examples: ['iOS Developer', 'Android Developer', 'React Native Developer'],
              icon: 'smartphone'
            },
            {
              name: 'UI/UX дизайн',
              description: 'Создание пользовательских интерфейсов',
              examples: ['UI Designer', 'UX Designer', 'Product Designer'],
              icon: 'palette'
            }
          ]
        }
      },
      {
        type: 'geo',
        variant: 'withMap',
        props: {
          title: 'География',
          description: 'Мы представлены в крупнейших городах России и СНГ.',
          cities: ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Казань']
        }
      },
      {
        type: 'facts',
        variant: 'strip3',
        props: {
          title: 'Цифры',
          description: 'Наши достижения говорят сами за себя.',
          facts: [
            { number: '500+', text: 'Проектов завершено' },
            { number: '50+', text: 'Клиентов довольны' },
            { number: '5', text: 'Лет на рынке' }
          ]
        }
      },
      {
        type: 'benefits',
        variant: 'withIcons',
        props: {
          title: 'Преимущества',
          description: 'Мы заботимся о наших сотрудниках и создаем комфортные условия для работы.',
          benefits: [
            'Конкурентная зарплата',
            'Гибкий график работы',
            'Медицинское страхование',
            'Обучение и развитие',
            'Современный офис',
            'Команда профессионалов'
          ]
        }
      },
      {
        type: 'culture',
        variant: 'withValues',
        props: {
          title: 'Культура',
          description: 'Наша корпоративная культура основана на принципах открытости и взаимопомощи.',
          values: [
            'Открытое общение',
            'Взаимопомощь в команде',
            'Постоянное обучение',
            'Инновационный подход'
          ]
        }
      },
      {
        type: 'media',
        variant: 'withArticles',
        props: {
          title: 'Медиа',
          description: 'Следите за нашими новостями и публикациями.',
          items: [
            { title: 'Как мы создаем продукты', type: 'article' },
            { title: 'Подкаст о технологиях', type: 'podcast' },
            { title: 'Кейс успешного проекта', type: 'article' }
          ]
        }
      },
      {
        type: 'hiring',
        variant: 'withSteps',
        props: {
          title: 'Как попасть в команду',
          description: 'Простой и понятный процесс найма.',
          steps: [
            'Отправьте резюме',
            'Пройдите собеседование',
            'Выполните тестовое задание',
            'Получите предложение'
          ]
        }
      },
      {
        type: 'cta',
        variant: 'withForm',
        props: {
          title: 'Присоединяйтесь к нам!',
          description: 'Станьте частью команды, которая создает будущее.',
          buttonText: 'Посмотреть вакансии',
          buttonUrl: '#'
        }
      }
    ]
  }

  const copy: BlockCopy = {
    hero: {
      title: companyData.name || 'Heads&Hands',
      subtitle: 'Создаем будущее вместе',
      description: 'Мы - команда профессионалов, которая стремится к инновациям и качеству в каждой детали нашей работы.',
      buttonText: 'Присоединиться',
      buttonUrl: '#',
      directions: [
        { name: 'Разработка', color: colorPalette?.primary || '#2563eb' },
        { name: 'Дизайн', color: colorPalette?.secondary || '#64748b' },
        { name: 'Маркетинг', color: colorPalette?.accent || '#f59e0b' }
      ]
    },
    about: {
      title: 'О компании',
      description: 'Мы создаем инновационные решения, которые помогают нашим клиентам достигать новых высот в бизнесе.',
      values: [
        'Инновации в каждой детали',
        'Качество превыше всего',
        'Команда профессионалов',
        'Клиентоориентированность'
      ]
    },
    tracks: {
      title: 'Направления',
      description: 'Мы работаем в различных областях, создавая комплексные решения для наших клиентов.',
      tracks: [
        {
          name: 'Веб-разработка',
          description: 'Создание современных веб-приложений',
          examples: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer']
        },
        {
          name: 'Мобильная разработка',
          description: 'Разработка мобильных приложений для iOS и Android',
          examples: ['iOS Developer', 'Android Developer', 'React Native Developer']
        },
        {
          name: 'UI/UX дизайн',
          description: 'Создание пользовательских интерфейсов',
          examples: ['UI Designer', 'UX Designer', 'Product Designer']
        }
      ]
    },
    geo: {
      title: 'География',
      description: 'Мы представлены в крупнейших городах России и СНГ.',
      cities: ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Казань']
    },
    facts: {
      title: 'Цифры',
      description: 'Наши достижения говорят сами за себя.',
      facts: [
        { number: '500+', text: 'Проектов завершено' },
        { number: '50+', text: 'Клиентов довольны' },
        { number: '5', text: 'Лет на рынке' }
      ]
    },
    benefits: {
      title: 'Преимущества',
      description: 'Мы заботимся о наших сотрудниках и создаем комфортные условия для работы.',
      benefits: [
        'Конкурентная зарплата',
        'Гибкий график работы',
        'Медицинское страхование',
        'Обучение и развитие',
        'Современный офис',
        'Команда профессионалов'
      ]
    },
    culture: {
      title: 'Культура',
      description: 'Наша корпоративная культура основана на принципах открытости и взаимопомощи.',
      values: [
        'Открытое общение',
        'Взаимопомощь в команде',
        'Постоянное обучение',
        'Инновационный подход'
      ]
    },
    media: {
      title: 'Медиа',
      description: 'Следите за нашими новостями и публикациями.',
      items: [
        { title: 'Как мы создаем продукты', type: 'article' },
        { title: 'Подкаст о технологиях', type: 'podcast' },
        { title: 'Кейс успешного проекта', type: 'article' }
      ]
    },
    hiring: {
      title: 'Как попасть в команду',
      description: 'Простой и понятный процесс найма.',
      steps: [
        'Отправьте резюме',
        'Пройдите собеседование',
        'Выполните тестовое задание',
        'Получите предложение'
      ]
    },
    cta: {
      title: 'Присоединяйтесь к нам!',
      description: 'Станьте частью команды, которая создает будущее.',
      buttonText: 'Посмотреть вакансии',
      buttonUrl: '#'
    }
  }

  return { layout, copy }
}
