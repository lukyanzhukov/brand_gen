'use client'

import React, { useState } from 'react'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { AboutBlock } from '@/components/blocks/AboutBlock'
import { TracksBlock } from '@/components/blocks/TracksBlock'
import { GeoBlock } from '@/components/blocks/GeoBlock'
import { FactsBlock } from '@/components/blocks/FactsBlock'
import { BenefitsBlock } from '@/components/blocks/BenefitsBlock'
import { CultureBlock } from '@/components/blocks/CultureBlock'
import { MediaBlock } from '@/components/blocks/MediaBlock'
import { HiringBlock } from '@/components/blocks/HiringBlock'
import { CTABlock } from '@/components/blocks/CTABlock'

export default function DemoPage() {
  const [selectedCompany, setSelectedCompany] = useState('yandex')

  const companies = {
    yandex: {
      name: 'Яндекс',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      palette: {
        primary: '#1976d2',
        onPrimary: '#ffffff',
        secondary: '#424242',
        onSecondary: '#ffffff',
        background: '#ffffff',
        surface: '#f5f5f5',
        onBackground: '#212121',
        onSurface: '#757575',
        accent: '#ff9800',
        onAccent: '#ffffff',
        error: '#f44336',
        onError: '#ffffff',
        outline: '#e0e0e0',
        hero: {
          background: '#1976d2',
          text: '#ffffff',
          accent: '#42a5f5'
        },
        cta: {
          background: '#ff9800',
          text: '#ffffff',
          accent: '#ffffff'
        }
      }
    },
    sber: {
      name: 'Сбер',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      palette: {
        primary: '#4caf50',
        onPrimary: '#ffffff',
        secondary: '#424242',
        onSecondary: '#ffffff',
        background: '#ffffff',
        surface: '#f1f8e9',
        onBackground: '#1b5e20',
        onSurface: '#388e3c',
        accent: '#8bc34a',
        onAccent: '#ffffff',
        error: '#f44336',
        onError: '#ffffff',
        outline: '#c8e6c9',
        hero: {
          background: '#388e3c',
          text: '#ffffff',
          accent: '#66bb6a'
        },
        cta: {
          background: '#4caf50',
          text: '#ffffff',
          accent: '#ffffff'
        }
      }
    },
    tinkoff: {
      name: 'Тинькофф',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      palette: {
        primary: '#e91e63',
        onPrimary: '#ffffff',
        secondary: '#424242',
        onSecondary: '#ffffff',
        background: '#ffffff',
        surface: '#fce4ec',
        onBackground: '#880e4f',
        onSurface: '#ad1457',
        accent: '#f06292',
        onAccent: '#ffffff',
        error: '#f44336',
        onError: '#ffffff',
        outline: '#f8bbd9',
        hero: {
          background: '#e91e63',
          text: '#ffffff',
          accent: '#f48fb1'
        },
        cta: {
          background: '#e91e63',
          text: '#ffffff',
          accent: '#ffffff'
        }
      }
    },
    vk: {
      name: 'VK',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      palette: {
        primary: '#2196f3',
        onPrimary: '#ffffff',
        secondary: '#424242',
        onSecondary: '#ffffff',
        background: '#ffffff',
        surface: '#e3f2fd',
        onBackground: '#0d47a1',
        onSurface: '#1976d2',
        accent: '#64b5f6',
        onAccent: '#ffffff',
        error: '#f44336',
        onError: '#ffffff',
        outline: '#bbdefb',
        hero: {
          background: '#1976d2',
          text: '#ffffff',
          accent: '#42a5f5'
        },
        cta: {
          background: '#2196f3',
          text: '#ffffff',
          accent: '#ffffff'
        }
      }
    }
  }

  const currentCompany = companies[selectedCompany as keyof typeof companies]

  const paletteStyles = {
    '--primary': currentCompany.palette.primary,
    '--primary-foreground': currentCompany.palette.onPrimary,
    '--secondary': currentCompany.palette.secondary,
    '--secondary-foreground': currentCompany.palette.onSecondary,
    '--background': currentCompany.palette.background,
    '--surface': currentCompany.palette.surface,
    '--foreground': currentCompany.palette.onBackground,
    '--muted-foreground': currentCompany.palette.onSurface,
    '--accent': currentCompany.palette.accent,
    '--accent-foreground': currentCompany.palette.onAccent,
    '--destructive': currentCompany.palette.error,
    '--destructive-foreground': currentCompany.palette.onError,
    '--border': currentCompany.palette.outline,
    '--input': currentCompany.palette.outline,
    '--ring': currentCompany.palette.primary,
    '--hero-bg': currentCompany.palette.hero.background,
    '--hero-text': currentCompany.palette.hero.text,
    '--hero-accent': currentCompany.palette.hero.accent,
    '--cta-bg': currentCompany.palette.cta.background,
    '--cta-text': currentCompany.palette.cta.text,
    '--cta-accent': currentCompany.palette.cta.accent
  } as React.CSSProperties

  return (
    <div style={paletteStyles}>
      {/* Hero Block */}
      <HeroBlock
        title={`Работа в ${currentCompany.name}`}
        subtitle="Присоединяйтесь к команде лидеров технологий"
        cta="Посмотреть вакансии"
        directions={[
          {
            title: "Разработка",
            description: "Frontend, Backend, Mobile",
            icon: "💻",
            color: "blue"
          },
          {
            title: "Данные",
            description: "ML, Analytics, AI",
            icon: "📊",
            color: "green"
          },
          {
            title: "Продукт",
            description: "PM, Design, UX",
            icon: "🎨",
            color: "purple"
          }
        ]}
        variant="withDirections"
        teamImage={currentCompany.logo}
      />

      {/* About Block */}
      <AboutBlock
        title="О компании"
        content={`${currentCompany.name} — одна из ведущих технологических компаний России, которая создает продукты и сервисы для миллионов пользователей. Мы развиваем инновационные решения в области IT, финтеха и цифровых технологий.`}
        bullets={[
          "20+ лет на рынке",
          "10,000+ сотрудников",
          "100+ продуктов",
          "50+ стран"
        ]}
        variant="withAchievements"
        slogan="Технологии будущего уже сегодня"
        achievements={[
          {
            number: "№1",
            label: "В рейтинге IT-компаний",
            description: "По версии Forbes 2023"
          },
          {
            number: "99%",
            label: "Довольных клиентов",
            description: "Высокое качество сервиса"
          },
          {
            number: "24/7",
            label: "Поддержка",
            description: "Круглосуточная помощь"
          }
        ]}
        socialLinks={[
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/company/example",
            icon: "💼"
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/example",
            icon: "🐦"
          }
        ]}
        companyImage={currentCompany.logo}
      />

      {/* Tracks Block */}
      <TracksBlock
        title="Направления работы"
        subtitle="Выберите интересующее вас направление"
        items={[
          {
            title: "Frontend разработка",
            description: "React, Vue.js, Angular, TypeScript",
            examples: ["React", "Vue.js", "Angular"],
            icon: "💻",
            color: "blue"
          },
          {
            title: "Backend разработка",
            description: "Node.js, Python, Java, Go",
            examples: ["Node.js", "Python", "Java"],
            icon: "⚙️",
            color: "green"
          },
          {
            title: "Data Science",
            description: "ML, AI, Analytics, Big Data",
            examples: ["TensorFlow", "PyTorch", "Pandas"],
            icon: "📊",
            color: "purple"
          }
        ]}
        variant="withStats"
        stats={{
          total: "10,000+",
          label: "Сотрудников",
          description: "В команде"
        }}
      />

      {/* Facts Block */}
      <FactsBlock
        title="Наши достижения"
        subtitle="Цифры, которые говорят сами за себя"
        items={[
          {
            number: "№1*",
            label: "Среди IT-компаний России",
            description: "По данным независимых исследований",
            icon: "🏆"
          },
          {
            number: "50M+",
            label: "Ежемесячная аудитория",
            description: "Пользователей в месяц",
            icon: "📈"
          },
          {
            number: "№3**",
            label: "В списке Forbes",
            description: "Самые дорогие IT-компании",
            icon: "bottom-left"
          }
        ]}
        variant="strip5"
      />

      {/* Benefits Block */}
      <BenefitsBlock
        title="Нам важно, чтобы вам было хорошо —"
        subtitle="не только в рабочие часы. Поэтому мы заботимся и о том, что происходит за пределами задач и встреч"
        items={[
          {
            title: "ДМС с первого месяца",
            description: "Полное медицинское страхование",
            category: "social",
            icon: "umbrella"
          },
          {
            title: "Всё для роста и развития",
            description: "Обучение, конференции, менторство",
            category: "career",
            icon: "trophy"
          },
          {
            title: "Спорт",
            description: "Корпоративные спортивные мероприятия",
            category: "personal",
            icon: "sport"
          },
          {
            title: "И ещё",
            description: "Дополнительные бонусы и льготы",
            category: "organizational",
            icon: "more"
          }
        ]}
        variant="categories"
      />

      {/* CTA Block */}
      <CTABlock
        title="Вакансии"
        subtitle="Найдите подходящую позицию в нашей команде"
        buttonText="Смотреть вакансии"
        buttonUrl="https://hh.ru/employer/123456"
        categories={[
          {
            title: "IT-специалисты",
            description: "Разработка, тестирование, DevOps",
            buttonText: "Смотреть вакансии",
            buttonUrl: "#"
          },
          {
            title: "Маркетинг, дизайн, PR",
            description: "Креативные и коммуникационные роли",
            buttonText: "Смотреть вакансии",
            buttonUrl: "#"
          },
          {
            title: "Продажи",
            description: "B2B и B2C продажи",
            buttonText: "Смотреть вакансии",
            buttonUrl: "#"
          },
          {
            title: "HR, финансы, юриспруденция",
            description: "Поддержка и администрирование",
            buttonText: "Смотреть вакансии",
            buttonUrl: "#"
          }
        ]}
        variant="withCategories"
      />

      {/* Company Selector */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Выберите компанию:</h3>
        <div className="space-y-2">
          {Object.entries(companies).map(([key, company]) => (
            <button
              key={key}
              onClick={() => setSelectedCompany(key)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedCompany === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
