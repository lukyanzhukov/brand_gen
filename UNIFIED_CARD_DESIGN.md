# Единый дизайн карточек - Обновление

## 🎨 Основные изменения

### 1. Единый стиль всех блоков
- **Главная карточка:** Градиентный фон с rounded-3xl
- **Внутренние карточки:** Белые с полупрозрачным фоном
- **Фон страницы:** Серый (bg-gray-50)
- **Отступы:** py-16 px-4 для секций

### 2. Структура каждого блока
```
<section className="py-16 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Main Card */}
    <div className="bg-gradient-to-br from-[color]-500 to-[color]-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-white/90 font-semibold mb-8">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inner Cards */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Card Content */}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 🎯 Цветовая схема блоков

### Градиенты главных карточек
- **HeroBlock:** from-red-500 to-orange-500
- **AboutBlock:** from-blue-500 to-purple-500
- **TracksBlock:** from-indigo-500 to-blue-500
- **FactsBlock:** from-emerald-500 to-green-500
- **BenefitsBlock:** from-amber-500 to-orange-500
- **CultureBlock:** from-slate-500 to-gray-500
- **MediaBlock:** from-sky-500 to-blue-500
- **HiringBlock:** from-violet-500 to-purple-500
- **GeoBlock:** from-red-500 to-pink-500
- **CTABlock:** from-slate-500 to-gray-500

### Внутренние карточки
- **Фон:** bg-white/95 backdrop-blur-sm
- **Тени:** shadow-lg hover:shadow-xl
- **Скругления:** rounded-3xl
- **Hover-эффекты:** transform hover:-translate-y-2

## 📱 Адаптивность

### Сетки
- **Мобильные:** grid-cols-1
- **Планшеты:** grid-cols-2
- **Десктоп:** grid-cols-3

### Отступы
- **Секции:** py-16 px-4
- **Главные карточки:** p-12
- **Внутренние карточки:** p-6
- **Контейнеры:** max-w-7xl mx-auto

## 🚀 Результат

Теперь все блоки имеют единый стиль:
- ✅ Главная карточка с градиентным фоном
- ✅ Внутренние карточки с полупрозрачным фоном
- ✅ Единообразные тени и скругления
- ✅ Hover-эффекты
- ✅ Адаптивный дизайн
- ✅ Фоновые декоративные элементы

## 🔗 Тестирование

Откройте http://localhost:3000/test-page для просмотра обновленного дизайна.
