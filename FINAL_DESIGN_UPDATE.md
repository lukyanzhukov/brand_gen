# Финальное обновление дизайна

## 🎨 Основные изменения

### 1. Заголовки вне карточек
- **Все блоки** теперь имеют заголовки вне главных карточек
- **Структура:** Заголовок → Главная карточка → Внутренние карточки
- **Стиль:** text-4xl lg:text-5xl font-bold text-gray-900

### 2. Добавлены картинки
- **Все блоки** теперь поддерживают изображения
- **TracksBlock:** Картинки для каждого направления
- **HiringBlock:** Картинки для каждого шага
- **GeoBlock:** Картинки для каждого города
- **Остальные блоки:** Картинки для элементов

### 3. Улучшен блок "Как попасть в команду"
- **Более подробное описание** каждого шага
- **Добавлены детали** для каждого этапа
- **Картинки** для визуализации процесса
- **Временные рамки** для каждого шага

### 4. Исправлен блок "Наши направления"
- **Убрана пустая карточка** - теперь только 4 направления
- **Добавлены картинки** для каждого направления
- **Исправлены названия** с `name` на `title`

### 5. Добавлена география в "География присутствия"
- **Картинки городов** для визуализации
- **Иконки локаций** для каждого города
- **Описания** для каждого местоположения

## 🎯 Структура блоков

### Заголовки вне карточек
```tsx
{/* Header outside card */}
<div className="text-center mb-12">
  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
    {title}
  </h2>
  {subtitle && (
    <p className="text-xl text-gray-600 font-semibold">
      {subtitle}
    </p>
  )}
</div>
```

### Главные карточки
```tsx
{/* Main Card */}
<div className="bg-gradient-to-br from-[color]-500 to-[color]-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-8">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
    <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
  </div>

  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Внутренние карточки
```tsx
<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
  {/* Card Content */}
  {item.image && (
    <div className="mt-4 w-full h-24 relative">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover rounded-2xl"
      />
    </div>
  )}
</div>
```

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

Теперь все блоки выглядят современно и единообразно:
- ✅ Заголовки вне карточек
- ✅ Картинки во всех блоках
- ✅ Подробный блок "Как попасть в команду"
- ✅ Исправлен блок "Наши направления"
- ✅ Добавлена география
- ✅ Единообразный дизайн

## 🔗 Тестирование

Откройте http://localhost:3000/test-page для просмотра обновленного дизайна.
