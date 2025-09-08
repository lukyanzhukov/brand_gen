# Brand Page Generator

Генератор бренд-страниц для работодателей на основе данных с hh.ru.

## Возможности

- Автоматическое извлечение данных компании с hh.ru
- Генерация цветовой палитры на основе логотипа компании
- Создание структурированной страницы с 10 блоками контента
- Адаптивный дизайн с современным UI
- Предварительный просмотр сгенерированной страницы

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```

3. Скопируйте файл переменных окружения:
   ```bash
   cp env.local.example .env.local
   ```

4. Настройте переменные окружения в `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   BASE_URL=https://llmgtw.hhdev.ru/proxy/openai
   HH_API_BASE=https://api.hh.ru
   ```

## Запуск

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## Использование

1. Откройте приложение в браузере
2. Введите URL компании на hh.ru (например: `https://hh.ru/employer/123456`)
3. Нажмите "Сгенерировать страницу"
4. Дождитесь завершения генерации
5. Просмотрите результат или откройте в новой вкладке

## API Endpoints

- `POST /api/build` - Генерация бренд-страницы
- `GET /api/company` - Получение данных компании
- `GET /api/palette` - Генерация цветовой палитры
- `GET /api/resolve` - Разрешение employer ID из URL

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── page.tsx           # Главная страница
│   └── preview/           # Страница предварительного просмотра
├── components/            # React компоненты
│   └── blocks/           # Блоки страницы
├── lib/                  # Утилиты и логика
│   ├── hh.ts            # HH API интеграция
│   ├── llm-server.ts    # LLM серверные функции
│   ├── palette.ts       # Цветовые палитры
│   └── ...
└── public/              # Статические файлы
```

## Технологии

- **Next.js 15** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **OpenAI API** - Генерация контента
- **HH.ru API** - Данные компаний

## Лицензия

Private
