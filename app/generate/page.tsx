'use client'

import { useState } from 'react'
import PageRenderer from '@/components/PageRenderer'

export default function GeneratePage() {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Введите URL компании')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)
    setShowPreview(false)

    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          variants: 1
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка генерации')
      }

      setResult(data)
      setShowPreview(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleOpenInNewTab = () => {
    if (result?.variants?.[0]) {
      const variant = result.variants[0]
      const previewData = {
        layout: variant.layout,
        copy: variant.copy,
        palette: variant.palette,
        metadata: variant.metadata
      }
      
      // Сохраняем данные в localStorage для новой вкладки
      localStorage.setItem('previewData', JSON.stringify(previewData))
      
      // Открываем новую вкладку
      window.open('/preview', '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Генератор бренд-страниц
          </h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                URL компании на hh.ru
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://hh.ru/employer/123456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isGenerating}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !url.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Генерация...' : 'Сгенерировать страницу'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 mb-4">Страница успешно сгенерирована!</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {showPreview ? 'Скрыть превью' : 'Показать превью'}
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Открыть в новой вкладке
                    </button>
                  </div>
                </div>

                {showPreview && result.variants?.[0] && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b">
                      <h3 className="font-medium text-gray-700">Превью сгенерированной страницы</h3>
                    </div>
                    <div className="max-h-96 overflow-auto">
                      <PageRenderer
                        layout={result.variants[0].layout}
                        copy={result.variants[0].copy}
                        palette={result.variants[0].palette}
                        // metadata={result.variants[0].metadata}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}