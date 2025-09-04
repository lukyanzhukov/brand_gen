# Brand Gen - Генератор бренд-страниц для hh.ru

Локальный прототип генератора бренд-страниц работодателей для hh.ru с использованием HH API и OpenAI.

## Возможности

- 🔗 Извлечение данных компании из HH API по URL
- 🤖 LLM-экстракция контента для блоков страницы
- 🎨 Автоматический подбор цветовой палитры на основе вакансий
- 📱 10 типов блоков с различными вариантами отображения
- ✅ Валидация структуры страницы
- 👀 Превью сгенерированных вариантов

## Технологии

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS** + shadcn/ui
- **OpenAI SDK** для LLM-функций
- **HH API** для получения данных компаний

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd brand_gen
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` на основе `env.local.example`:
```bash
cp env.local.example .env.local
```

4. Добавьте ваш OpenAI API ключ в `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
HH_API_BASE=https://api.hh.ru
```

5. Запустите dev сервер:
```bash
npm run dev
```

6. Откройте [http://localhost:3000](http://localhost:3000)

## Использование

1. Введите URL компании на hh.ru (например: `https://hh.ru/employer/123456`)
2. Нажмите "Сгенерировать страницы"
3. Дождитесь генерации 2-3 вариантов страниц
4. Нажмите "Открыть превью" для просмотра варианта

## Структура проекта

```
/app
  /api
    /resolve/route.ts      # Извлечение employer ID из URL
    /company/route.ts      # Получение данных компании
    /build/route.ts        # E2E генерация страниц
  /preview/[id]/page.tsx   # Превью варианта
  /page.tsx               # Главная страница
/components
  /blocks/                # Компоненты блоков
    HeroBlock.tsx
    AboutBlock.tsx
    TracksBlock.tsx
    # ... и другие блоки
  PageRenderer.tsx        # Рендеринг страниц
/lib
  hh.ts                   # HH API утилиты
  normalize.ts            # Нормализация данных
  extract.ts              # LLM экстракция контента
  layout.ts               # LLM планирование структуры
  copy.ts                 # LLM генерация текстов
  palette.ts              # LLM подбор палитры
  validate.ts             # Валидация страниц
  llm.ts                  # OpenAI обёртка
  images.ts               # Утилиты для изображений
```

## Библиотека блоков

### 1. Hero-блок
- **Варианты**: `imageLeft`, `imageFull`, `withDirections`, `withTeam`
- **Обязательно**: логотип компании
- **Пропсы**: title, subtitle, cta, directions, slogan, teamImage
- **withDirections**: карточки направлений с иконками (как MTC Exolve)
- **withTeam**: слоган в две строки и фото команды (как Северсталь)

### 2. О компании
- **Варианты**: `default`, `withBullets`, `hiltiStyle`
- **Пропсы**: title, content, highlights, slogan, achievements, companyImage, socialLinks
- **hiltiStyle**: логотип + слоган, круглый бейдж с годами, достижения с иконками/изображениями

### 3. Направления
- **Варианты**: `grid`, `list`, `yandexStyle`
- **Пропсы**: title, subtitle, items, stats
- **yandexStyle**: статистика сверху, карточки с кнопками-примерами, стрелки для специальных блоков

### 4. География
- **Варианты**: `cards`, `list`, `mapStyle`
- **Пропсы**: title, subtitle, locations, mapImage
- **mapStyle**: интерактивная карта с выделенными регионами и координатами

### 5. Факты и цифры
- **Варианты**: `strip3`, `strip5`, `avitoStyle`
- **Пропсы**: title, subtitle, items
- **avitoStyle**: карточки с рейтингами, графиками роста и позиционированием

### 6. Преимущества
- **Варианты**: `compact`, `withIcons`, `wellbeingStyle`
- **Пропсы**: title, subtitle, items
- **wellbeingStyle**: дизайн "Нам важно, чтобы вам было хорошо" с иконками

### 7. Культура
- **Варианты**: `cards`, `quotes`, `valuesStyle`, `mediaStyle`
- **Пропсы**: title, subtitle, items
- **valuesStyle**: текстовые блоки с изображениями (как в первом скрине)
- **mediaStyle**: видео-контент с превью (как во втором скрине)

### 8. Медиа
- **Варианты**: `cards`, `links`, `videoStyle`, `communityStyle`
- **Пропсы**: title, subtitle, items
- **videoStyle**: оранжевые карточки с видео-превью (как во втором скрине)
- **communityStyle**: видео-плеер с чатом команды (как в первом скрине)

### 9. Процесс найма
- **Варианты**: `steps`, `timeline`, `verticalStyle`, `horizontalStyle`
- **Пропсы**: title, subtitle, steps
- **verticalStyle**: вертикальный процесс с цветными кружками (как в первом скрине)
- **horizontalStyle**: горизонтальная временная шкала (как во втором скрине)

### 10. CTA
- **Варианты**: `primary`, `secondary`, `vacanciesStyle`, `internshipStyle`, `choiceStyle`, `orangeStyle`
- **Пропсы**: title, subtitle, buttonText, buttonUrl, categories, image, logo
- **vacanciesStyle**: оранжевый блок с категориями вакансий (как в первом скрине)
- **internshipStyle**: фиолетовый блок с зеленой стрелкой (как во втором скрине)
- **choiceStyle**: черный блок с логотипом (как в третьем скрине)
- **orangeStyle**: оранжевая кнопка с изображением (как в четвертом скрине)

## TODO

- [x] Получить документацию HH API для уточнения типов
- [ ] Получить скрины/гайдлайны для доработки верстки блоков
- [ ] Уточнить TypeScript модели после интеграции
- [ ] Добавить обработку ошибок HH API
- [ ] Реализовать кэширование результатов
- [ ] Добавить экспорт в различные форматы

## Разработка

Для разработки используйте:

```bash
# Запуск dev сервера
npm run dev

# Сборка
npm run build

# Линтинг
npm run lint
```

## Лицензия

MIT
