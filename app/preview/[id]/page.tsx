'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageRenderer } from '@/components/PageRenderer'

// TODO: Уточнить типы после получения скринов
interface PageVariant {
  id: string
  layout: any
  copy: any
  palette: any
  validation: any
  metadata: {
    companyName: string
    logoUrl?: string
    generatedAt: string
  }
}

export default function PreviewPage() {
  const params = useParams()
  const [variant, setVariant] = useState<PageVariant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadVariant = async () => {
      try {
        // В реальном приложении здесь был бы API для получения варианта по ID
        // Пока что используем localStorage для демонстрации
        const storedVariants = localStorage.getItem('generatedVariants')
        if (storedVariants) {
          const variants = JSON.parse(storedVariants)
          const foundVariant = variants.find((v: PageVariant) => v.id === params.id)
          if (foundVariant) {
            setVariant(foundVariant)
          } else {
            setError('Вариант не найден')
          }
        } else {
          setError('Вариант не найден')
        }
      } catch (err) {
        setError('Ошибка при загрузке варианта')
      } finally {
        setLoading(false)
      }
    }

    loadVariant()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем превью...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    )
  }

  if (!variant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Вариант не найден</h1>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Панель диагностики */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {variant.metadata.companyName}
            </span>
            <span className="text-xs text-gray-500">
              {variant.id} • {variant.layout.blocks.length} блоков
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              variant.validation.isValid 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {variant.validation.isValid ? '✓ Валидно' : '✗ Ошибки'}
            </span>
          </div>
          <a
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Назад
          </a>
        </div>
      </div>

      {/* Рендер страницы */}
      <PageRenderer
        layout={variant.layout}
        copy={variant.copy}
        palette={variant.palette}
        logoUrl={variant.metadata.logoUrl}
      />

      {/* Ошибки валидации */}
      {!variant.validation.isValid && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-sm font-medium text-red-800 mb-2">Ошибки валидации:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {variant.validation.errors.map((error: string, index: number) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
