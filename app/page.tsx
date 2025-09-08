'use client'

import React, { useState } from 'react'
import { Info, Sparkles, Zap, Target } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Введите URL компании')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

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
    } catch (err) {
      console.error('Generation error:', err)
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
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* BrandGen Image */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <img 
              src="/brandgen-banner.png" 
              alt="BrandGen - this is the BrandGen" 
              className="max-w-full h-auto rounded-[2rem] shadow-2xl"
              style={{ maxHeight: '350px' }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 
              className="text-4xl font-bold text-gray-900 mb-4 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={() => setShowInfo(!showInfo)}
              title="Нажми для получения информации"
            >
              Забрендируй свою компанию
            </h1>
            <p className="text-gray-600 text-lg">
              Просто вставь ссылку на страницу компании в hh.ru
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  Ссылка на страницу компании в hh.ru
                </label>
                <div
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 cursor-pointer inline-block"
                  title="Как это работает?"
                >
                  <Info className="w-5 h-5" />
                </div>
              </div>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://hh.ru/employer/123456"
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 text-lg"
                disabled={isGenerating}
              />
            </div>

            {/* Info Panel */}
            {showInfo && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-gray-900 font-bold text-xl mb-6 flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span>Как работает BrandGen?</span>
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Анализ компании</p>
                      <p className="text-sm">Изучаем профиль работодателя на hh.ru, собираем ключевые данные о вакансиях, логотипе, описании и корпоративной культуре.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Генерация палитры</p>
                      <p className="text-sm">С помощью AI создаём уникальную цветовую схему, основанную на фирменном стиле компании, и подбираем гармоничные оттенки.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Создание контента</p>
                      <p className="text-sm">Создаём привлекательные тексты, которые раскрывают компанию, её ценности и преимущества для кандидатов.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Сборка страницы</p>
                      <p className="text-sm">Формируем готовую бренд-страницу с современным дизайном, идеально адаптированную под любые устройства.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-xl border border-blue-100">
                    <p className="text-sm text-gray-600">
                      <strong>Результат:</strong> Стильная и функциональная бренд-страница, которая помогает привлечь лучших кандидатов и выгодно выделиться среди конкурентов.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-red-600 hover:via-red-700 hover:to-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Создаем...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Забрендировать компанию</span>
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-green-800 font-bold text-lg">Бренд-страница готова!</p>
                      <p className="text-green-700 text-sm">Твоя компания теперь выглядит круто</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-300"
                    >
                      {showPreview ? 'Скрыть детали' : 'Показать детали'}
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                      🚀 Открыть страницу
                    </button>
                  </div>
                </div>

                {showPreview && result.variants?.[0] && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-white px-6 py-4 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Детали сгенерированной страницы</span>
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-auto p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div className="space-y-2">
                          <p><span className="font-bold text-gray-900">Блоков:</span> {result.variants[0].layout.blocks.length}</p>
                          <p><span className="font-bold text-gray-900">Компания:</span> {result.variants[0].metadata?.companyName || 'Не указано'}</p>
                          <p><span className="font-bold text-gray-900">Статус:</span> 
                            <span className={`ml-2 ${result.variants[0].validation?.isValid ? 'text-green-600' : 'text-red-600'}`}>
                              {result.variants[0].validation?.isValid ? '✅ Валидна' : '❌ Ошибки'}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p><span className="font-bold text-gray-900">Цветовая схема:</span> {result.variants[0].palette?.primary ? '✅ Сгенерирована' : '❌ Не создана'}</p>
                          <p><span className="font-bold text-gray-900">Контент:</span> {result.variants[0].copy ? '✅ Готов' : '❌ Не создан'}</p>
                          <p><span className="font-bold text-gray-900">Логотип:</span> {result.variants[0].metadata?.logoUrl ? '✅ Загружен' : '❌ Не найден'}</p>
                        </div>
                      </div>
                      {result.variants[0].validation?.errors && result.variants[0].validation.errors.length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-red-800 font-bold mb-2">Ошибки валидации:</p>
                          <ul className="list-disc list-inside text-red-700 space-y-1">
                            {result.variants[0].validation.errors.map((error: string, index: number) => (
                              <li key={index} className="text-sm">{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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