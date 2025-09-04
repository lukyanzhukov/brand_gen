# Исправления дизайна

## 🎨 Основные исправления

### 1. Заголовки в карточках
- **CTABlock** - заголовок "Присоединяйтесь к нам!" остался в карточке
- **AboutBlock** - заголовок "ПОЧЕМУ HEADS&HANDS?" остался в карточке
- **Остальные блоки** - заголовки вынесены из карточек

### 2. Добавлены иконки и картинки
- **HiringBlock** - добавлены иконки и картинки для каждого шага
- **GeoBlock** - добавлены иконки городов и картинки
- **CultureBlock** - добавлены иконки для каждого элемента

### 3. Исправлены данные
- **HiringBlock** - исправлены поля с `step` на `title`, `timeframe` на `duration`
- **GeoBlock** - исправлены поля с `name` на `city`, добавлено `country`
- **TracksBlock** - исправлены поля с `name` на `title`

## 🎯 Структура блоков

### Заголовки в карточках (CTABlock, AboutBlock)
```tsx
{/* Header inside card */}
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
```

### Заголовки вне карточек (остальные блоки)
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

### Иконки и картинки
```tsx
<div className="w-16 h-16 bg-gradient-to-br from-[color]-100 to-[color]-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
  <div className="text-3xl">{item.icon}</div>
</div>

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

Теперь все блоки выглядят правильно:
- ✅ Заголовки в нужных местах
- ✅ Иконки во всех блоках
- ✅ Картинки для визуализации
- ✅ Исправлены поля данных
- ✅ Единообразный дизайн

## 🔗 Тестирование

Откройте http://localhost:3000/test-page для просмотра исправленного дизайна.
