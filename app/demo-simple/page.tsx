'use client'

import React, { useState } from 'react'

export default function DemoSimplePage() {
  const [url, setUrl] = useState('https://hh.ru/employer/1504670')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch('/api/test-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Test failed')
      }

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Простой тест получения данных
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL компании на hh.ru
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://hh.ru/employer/123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleTest}
                disabled={isLoading || !url}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Тестируем...' : 'Получить данные компании'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              <strong>Ошибка:</strong> {error}
            </div>
          )}

          {data && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Данные компании: {data.employer}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Логотип:</h3>
                  <img 
                    src={data.logoUrl} 
                    alt="Логотип компании" 
                    className="mt-2 h-16 w-auto"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Описание компании:</h3>
                  <p className="mt-2 text-gray-600 whitespace-pre-line">
                    {data.companyCorpus}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Описание вакансий:</h3>
                  <p className="mt-2 text-gray-600 whitespace-pre-line">
                    {data.vacancyCorpus}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/generate"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              ← Вернуться к генератору
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
