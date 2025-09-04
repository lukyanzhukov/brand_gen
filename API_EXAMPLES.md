# Примеры использования HH API

## Получение данных работодателя

### Запрос
```bash
curl "https://api.hh.ru/employers/1455" \
  -H "User-Agent: BrandGen/1.0 (hh.ru brand page generator)"
```

### Ответ
```json
{
  "id": "1455",
  "name": "HeadHunter",
  "description": "Хороший работодатель",
  "branded_description": "<style>...</style><div>...</div>",
  "industries": [
    {
      "id": "7.540",
      "name": "Разработка программного обеспечения"
    }
  ],
  "logo_urls": {
    "90": "https://hh.ru/employer-logo/289027.png",
    "240": "https://hh.ru/employer-logo/289169.png",
    "original": "https://hh.ru/file/2352807.png"
  },
  "site_url": "https://hh.ru",
  "area": {
    "id": "113",
    "name": "Россия",
    "url": "https://api.hh.ru/areas/113"
  },
  "type": "company",
  "trusted": true,
  "open_vacancies": 19,
  "alternate_url": "https://hh.ru/employer/1455",
  "vacancies_url": "https://api.hh.ru/vacancies?employer_id=1455"
}
```

## Получение вакансий работодателя

### Запрос
```bash
curl "https://api.hh.ru/vacancies?employer_id=1455&per_page=30&order_by=publication_time" \
  -H "User-Agent: BrandGen/1.0 (hh.ru brand page generator)"
```

### Ответ
```json
{
  "items": [
    {
      "id": "8331228",
      "name": "Секретарь",
      "description": "Работа хороша",
      "key_skills": [
        {
          "name": "Прием посетителей"
        }
      ],
      "area": {
        "id": "1",
        "name": "Москва",
        "url": "https://api.hh.ru/areas/1"
      },
      "salary": {
        "from": 30000,
        "to": null,
        "currency": "RUR",
        "gross": true
      },
      "employer": {
        "id": "1455",
        "name": "HeadHunter",
        "alternate_url": "https://hh.ru/employer/1455"
      },
      "published_at": "2013-07-08T16:17:21+0400",
      "alternate_url": "https://hh.ru/vacancy/8331228",
      "apply_alternate_url": "https://hh.ru/applicant/vacancy_response?vacancyId=8331228"
    }
  ],
  "found": 19,
  "pages": 1,
  "per_page": 30,
  "page": 0
}
```

## Извлечение employer ID из URL

### Поддерживаемые форматы URL:
- `https://hh.ru/employer/123456`
- `https://hh.ru/company/123456`
- `https://hh.ru/employer/123456/vacancies`

### Примеры:
```javascript
// Извлекает "123456" из URL
resolveEmployerIdFromUrl("https://hh.ru/employer/123456")
// Возвращает: "123456"

resolveEmployerIdFromUrl("https://hh.ru/company/123456/vacancies")
// Возвращает: "123456"
```

## Обработка ошибок

### 404 - Работодатель не найден
```json
{
  "errors": [
    {
      "type": "not_found",
      "value": "employer"
    }
  ]
}
```

### 403 - Доступ запрещен
```json
{
  "errors": [
    {
      "type": "forbidden",
      "value": "access_denied"
    }
  ]
}
```

## Полезные поля для генерации контента

### Из данных работодателя:
- `name` - название компании
- `description` - описание компании (HTML)
- `branded_description` - брендированное описание (HTML)
- `industries` - отрасли деятельности
- `logo_urls` - логотипы разных размеров
- `area` - регион
- `trusted` - проверенный работодатель
- `accredited_it_employer` - IT аккредитация
- `badges` - награды и достижения
- `insider_interviews` - интервью о компании

### Из вакансий:
- `name` - название вакансии
- `description` - описание вакансии (HTML)
- `branded_description` - брендированное описание (HTML)
- `key_skills` - ключевые навыки
- `professional_roles` - профессиональные роли
- `specializations` - специализации
- `experience` - требуемый опыт
- `employment` - тип занятости
- `schedule` - график работы
- `work_format` - форматы работы
- `salary` - зарплата
- `area` - регион
- `address` - адрес работы
- `languages` - языки
- `accept_handicapped` - доступная среда
- `accept_incomplete_resumes` - гибкие требования
- `night_shifts` - ночные смены
- `internship` - стажировка
- `has_test` - тестовые задания
- `allow_messages` - прямое общение
- `quick_responses_allowed` - быстрые отклики
