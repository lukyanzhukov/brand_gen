# 🚀 Деплой Brand Gen

## Быстрый деплой на Vercel (Рекомендуется)

### 1. Подготовка
1. Убедитесь, что у вас есть аккаунт на [vercel.com](https://vercel.com)
2. Установите Vercel CLI: `npm i -g vercel`

### 2. Деплой через Vercel CLI
```bash
# В корне проекта
vercel

# Следуйте инструкциям:
# - Link to existing project? N
# - Project name: brand-gen
# - Directory: ./
# - Override settings? N
```

### 3. Настройка переменных окружения
После деплоя перейдите в Vercel Dashboard → Settings → Environment Variables:

```
OPENAI_API_KEY = 81e71e36-ad00-4e86-93e3-81a459b39328
BASE_URL = https://llmgtw.hhdev.ru/proxy/openai
HH_API_BASE = https://api.hh.ru
```

### 4. Передеплой
```bash
vercel --prod
```

## Альтернативные варианты

### Railway
1. Зайдите на [railway.app](https://railway.app)
2. Connect GitHub репозиторий
3. Добавьте переменные окружения в настройках
4. Деплой автоматический

### Render
1. Зайдите на [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub репозиторий
4. Build Command: `npm run build`
5. Start Command: `npm start`
6. Добавьте переменные окружения

## Проверка деплоя
После деплоя проверьте:
- [ ] Главная страница загружается
- [ ] Генерация работает с тестовым URL
- [ ] API ключи работают корректно
