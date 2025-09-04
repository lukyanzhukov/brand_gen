import React from 'react'

interface HiringItem {
  title: string
  description: string
  duration?: string
  icon?: string
  image?: string
}

interface HiringBlockProps {
  title: string
  subtitle?: string
  items: HiringItem[]
  variant: string
}

export function HiringBlock({ title, subtitle, items = [], variant }: HiringBlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.length > 0 ? items.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {/* Отправьте резюме - карандаш с документом */}
                    {item.title.includes('Отправьте резюме') && (
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        <path d="M12,11L10,13H14L12,11Z"/>
                        <path d="M16,8L20,12L16,16L12,12L16,8Z"/>
                      </svg>
                    )}
                    {/* Техническое собеседование - ноутбук */}
                    {item.title.includes('Техническое собеседование') && (
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
                      </svg>
                    )}
                    {/* Тестовое задание - планшет/клипборд */}
                    {item.title.includes('Тестовое задание') && (
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M2,5V19H22V5H2M4,7H20V9H4V7M4,11H20V13H4V11M4,15H16V17H4V15Z"/>
                      </svg>
                    )}
                    {/* Финальное собеседование - рукопожатие */}
                    {item.title.includes('Финальное собеседование') && (
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-2">
                    {item.description}
                  </p>
                  {item.duration && (
                    <p className="text-gray-500 text-sm mb-4">
                      {item.duration}
                    </p>
                  )}
                  {/* Добавляем стоковые изображения для каждого этапа */}
                  <div className="w-full h-32 relative mb-4">
                    {item.title.includes('Отправьте резюме') && (
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop&crop=center"
                          alt="Resume submission"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <p className="text-sm text-gray-800 font-medium">My Resume</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.title.includes('Техническое собеседование') && (
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center"
                          alt="Technical interview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <p className="text-sm text-gray-800 font-medium">Interview</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.title.includes('Тестовое задание') && (
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center"
                          alt="Test task"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <p className="text-sm text-gray-800 font-medium">Test Task</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.title.includes('Финальное собеседование') && (
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop&crop=center"
                          alt="Team meeting"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <p className="text-sm text-gray-800 font-medium">Team Meeting</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center text-white">
                <p className="text-lg">Загрузка данных...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}