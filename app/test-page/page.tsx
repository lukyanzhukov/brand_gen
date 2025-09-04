'use client'

import { useState, useEffect } from 'react'
import PageRenderer from '@/components/PageRenderer'
import { PageLayout, BlockCopy, ColorPalette } from '@/lib/types'

export default function TestPage() {
  const [layout, setLayout] = useState<PageLayout | null>(null)
  const [copy, setCopy] = useState<BlockCopy | null>(null)
  const [palette, setPalette] = useState<ColorPalette | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestPage = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/test-page')
        const data = await response.json()
        
        if (data.success) {
          setLayout(data.layout)
          setCopy(data.copy)
          setPalette(data.palette)
        } else {
          setError(data.error || 'Failed to load test page')
        }
      } catch (err) {
        setError('Failed to load test page')
        console.error('Error loading test page:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestPage()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900">Загрузка тестовой страницы...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!layout || !copy || !palette) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Данные не найдены</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Тестовая страница - Все компоненты
            </h1>
            <div className="text-sm text-gray-500">
              Демонстрация всех блоков согласно гайдлайнам
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <PageRenderer
        layout={layout as any}
        copy={copy as any}
        palette={palette}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Тестовая страница завершена</h3>
          <p className="text-gray-400">
            Все компоненты отображаются согласно гайдлайнам
          </p>
        </div>
      </footer>
    </div>
  )
}
