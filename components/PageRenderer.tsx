import React from 'react'
import { PageLayout } from '@/lib/layout'
import { BlockCopy } from '@/lib/copy'
import { ColorPalette, generatePaletteCSS } from '@/lib/palette'
import { HeroBlock } from './blocks/HeroBlock'
import { AboutBlock } from './blocks/AboutBlock'
import { TracksBlock } from './blocks/TracksBlock'
import { GeoBlock } from './blocks/GeoBlock'
import { FactsBlock } from './blocks/FactsBlock'
import { BenefitsBlock } from './blocks/BenefitsBlock'
import { CultureBlock } from './blocks/CultureBlock'
import { MediaBlock } from './blocks/MediaBlock'
import { HiringBlock } from './blocks/HiringBlock'
import { CTABlock } from './blocks/CTABlock'

// TODO: Уточнить типы после получения скринов
interface PageRendererProps {
  layout: PageLayout
  copy: BlockCopy
  palette?: ColorPalette
  logoUrl?: string
}

export function PageRenderer({ layout, copy, palette, logoUrl }: PageRendererProps) {
  // Применяем палитру через CSS переменные
  const paletteStyles = generatePaletteCSS(palette) as React.CSSProperties

  const renderBlock = (block: any, index: number) => {
    try {
      const blockCopy = copy[block.type] || {}
      const key = `${block.type}-${index}`

    switch (block.type) {
      case 'hero':
        return (
          <div key={key} className="mb-8">
            <HeroBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle || ''}
              cta={blockCopy.buttonText || block.props?.buttonText || ''}
              directions={blockCopy.directions || block.props?.directions || []}
              logoUrl={logoUrl || block.props?.logoUrl}
              variant={block.variant}
              slogan={blockCopy.slogan || block.props?.slogan}
              teamImage={blockCopy.teamImage || block.props?.teamImage}
            />
          </div>
        )

      case 'about':
        // Преобразуем achievements из массива строк в массив объектов
        const achievements = blockCopy.achievements || block.props?.achievements || []
        const formattedAchievements = Array.isArray(achievements) && achievements.length > 0 && typeof achievements[0] === 'string'
          ? achievements.map((achievement, index) => {
              // Извлекаем число из начала строки
              const match = achievement.match(/^(\d+[+\-]?)/)
              const number = match ? match[1] : `${index + 1}`
              
              // Подбираем изображение в зависимости от содержания
              let image = ''
              if (achievement.includes('специалист') || achievement.includes('команда')) {
                image = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop&crop=center'
              } else if (achievement.includes('лет') || achievement.includes('опыт')) {
                image = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center'
              } else if (achievement.includes('место') || achievement.includes('рейтинг')) {
                image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center'
              } else {
                // Дефолтное изображение
                image = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center'
              }
              
              // Создаем короткий лейбл из достижения
              let shortLabel = achievement
              if (achievement.includes('специалист')) {
                shortLabel = 'Специалистов'
              } else if (achievement.includes('лет')) {
                shortLabel = 'Лет опыта'
              } else if (achievement.includes('место')) {
                shortLabel = 'Место в рейтинге'
              }
              
              return {
                number,
                label: shortLabel,
                description: achievement,
                image
              }
            })
          : achievements

        return (
          <div key={key} className="mb-8">
            <AboutBlock
              title={blockCopy.title || block.props?.title || ''}
              content={blockCopy.description || blockCopy.content || block.props?.content || block.props?.description || ''}
              bullets={blockCopy.bullets || block.props?.bullets}
              variant={block.variant}
              slogan={blockCopy.slogan || block.props?.slogan}
              achievements={formattedAchievements}
              companyImage={blockCopy.companyImage || block.props?.companyImage}
              socialLinks={blockCopy.socialLinks || block.props?.socialLinks}
            />
          </div>
        )

      case 'tracks':
        return (
          <div key={key} className="mb-8">
            <TracksBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              items={blockCopy.tracks || blockCopy.items || block.props?.items || block.props?.tracks || []}
              variant={block.variant}
              stats={blockCopy.stats || block.props?.stats}
            />
          </div>
        )

      case 'geo':
        return (
          <div key={key} className="mb-8">
            <GeoBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              locations={(blockCopy.locations || block.props?.locations || []).map((loc: any) => ({
                city: loc.city || loc.name || '',
                country: loc.country || 'Россия',
                description: loc.type || loc.description || ''
              }))}
              variant={block.variant}
              mapImage={blockCopy.mapImage || block.props?.mapImage}
            />
          </div>
        )

      case 'facts':
        return (
          <div key={key} className="mb-8">
            <FactsBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              items={(blockCopy.facts || blockCopy.items || block.props?.items || block.props?.facts || []).map((fact: any) => ({
                number: fact.value || fact.number || '',
                label: fact.label || '',
                description: fact.description || ''
              }))}
              variant={block.variant}
            />
          </div>
        )

      case 'benefits':
        return (
          <div key={key} className="mb-8">
            <BenefitsBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              items={blockCopy.benefits ? [
                {
                  title: 'Конкурентная зарплата',
                  description: 'Выше рынка на 20-30%',
                  category: 'financial',
                  icon: '💰'
                },
                {
                  title: 'Медицинская страховка',
                  description: 'Полное покрытие для всей семьи',
                  category: 'social',
                  icon: '🏥'
                },
                {
                  title: 'Карьерный рост',
                  description: 'Четкие пути развития',
                  category: 'career',
                  icon: '📈'
                },
                {
                  title: 'Обучение',
                  description: 'Курсы, конференции, сертификации',
                  category: 'career',
                  icon: '🎓'
                },
                {
                  title: 'Гибкий график',
                  description: 'Работайте когда удобно',
                  category: 'social',
                  icon: '⏰'
                },
                {
                  title: 'Удаленная работа',
                  description: 'Из любой точки мира',
                  category: 'social',
                  icon: '🌍'
                },
                {
                  title: 'Спортивные мероприятия',
                  description: 'Корпоративные турниры и активности',
                  category: 'social',
                  icon: '⚽'
                },
                {
                  title: 'Менторство',
                  description: 'Помощь опытных коллег',
                  category: 'career',
                  icon: '👨‍🏫'
                }
              ] : (blockCopy.benefits || blockCopy.items || block.props?.items || block.props?.benefits || []).map((benefit: any) => ({
                title: benefit.title || '',
                description: benefit.description || '',
                category: benefit.category || 'career' as const
              }))}
              variant={block.variant}
            />
          </div>
        )

      case 'culture':
        return (
          <div key={key} className="mb-8">
            <CultureBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              items={blockCopy.culture ? [{
                title: 'Корпоративная культура',
                description: blockCopy.culture,
                icon: '🏢'
              }] : (blockCopy.items || block.props?.items || [])}
              variant={block.variant}
            />
          </div>
        )

      case 'media':
        return (
          <div key={key} className="mb-8">
            <MediaBlock
              title={blockCopy.title || block.props?.title || ''}
              subtitle={blockCopy.subtitle || block.props?.subtitle}
              items={(blockCopy.articles || blockCopy.items || block.props?.items || block.props?.articles || []).map((article: any) => ({
                title: article.title || '',
                description: article.description || '',
                url: article.url || '#',
                type: article.type || 'article' as const
              }))}
              variant={block.variant}
            />
          </div>
        )

      case 'hiring':
        return (
          <div key={key} className="mb-8">
            <HiringBlock
              title={blockCopy.title || block.props?.title || 'Как попасть в команду'}
              subtitle={blockCopy.subtitle || block.props?.subtitle || 'Простой и понятный процесс найма'}
              items={blockCopy.items || block.props?.items || [
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
              ]}
              variant={block.variant}
            />
          </div>
        )

      case 'cta':
        return (
          <div key={key} className="mb-8">
            <CTABlock
              title={blockCopy.title || block.props?.title || ''}
              description={blockCopy.description || blockCopy.subtitle || block.props?.subtitle || ''}
              buttonText={blockCopy.buttonText || block.props?.buttonText || ''}
              buttonUrl={blockCopy.buttonUrl || block.props?.buttonUrl || '#'}
              variant={block.variant}
            />
          </div>
        )

      default:
        console.warn(`Unknown block type: ${block.type}`)
        return null
    }
    } catch (error) {
      console.error(`Error rendering block ${block.type}:`, error)
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Ошибка рендеринга блока</h3>
          <p>Тип блока: {block.type}</p>
          <p>Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>
        </div>
      )
    }
  }

  try {
    return (
      <div style={paletteStyles} className="min-h-screen" style={{...paletteStyles, backgroundColor: 'var(--background)'}}>
        <div className="max-w-7xl mx-auto py-8">
          {layout.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering page:', error)
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Ошибка рендеринга страницы</h2>
          <p className="text-gray-700 mb-4">
            Произошла ошибка при отображении страницы. Проверьте консоль браузера для подробностей.
          </p>
          <details className="text-sm text-gray-600">
            <summary className="cursor-pointer">Подробности ошибки</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </pre>
          </details>
        </div>
      </div>
    )
  }
}

export default PageRenderer
