import { NextRequest, NextResponse } from 'next/server'
import { PageLayout, BlockCopy, ColorPalette } from '@/lib/types'

export async function GET() {
  try {
    // Создаем тестовую структуру страницы
    const layout: PageLayout = {
      blocks: [
        { type: 'hero', variant: 'withDirections' },
        { type: 'about', variant: 'withAchievements' },
        { type: 'tracks', variant: 'withStats' },
        { type: 'geo', variant: 'map' },
        { type: 'facts', variant: 'strip5' },
        { type: 'benefits', variant: 'categorized' },
        { type: 'culture', variant: 'withImages' },
        { type: 'media', variant: 'featured' },
        { type: 'hiring', variant: 'detailed' },
        { type: 'cta', variant: 'vacanciesStyle' }
      ]
    }

    // Создаем тестовый контент согласно гайдлайнам
    const copy: BlockCopy = {
      hero: {
        title: "ЛУЧШИЙ РАБОТОДАТЕЛЬ РОССИИ*",
        subtitle: "Банк для умных и свободных",
        buttonText: "Хочу работать с вами",
        slogan: "* По версии HeadHunter за 2024 год",
        directions: [
          {
            title: "IT-специалисты",
            description: "Современные технологии и инновации",
            icon: "💻",
            color: "blue"
          },
          {
            title: "Работа без опыта", 
            description: "Стажировки и обучение",
            icon: "🎓",
            color: "green"
          },
          {
            title: "Дистанционная работа",
            description: "Удаленная работа из любой точки мира",
            icon: "🌍",
            color: "purple"
          }
        ],
        teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
        logoUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop"
      },
      about: {
        title: "ПОЧЕМУ HEADS&HANDS?",
        content: "Мы — команда разработчиков, которая создает цифровые экосистемы для крупного бизнеса. За 13 лет работы мы собрали команду из 200+ специалистов, открыли школы разработки и стали лидерами в России. Наша миссия — создавать новые возможности для лучшей жизни через цифровые технологии. Мы работаем только с крупным бизнесом, создаем проекты полного цикла и используем только современные технологии. Наш подход продуктовый: команда в неизменном составе ведет проект с нуля до релиза.",
        bullets: [
          "Стажировка для начинающих",
          "Гибкий график работы", 
          "Удаленная работа",
          "Гибридный формат",
          "Тестовые задания",
          "Менторство",
          "Карьерный рост"
        ],
        slogan: "БУДУЩЕЕ ПРИНАДЛЕЖИТ ТЕБЕ!",
        achievements: [
          {
            number: "200+",
            label: "Специалистов",
            description: "В команде",
            icon: "👥",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
          },
          {
            number: "13",
            label: "Лет опыта",
            description: "На рынке",
            icon: "🏆",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
          },
          {
            number: "2",
            label: "Место в рейтинге",
            description: "Рунета",
            icon: "🥈",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          },
          {
            number: "50+",
            label: "Клиентов",
            description: "Доверяют нам",
            icon: "🤝",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
          }
        ],
        companyImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        socialLinks: []
      },
      tracks: {
        title: "Наши направления",
        subtitle: "Выберите направление, которое вам ближе всего",
        items: [
          {
            title: "Frontend разработка",
            description: "Создание пользовательских интерфейсов с использованием современных технологий",
            examples: [
              "React Developer",
              "Vue.js Developer", 
              "Angular Developer"
            ],
            icon: "💻",
            color: "blue",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
          },
          {
            title: "Backend разработка",
            description: "Разработка серверной части приложений и API",
            examples: [
              "Node.js Developer",
              "Python Developer",
              "Java Developer"
            ],
            icon: "⚙️",
            color: "green",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
          },
          {
            title: "Мобильная разработка",
            description: "Создание мобильных приложений для iOS и Android",
            examples: [
              "iOS Developer",
              "Android Developer",
              "React Native Developer"
            ],
            icon: "📱",
            color: "purple",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
          },
          {
            title: "DevOps",
            description: "Автоматизация процессов разработки и развертывания",
            examples: [
              "DevOps Engineer",
              "SRE Engineer",
              "Cloud Engineer"
            ],
            icon: "🔧",
            color: "orange",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
          },
          {
            title: "Data Science",
            description: "Анализ данных и машинное обучение",
            examples: [
              "Data Scientist",
              "ML Engineer",
              "Data Analyst"
            ],
            icon: "📊",
            color: "red",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          }
        ],
        stats: {
          totalPositions: "50+",
          averageSalary: "150,000₽",
          growthRate: "+25%"
        }
      },
      geo: {
        title: "География присутствия",
        subtitle: "Присоединяйтесь к нам в любом из наших офисов",
        locations: [
          {
            city: "Санкт-Петербург",
            country: "Россия",
            description: "Головной офис, 150+ сотрудников",
            icon: "🏛️",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
          },
          {
            city: "Москва",
            country: "Россия",
            description: "Представительство, 50+ сотрудников",
            icon: "🏢",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop"
          },
          {
            city: "Новосибирск",
            country: "Россия",
            description: "Филиал, 30+ сотрудников",
            icon: "🌲",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
          },
          {
            city: "Саранск",
            country: "Россия",
            description: "Филиал, 20+ сотрудников",
            icon: "🏘️",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
          },
          {
            city: "Саратов",
            country: "Россия",
            description: "Филиал, 15+ сотрудников",
            icon: "🌊",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          }
        ],
        mapImage: "https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=1200&h=600&fit=crop"
      },
      facts: {
        title: "Значимые факты и цифры",
        subtitle: "Наши достижения говорят сами за себя",
        items: [
          {
            number: "200+",
            description: "Проектов завершено",
            icon: "🚀",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          },
          {
            number: "13",
            description: "Лет на рынке",
            icon: "🏆",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
          },
          {
            number: "50+",
            description: "Клиентов",
            icon: "🤝",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
          },
          {
            number: "2",
            description: "Место в рейтинге",
            icon: "🥈",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          },
          {
            number: "95%",
            description: "Довольных клиентов",
            icon: "😊",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
          }
        ]
      },
      benefits: {
        title: "Преимущества работы в компании",
        subtitle: "Нам важно, чтобы вам было хорошо",
        items: [
          {
            title: "Конкурентная зарплата",
            description: "Выше рынка на 20-30%",
            category: "Финансовые",
            icon: "💰"
          },
          {
            title: "Медицинская страховка",
            description: "Полное покрытие для всей семьи",
            category: "Социальные",
            icon: "🏥"
          },
          {
            title: "Карьерный рост",
            description: "Четкие пути развития",
            category: "Карьерные",
            icon: "📈"
          },
          {
            title: "Обучение",
            description: "Курсы, конференции, сертификации",
            category: "Личностные",
            icon: "🎓"
          },
          {
            title: "Гибкий график",
            description: "Работайте когда удобно",
            category: "Организационные",
            icon: "⏰"
          },
          {
            title: "Удаленная работа",
            description: "Из любой точки мира",
            category: "Организационные",
            icon: "🌍"
          },
          {
            title: "Спортивные мероприятия",
            description: "Корпоративные турниры и активности",
            category: "Социальные",
            icon: "⚽"
          },
          {
            title: "Менторство",
            description: "Помощь опытных коллег",
            category: "Личностные",
            icon: "👨‍🏫"
          }
        ]
      },
      culture: {
        title: "Почему у нас хорошо",
        subtitle: "Мы создаем атмосферу, в которой хочется работать",
        items: [
          {
            title: "Открытость",
            subtitle: "Прозрачность во всем",
            description: "Мы открыто обсуждаем планы, проблемы и достижения. Каждый может высказать свое мнение и быть услышанным.",
            icon: "🔍",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
          },
          {
            title: "Развитие",
            subtitle: "Постоянное обучение",
            description: "Мы инвестируем в развитие каждого сотрудника. Курсы, конференции, менторство — все для вашего роста.",
            icon: "📈",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          },
          {
            title: "Команда",
            subtitle: "Поддержка коллег",
            description: "Мы работаем как одна команда. Помогаем друг другу, делимся опытом и вместе решаем сложные задачи.",
            icon: "👥",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
          },
          {
            title: "Инновации",
            subtitle: "Современные технологии",
            description: "Мы всегда в курсе последних трендов и используем только современные технологии в своих проектах.",
            icon: "🚀",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
          }
        ]
      },
      media: {
        title: "Публикации и материалы",
        subtitle: "Наша экспертиза в статьях и интервью",
        items: [
          {
            title: "Как мы создали цифровую экосистему для Т-банка",
            description: "Рассказываем о технических решениях и вызовах проекта",
            url: "https://habr.com/ru/company/headsandhands/blog/123456",
            type: "Статья",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            speaker: "Алексей Иванов",
            duration: "5 мин"
          },
          {
            title: "Подкаст о будущем мобильной разработки",
            description: "Обсуждаем тренды и технологии в мобильной разработке",
            url: "https://podcast.ru/episode/123",
            type: "Подкаст",
            thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
            speaker: "Мария Петрова",
            duration: "45 мин"
          },
          {
            title: "Интервью с CTO о масштабировании команды",
            description: "Как мы выросли с 10 до 200+ разработчиков",
            url: "https://youtube.com/watch?v=123",
            type: "Видео",
            thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
            speaker: "Дмитрий Сидоров",
            duration: "15 мин"
          },
          {
            title: "Веб-семинар по архитектуре микросервисов",
            description: "Практические советы по проектированию распределенных систем",
            url: "https://webinar.ru/event/456",
            type: "Веб-семинар",
            thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
            speaker: "Анна Козлова",
            duration: "60 мин"
          }
        ]
      },
      hiring: {
        title: "Как попасть в команду",
        subtitle: "Простой и понятный процесс найма",
        steps: [
          {
            title: "Отправьте резюме",
            description: "Заполните форму или отправьте резюме на почту",
            duration: "1-2 дня",
            details: [
              "Прикрепите портфолио",
              "Укажите желаемую позицию",
              "Расскажите о себе"
            ],
            icon: "📝",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
          },
          {
            title: "Техническое собеседование",
            description: "Обсудим ваши навыки и опыт",
            duration: "1 неделя",
            details: [
              "Технические вопросы",
              "Обсуждение проектов",
              "Вопросы о мотивации"
            ],
            icon: "💻",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
          },
          {
            title: "Тестовое задание",
            description: "Небольшое практическое задание",
            duration: "3-5 дней",
            details: [
              "Выберите задачу по душе",
              "Используйте любые технологии",
              "Покажите свой подход"
            ],
            icon: "📋",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
          },
          {
            title: "Финальное собеседование",
            description: "Встреча с командой и обсуждение условий",
            duration: "2-3 недели",
            details: [
              "Знакомство с командой",
              "Обсуждение зарплаты",
              "Планы на развитие"
            ],
            icon: "🤝",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
          }
        ]
      },
      cta: {
        title: "Присоединяйтесь к нам!",
        subtitle: "Станьте частью команды, которая создает будущее",
        buttonText: "Смотреть вакансии",
        categories: [
          {
            title: "Frontend",
            description: "React, Vue, Angular"
          },
          {
            title: "Backend",
            description: "Node.js, Python, Java"
          },
          {
            title: "Mobile",
            description: "iOS, Android, React Native"
          },
          {
            title: "DevOps",
            description: "AWS, Docker, Kubernetes"
          }
        ],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
      }
    }

    // Создаем тестовую палитру
    const palette: ColorPalette = {
      primary: "#1E3A8A",
      onPrimary: "#FFFFFF",
      secondary: "#06B6D4",
      onSecondary: "#1E3A8A",
      background: "#F3F4F6",
      surface: "#FFFFFF",
      onBackground: "#374151",
      onSurface: "#374151",
      accent: "#10B981",
      onAccent: "#FFFFFF",
      error: "#EF4444",
      onError: "#FFFFFF",
      outline: "#9CA3AF",
      blocks: {
        hero: { primary: "#1E3A8A", secondary: "#06B6D4" },
        about: { primary: "#059669", secondary: "#10B981" },
        tracks: { primary: "#7C3AED", secondary: "#A855F7" },
        geo: { primary: "#DC2626", secondary: "#EF4444" },
        facts: { primary: "#EA580C", secondary: "#F97316" },
        benefits: { primary: "#0891B2", secondary: "#06B6D4" },
        culture: { primary: "#BE185D", secondary: "#EC4899" },
        media: { primary: "#7C2D12", secondary: "#EA580C" },
        hiring: { primary: "#1F2937", secondary: "#374151" },
        cta: { primary: "#DC2626", secondary: "#EF4444" }
      }
    }

    return NextResponse.json({
      success: true,
      layout,
      copy,
      palette
    })

  } catch (error) {
    console.error('Test page generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate test page' },
      { status: 500 }
    )
  }
}
