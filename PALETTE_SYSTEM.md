# Система настройки цветов через LLM

## 🎨 Обзор

Система палитр позволяет LLM автоматически настраивать цвета компонентов на основе анализа контента вакансий и специфики компании.

## 🔧 Техническая реализация

### Основные компоненты

1. **`lib/palette.ts`** - основная логика генерации и применения палитр
2. **`ColorPalette`** - интерфейс для определения цветовой схемы
3. **`generatePalette()`** - функция генерации палитры через LLM
4. **`generatePaletteCSS()`** - генерация CSS переменных

### Структура палитры

```typescript
interface ColorPalette {
  // Основные цвета
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  background: string
  surface: string
  onBackground: string
  onSurface: string
  accent: string
  onAccent: string
  error: string
  onError: string
  outline: string
  
  // Индивидуальные цвета для блоков
  hero?: { background: string; text: string; accent: string }
  about?: { background: string; text: string; accent: string }
  tracks?: { background: string; text: string; accent: string }
  geo?: { background: string; text: string; accent: string }
  facts?: { background: string; text: string; accent: string }
  benefits?: { background: string; text: string; accent: string }
  culture?: { background: string; text: string; accent: string }
  media?: { background: string; text: string; accent: string }
  hiring?: { background: string; text: string; accent: string }
  cta?: { background: string; text: string; accent: string }
}
```

## 🤖 Анализ LLM

### Критерии выбора цветов

LLM анализирует следующие аспекты:

1. **Технологический стек**
   - IT-компании → синие тона (надежность, технологии)
   - Креативные студии → яркие цвета (креативность, инновации)
   - Финансовые компании → консервативные (стабильность, доверие)

2. **Тон компании**
   - Стартапы → яркие акценты (энергия, динамика)
   - Корпорации → сдержанные (профессионализм, стабильность)
   - Креативные → необычные (инновации, креативность)

3. **Специфика отрасли**
   - Медицина → зеленые (здоровье, рост)
   - Технологии → синие (надежность, инновации)
   - Финансы → синие/серые (стабильность, профессионализм)

### Индивидуальные цвета блоков

Каждый блок получает специализированную цветовую схему:

- **Hero** → привлекательный, яркий
- **About** → профессиональный, доверительный
- **Tracks** → технологичный, современный
- **Geo** → нейтральный, информативный
- **Facts** → контрастный, читаемый
- **Benefits** → теплый, дружелюбный
- **Culture** → вдохновляющий, живой
- **Media** → динамичный, современный
- **Hiring** → четкий, понятный
- **CTA** → призывный, яркий

## 🎯 Применение в компонентах

### CSS переменные

Система генерирует CSS переменные для каждого блока:

```css
/* Основные цвета */
--primary: #2563eb
--primary-foreground: #ffffff
--secondary: #64748b
--background: #ffffff
--accent: #3b82f6

/* Блочные цвета */
--hero-bg: #1e40af
--hero-text: #ffffff
--hero-accent: #60a5fa

--cta-bg: #f59e0b
--cta-text: #ffffff
--cta-accent: #ffffff
```

### Использование в компонентах

```tsx
// Применение палитры к компоненту
const paletteStyles = generatePaletteCSS(palette)

<div style={paletteStyles}>
  <div style={{
    backgroundColor: 'var(--hero-bg)',
    color: 'var(--hero-text)'
  }}>
    Hero Block
  </div>
</div>
```

## 📊 Примеры палитр

### IT-компания (синяя)
```json
{
  "primary": "#2563eb",
  "accent": "#3b82f6",
  "background": "#ffffff",
  "hero": {
    "background": "#1e40af",
    "text": "#ffffff",
    "accent": "#60a5fa"
  }
}
```

### Креативная студия (фиолетовая)
```json
{
  "primary": "#8b5cf6",
  "accent": "#a855f7",
  "background": "#ffffff",
  "hero": {
    "background": "#7c3aed",
    "text": "#ffffff",
    "accent": "#c4b5fd"
  }
}
```

### Финансовая компания (зеленая)
```json
{
  "primary": "#059669",
  "accent": "#10b981",
  "background": "#ffffff",
  "hero": {
    "background": "#047857",
    "text": "#ffffff",
    "accent": "#6ee7b7"
  }
}
```

### Стартап (оранжевая)
```json
{
  "primary": "#ea580c",
  "accent": "#fb923c",
  "background": "#ffffff",
  "hero": {
    "background": "#c2410c",
    "text": "#ffffff",
    "accent": "#fdba74"
  }
}
```

## ✅ Преимущества системы

1. **Автоматический подбор** - LLM анализирует контент и выбирает подходящие цвета
2. **Гибкая настройка** - каждый блок может иметь свои цвета
3. **Контрастность** - автоматическая проверка читаемости
4. **Брендинг** - учет фирменных цветов компании
5. **Адаптивность** - цвета подстраиваются под специфику отрасли

## 🚀 Использование

### Генерация палитры

```typescript
import { generatePalette } from '@/lib/palette'

const palette = await generatePalette(vacancyCorpus)
```

### Применение в PageRenderer

```typescript
import { generatePaletteCSS } from '@/lib/palette'

const paletteStyles = generatePaletteCSS(palette)

<div style={paletteStyles}>
  {/* Компоненты страницы */}
</div>
```

### Тестирование

Откройте http://localhost:3000/palette-test для просмотра примеров различных палитр.

## 🔄 Процесс генерации

1. **Анализ контента** - LLM изучает текст вакансий
2. **Определение тона** - анализ технологий, отрасли, стиля
3. **Генерация палитры** - создание основной + блочных цветов
4. **Валидация** - проверка контрастности и читаемости
5. **Применение** - генерация CSS переменных

## 🎨 Кастомизация

Система поддерживает:
- Ручную настройку цветов
- Переопределение блочных палитр
- Добавление новых цветовых схем
- Интеграцию с существующими дизайн-системами
