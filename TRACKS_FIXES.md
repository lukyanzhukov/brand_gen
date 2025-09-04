# Исправления блока "Наши направления"

## 🎯 Проблемы, которые были решены

### 1. Пустая белая карточка
- **Проблема:** В блоке tracks была пустая карточка
- **Решение:** Убрали xl:grid-cols-4, оставили lg:grid-cols-3 для лучшей компоновки

### 2. "Одинокие" карточки на новой строке
- **Проблема:** Последняя карточка (5-я) оставалась одна на строке
- **Решение:** Добавили умную логику растягивания карточек

## 🧠 Логика умной компоновки

### Условия растягивания
```typescript
const isLastItem = index === items.length - 1
const isAloneOnRow = items.length % 3 === 1 && isLastItem
const isTwoOnRow = items.length % 3 === 2 && (index === items.length - 2 || index === items.length - 1)
```

### Применение классов
```tsx
className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
  isAloneOnRow ? 'lg:col-span-3' : 
  isTwoOnRow ? 'lg:col-span-1' : ''
}`}
```

## 📱 Адаптивная компоновка

### Сетка
- **Мобильные:** grid-cols-1 (все карточки в одну колонку)
- **Планшеты:** grid-cols-2 (по 2 карточки в ряд)
- **Десктоп:** grid-cols-3 (по 3 карточки в ряд)

### Растягивание
- **5 элементов:** 3 + 2 (последние 2 карточки на одной строке)
- **4 элемента:** 3 + 1 (последняя карточка растягивается на всю ширину)
- **3 элемента:** 3 (все карточки в одну строку)

## 🎨 Стилизация растянутых карточек

### Горизонтальная компоновка
```tsx
<div className={`text-center ${isAloneOnRow ? 'lg:flex lg:items-center lg:text-left lg:space-x-6' : ''}`}>
  <div className={`w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isAloneOnRow ? 'lg:mx-0 lg:mb-0' : ''}`}>
    <div className="text-3xl">{item.icon}</div>
  </div>
  <div className={isAloneOnRow ? 'lg:flex-1' : ''}>
    {/* Контент */}
  </div>
  {item.image && (
    <div className={`mt-4 w-full h-24 relative ${isAloneOnRow ? 'lg:mt-0 lg:w-32 lg:h-32 lg:flex-shrink-0' : ''}`}>
      {/* Изображение */}
    </div>
  )}
</div>
```

## 🚀 Результат

Теперь блок "Наши направления" выглядит идеально:
- ✅ Нет пустых карточек
- ✅ Нет "одиноких" карточек на новой строке
- ✅ Последняя карточка растягивается на всю ширину
- ✅ Адаптивная компоновка для всех экранов
- ✅ Красивая горизонтальная раскладка для растянутых карточек

## 🔗 Тестирование

Откройте http://localhost:3000/test-page для просмотра исправленного блока "Наши направления".
