'use client'

import React from 'react'

export default function PaletteTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Тест системы палитр
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Возможности настройки цветов через LLM
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎨 Анализ LLM для выбора цветов
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Технологический стек:</strong> IT = синие тона, креатив = яркие цвета, финансы = консервативные</li>
                <li>• <strong>Тон компании:</strong> стартап = яркие акценты, корпорация = сдержанные, креативная = необычные</li>
                <li>• <strong>Специфика отрасли:</strong> медицина = зеленые, технологии = синие, финансы = синие/серые</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎯 Индивидуальные цвета для блоков
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-sm"><strong>Hero:</strong> привлекательный, яркий</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-700 rounded"></div>
                    <span className="text-sm"><strong>About:</strong> профессиональный, доверительный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-sm"><strong>Tracks:</strong> технологичный, современный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                    <span className="text-sm"><strong>Geo:</strong> нейтральный, информативный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span className="text-sm"><strong>Facts:</strong> контрастный, читаемый</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm"><strong>Benefits:</strong> теплый, дружелюбный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="text-sm"><strong>Culture:</strong> вдохновляющий, живой</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                    <span className="text-sm"><strong>Media:</strong> динамичный, современный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-teal-600 rounded"></div>
                    <span className="text-sm"><strong>Hiring:</strong> четкий, понятный</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm"><strong>CTA:</strong> призывный, яркий</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔧 Техническая реализация
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// LLM генерирует палитру на основе вакансий
const palette = await generatePalette(vacancyCorpus)

// Применяется через CSS переменные
const paletteStyles = generatePaletteCSS(palette)

// Каждый блок может иметь свои цвета
<div style={{
  backgroundColor: 'var(--hero-bg)',
  color: 'var(--hero-text)'
}}>
  Hero Block
</div>`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📊 Примеры палитр для разных компаний
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">IT-компания</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded"></div>
                      <span className="text-xs">Primary: #2563eb</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded"></div>
                      <span className="text-xs">Accent: #60a5fa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-100 rounded"></div>
                      <span className="text-xs">Background: #ffffff</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">Креативная студия</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-600 rounded"></div>
                      <span className="text-xs">Primary: #8b5cf6</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded"></div>
                      <span className="text-xs">Accent: #a78bfa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-50 rounded"></div>
                      <span className="text-xs">Background: #faf5ff</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Финансовая компания</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                      <span className="text-xs">Primary: #059669</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                      <span className="text-xs">Accent: #10b981</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-50 rounded"></div>
                      <span className="text-xs">Background: #f0fdf4</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Стартап</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-600 rounded"></div>
                      <span className="text-xs">Primary: #ea580c</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-400 rounded"></div>
                      <span className="text-xs">Accent: #fb923c</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-50 rounded"></div>
                      <span className="text-xs">Background: #fff7ed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                ✅ Преимущества системы
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• <strong>Автоматический подбор:</strong> LLM анализирует контент и выбирает подходящие цвета</li>
                <li>• <strong>Гибкая настройка:</strong> каждый блок может иметь свои цвета</li>
                <li>• <strong>Контрастность:</strong> автоматическая проверка читаемости</li>
                <li>• <strong>Брендинг:</strong> учет фирменных цветов компании</li>
                <li>• <strong>Адаптивность:</strong> цвета подстраиваются под специфику отрасли</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}