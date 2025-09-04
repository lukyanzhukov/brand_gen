# Настройка и запуск сервиса

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
# OpenAI API Key (получите на https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# HH API Base URL
HH_API_BASE=https://api.hh.ru
```

### 3. Получение OpenAI API ключа

1. Перейдите на https://platform.openai.com/api-keys
2. Войдите в аккаунт или создайте новый
3. Нажмите "Create new secret key"
4. Скопируйте ключ и вставьте в `.env.local`

### 4. Запуск сервера

```bash
npm run dev
```

Сервер будет доступен по адресу: http://localhost:3000

## 🧪 Тестирование

### Тестовые страницы

- **Все блоки**: http://localhost:3000/test
- **Система палитр**: http://localhost:3000/palette-test

### API эндпоинты

- **POST /api/build** - генерация страниц
- **GET /api/company/{id}** - данные компании
- **GET /api/resolve** - разрешение URL

## 📝 Пример использования API

```bash
# Генерация страниц для компании
curl -X POST http://localhost:3000/api/build \
  -H "Content-Type: application/json" \
  -d '{"url": "https://hh.ru/employer/123456", "variants": 3}'
```

## 🔧 Настройка для продакшена

### Переменные окружения

```bash
# Обязательные
OPENAI_API_KEY=your_key_here

# Опциональные
HH_API_BASE=https://api.hh.ru
NODE_ENV=production
```

### Сборка

```bash
npm run build
npm start
```

## 🐛 Решение проблем

### Ошибка "OPENAI_API_KEY is missing"

1. Убедитесь, что файл `.env.local` создан
2. Проверьте, что ключ скопирован правильно
3. Перезапустите сервер

### Ошибки с изображениями

1. Проверьте настройки в `next.config.js`
2. Убедитесь, что домены добавлены в `images.domains`

### Проблемы с HH API

1. Проверьте доступность https://api.hh.ru
2. Убедитесь, что URL компании корректный
3. Проверьте логи в консоли

## 📚 Документация

- [Система палитр](PALETTE_SYSTEM.md)
- [Примеры блоков](README.md)
- [API примеры](API_EXAMPLES.md)
