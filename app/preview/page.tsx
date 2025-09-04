'use client'

import { useState, useEffect } from 'react'
import PageRenderer from '@/components/PageRenderer'

export default function PreviewPage() {
  const [previewData, setPreviewData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получаем данные из localStorage
    const data = localStorage.getItem('previewData')
    if (data) {
      try {
        setPreviewData(JSON.parse(data))
      } catch (error) {
        console.error('Error parsing preview data:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка превью...</p>
        </div>
      </div>
    )
  }

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Превью недоступно</h1>
          <p className="text-gray-600 mb-4">Данные для превью не найдены</p>
          <a 
            href="/generate" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к генератору
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Превью: {previewData.metadata?.companyName || 'Сгенерированная страница'}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Печать
            </button>
            <a
              href="/generate"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Новый генератор
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <PageRenderer
          layout={previewData.layout}
          copy={previewData.copy}
          palette={previewData.palette}
          // metadata={previewData.metadata}
        />
      </div>
    </div>
  )
}
