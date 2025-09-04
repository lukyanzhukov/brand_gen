'use client'

import React from 'react'
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

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Block - withDirections */}
      <HeroBlock
        title="Технологии будущего уже сегодня"
        subtitle="Создаем инновационные решения для миллионов пользователей"
        cta="Присоединиться к команде"
        directions={[
          {
            title: "Искусственный интеллект",
            description: "Разработка ML-моделей и нейросетей",
            icon: "🤖",
            color: "blue"
          },
          {
            title: "Мобильная разработка",
            description: "iOS и Android приложения",
            icon: "📱",
            color: "green"
          },
          {
            title: "Веб-платформы",
            description: "Современные веб-приложения",
            icon: "🌐",
            color: "purple"
          }
        ]}
        variant="withDirections"
        logoUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      />

      {/* About Block - hiltiStyle */}
      <AboutBlock
        title="О компании"
        content="Мы — ведущая IT-компания, которая уже более 10 лет создает инновационные решения для бизнеса и пользователей. Наша команда из 500+ специалистов работает над проектами, которые меняют мир."
        bullets={[
          "10+ лет на рынке",
          "500+ сотрудников",
          "1000+ проектов",
          "50+ стран"
        ]}
        variant="withAchievements"
        slogan="Инновации. Качество. Результат."
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
        companyImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop"
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
        // logoUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      />

      {/* Tracks Block - yandexStyle */}
      <TracksBlock
        title="Направления работы"
        subtitle="Выберите интересующее вас направление"
        items={[
          {
            title: "Frontend разработка",
            description: "Создание пользовательских интерфейсов",
            examples: ["React", "Vue.js", "Angular"],
            // hasArrow: true,
            // isSpecial: false
          },
          {
            title: "Backend разработка",
            description: "Серверная разработка и API",
            examples: ["Node.js", "Python", "Java"],
            // hasArrow: true,
            // isSpecial: true
          },
          {
            title: "DevOps",
            description: "Автоматизация и инфраструктура",
            examples: ["Docker", "Kubernetes", "AWS"],
            // hasArrow: false,
            // isSpecial: false
          }
        ]}
        variant="withStats"
        stats={{
          total: "500+",
          label: "Сервисов",
          description: "В команде"
        }}
      />

      {/* Geo Block - mapStyle */}
      <GeoBlock
        title="География присутствия"
        subtitle="Мы работаем по всему миру"
        locations={[
          {
            city: "Москва",
            country: "Россия",
            // type: "Головной офис",
            description: "Основной офис компании",
            // highlighted: true,
            // coordinates: { x: 50, y: 30 }
          },
          {
            city: "Санкт-Петербург",
            country: "Россия",
            // type: "Филиал",
            description: "Разработка и поддержка",
            // highlighted: false,
            // coordinates: { x: 45, y: 25 }
          },
          {
            city: "Новосибирск",
            country: "Россия",
            // type: "Филиал",
            description: "Региональный офис",
            // highlighted: false,
            // coordinates: { x: 60, y: 20 }
          }
        ]}
        variant="withMap"
        mapImage="https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=800&h=400&fit=crop"
      />

      {/* Facts Block - avitoStyle */}
      <FactsBlock
        title="Активно растём"
        subtitle="Наши достижения и показатели"
        items={[
          {
            number: "№1*",
            label: "Среди IT-компаний России",
            description: "По данным независимых исследований",
            icon: "🏆"
          },
          {
            number: "72 млн",
            label: "Ежемесячная аудитория",
            description: "Пользователей в месяц",
            icon: "📈"
          },
          {
            number: "№4**",
            label: "В списке Forbes",
            description: "Самые дорогие IT-компании",
            icon: "🥈"
          }
        ]}
        variant="strip5"
      />

      {/* Benefits Block - wellbeingStyle */}
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

      {/* Culture Block - valuesStyle */}
      <CultureBlock
        title="Почему у нас хорошо"
        subtitle="Мы создаем условия для профессионального роста и личного развития"
        items={[
          {
            title: "Помогаем миллионам",
            description: "Каждый день вы будете помогать миллионам людей решать самые разные задачи",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop"
          },
          {
            title: "Стремимся к большему",
            description: "Если ответственность вас бодрит, а амбициозные цели вдохновляют — вам у нас понравится",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop"
          }
        ]}
        variant="withImages"
      />

      {/* Media Block - videoStyle */}
      <MediaBlock
        title="Вместе мы создаём технологии и продукты, которые делают жизнь проще и интереснее"
        subtitle="Познакомьтесь с нашими проектами и командой"
        items={[
          {
            title: "Как приложениями пользуются незрячие люди?",
            description: "Узнайте о доступности технологий",
            url: "https://example.com/video1",
            type: "video",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
            // speaker: "Анатолий Попко",
            // duration: "5:30"
          },
          {
            title: "Как нейросети переводят видео в прямом эфире?",
            description: "Технологии машинного обучения в действии",
            url: "https://example.com/video2",
            type: "video",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
            // speaker: "Сергей Корбан",
            // duration: "7:15"
          }
        ]}
        variant="withImages"
      />

      {/* Hiring Block - verticalStyle */}
      <HiringBlock
        title="Как попасть в команду"
        subtitle="Простой и понятный процесс найма"
        items={[
          {
            title: "Отправьте резюме",
            description: "Заполните форму или отправьте резюме на почту",
            duration: "1-2 дня"
          },
          {
            title: "Техническое собеседование",
            description: "Обсудим ваши навыки и опыт",
            duration: "1 неделя"
          },
          {
            title: "Тестовое задание",
            description: "Небольшое практическое задание",
            duration: "3-5 дней"
          },
          {
            title: "Финальное собеседование",
            description: "Встреча с командой и обсуждение условий",
            duration: "2-3 недели"
          }
        ]}
        variant="withDetails"
      />

      {/* CTA Block - vacanciesStyle */}
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
    </div>
  )
}