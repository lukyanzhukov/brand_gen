import { HHEmployer, HHVacancy } from './hh'

// TODO: Уточнить типы после интеграции с реальными данными
export interface CompanyData {
  id: string
  name: string
  description?: string
  industries: string[]
  logoUrl?: string
  siteUrl?: string
  area?: string
  companyCorpus: string
  vacancyCorpus: string
  perks: string[]
  keySkills: string[]
}

/**
 * Нормализует HTML в текст
 */
function htmlToText(html: string | undefined): string {
  if (!html) return ''
  
  // Простая очистка HTML тегов
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Извлекает ключевые навыки из вакансий
 */
function extractKeySkills(vacancies: HHVacancy[]): string[] {
  const skills = new Set<string>()
  
  vacancies.forEach(vacancy => {
    if (vacancy.key_skills) {
      vacancy.key_skills.forEach(skill => {
        skills.add(skill.name.toLowerCase())
      })
    }
  })
  
  return Array.from(skills)
}

/**
 * Извлекает перки/преимущества из описаний вакансий
 */
function extractPerks(vacancies: HHVacancy[]): string[] {
  const perks = new Set<string>()
  const perkKeywords = [
    'гибкий график', 'удаленная работа', 'офис', 'команда',
    'обучение', 'развитие', 'карьера', 'проекты', 'технологии',
    'стартап', 'международная', 'стабильность', 'соцпакет',
    'медицина', 'спорт', 'питание', 'транспорт', 'отпуск',
    'премиум', 'бонусы', 'опционы', 'акции', 'компенсация'
  ]
  
  vacancies.forEach(vacancy => {
    const description = (vacancy.description || '').toLowerCase()
    const brandedDescription = (vacancy.branded_description || '').toLowerCase()
    
    const fullText = `${description} ${brandedDescription}`
    
    // Проверяем флаги вакансии
    if (vacancy.accept_handicapped) perks.add('доступная среда')
    if (vacancy.accept_incomplete_resumes) perks.add('гибкие требования')
    if (vacancy.accept_temporary) perks.add('временная работа')
    if (vacancy.night_shifts) perks.add('ночные смены')
    if (vacancy.internship) perks.add('стажировка')
    if (vacancy.side_job) perks.add('подработка')
    if (vacancy.has_test) perks.add('тестовые задания')
    if (vacancy.allow_messages) perks.add('прямое общение')
    if (vacancy.quick_responses_allowed) perks.add('быстрые отклики')
    
    // Проверяем форматы работы
    if (vacancy.work_format) {
      vacancy.work_format.forEach(format => {
        if (format.id === 'REMOTE') perks.add('удаленная работа')
        if (format.id === 'HYBRID') perks.add('гибридный формат')
        if (format.id === 'ON_SITE') perks.add('офисная работа')
      })
    }
    
    // Проверяем график работы
    if (vacancy.schedule) {
      if (vacancy.schedule.id === 'flexible') perks.add('гибкий график')
      if (vacancy.schedule.id === 'shift') perks.add('сменный график')
      if (vacancy.schedule.id === 'partTime') perks.add('неполная занятость')
    }
    
    // Проверяем ключевые слова в тексте
    perkKeywords.forEach(keyword => {
      if (fullText.includes(keyword)) {
        perks.add(keyword)
      }
    })
  })
  
  return Array.from(perks)
}

/**
 * Создает корпус текста о компании
 */
function buildCompanyCorpus(employer: HHEmployer): string {
  let corpus = ''
  
  corpus += `Компания: ${employer.name}\n`
  
  if (employer.description) {
    const description = htmlToText(employer.description)
    corpus += `Описание: ${description.substring(0, 1000)}${description.length > 1000 ? '...' : ''}\n`
  }
  
  if (employer.branded_description) {
    const brandedDesc = htmlToText(employer.branded_description)
    corpus += `Брендированное описание: ${brandedDesc.substring(0, 1000)}${brandedDesc.length > 1000 ? '...' : ''}\n`
  }
  
  if (employer.industries && employer.industries.length > 0) {
    const industries = employer.industries.map(ind => ind.name).join(', ')
    corpus += `Отрасли: ${industries}\n`
  }
  
  corpus += `Регион: ${employer.area.name}\n`
  
  if (employer.type) {
    corpus += `Тип компании: ${employer.type}\n`
  }
  
  if (employer.trusted) {
    corpus += `Проверенный работодатель: да\n`
  }
  
  if (employer.accredited_it_employer) {
    corpus += `IT аккредитация: да\n`
  }
  
  if (employer.open_vacancies) {
    corpus += `Открытых вакансий: ${employer.open_vacancies}\n`
  }
  
  if (employer.badges && employer.badges.length > 0) {
    const badges = employer.badges.map(badge => badge.description).join(', ')
    corpus += `Награды: ${badges}\n`
  }
  
  if (employer.insider_interviews && employer.insider_interviews.length > 0) {
    const interviews = employer.insider_interviews.map(interview => interview.title).join(', ')
    corpus += `Интервью: ${interviews}\n`
  }
  
  return corpus.trim()
}

/**
 * Создает корпус текста из вакансий
 */
function buildVacancyCorpus(vacancies: HHVacancy[] | undefined): string {
  let corpus = ''
  
  if (!vacancies || !Array.isArray(vacancies)) {
    return corpus
  }
  
  // Ограничиваем количество вакансий и длину описаний
  const maxVacancies = 10
  const maxDescriptionLength = 500
  
  vacancies.slice(0, maxVacancies).forEach((vacancy, index) => {
    corpus += `Вакансия ${index + 1}: ${vacancy.name}\n`
    
    // Описание вакансии (сокращенное)
    const description = htmlToText(vacancy.description)
    if (description) {
      corpus += `Описание: ${description.substring(0, maxDescriptionLength)}${description.length > maxDescriptionLength ? '...' : ''}\n`
    }
    
    if (vacancy.branded_description) {
      const brandedDesc = htmlToText(vacancy.branded_description)
      corpus += `Брендированное описание: ${brandedDesc.substring(0, maxDescriptionLength)}${brandedDesc.length > maxDescriptionLength ? '...' : ''}\n`
    }
    
    // Навыки
    if (vacancy.key_skills && vacancy.key_skills.length > 0) {
      const skills = vacancy.key_skills.map(skill => skill.name).join(', ')
      corpus += `Навыки: ${skills}\n`
    }
    
    // Профессиональные роли
    if (vacancy.professional_roles && vacancy.professional_roles.length > 0) {
      const roles = vacancy.professional_roles.map(role => role.name).join(', ')
      corpus += `Роли: ${roles}\n`
    }
    
    // Специализации
    if (vacancy.specializations && vacancy.specializations.length > 0) {
      const specializations = vacancy.specializations.map(spec => spec.name).join(', ')
      corpus += `Специализации: ${specializations}\n`
    }
    
    // Опыт работы
    if (vacancy.experience) {
      corpus += `Опыт: ${vacancy.experience.name}\n`
    }
    
    // Тип занятости
    if (vacancy.employment) {
      corpus += `Занятость: ${vacancy.employment.name}\n`
    }
    
    // График работы
    if (vacancy.schedule) {
      corpus += `График: ${vacancy.schedule.name}\n`
    }
    
    // Форматы работы
    if (vacancy.work_format && vacancy.work_format.length > 0) {
      const formats = vacancy.work_format.map(format => format.name).join(', ')
      corpus += `Форматы работы: ${formats}\n`
    }
    
    // Языки
    if (vacancy.languages && vacancy.languages.length > 0) {
      const languages = vacancy.languages.map(lang => 
        `${lang.name}${lang.level ? ` (${lang.level.name})` : ''}`
      ).join(', ')
      corpus += `Языки: ${languages}\n`
    }
    
    // Адрес
    if (vacancy.address) {
      corpus += `Адрес: ${vacancy.address.city}`
      if (vacancy.address.street) {
        corpus += `, ${vacancy.address.street}`
      }
      if (vacancy.address.building) {
        corpus += `, ${vacancy.address.building}`
      }
      corpus += '\n'
    } else {
      corpus += `Город: ${vacancy.area.name}\n`
    }
    
    // Зарплата
    if (vacancy.salary) {
      const salary = vacancy.salary.from && vacancy.salary.to 
        ? `${vacancy.salary.from}-${vacancy.salary.to} ${vacancy.salary.currency}`
        : vacancy.salary.from 
        ? `от ${vacancy.salary.from} ${vacancy.salary.currency}`
        : `до ${vacancy.salary.to} ${vacancy.salary.currency}`
      corpus += `Зарплата: ${salary}\n`
    }
    
    // Дополнительные флаги
    const flags = []
    if (vacancy.premium) flags.push('премиум')
    if (vacancy.accept_handicapped) flags.push('доступная среда')
    if (vacancy.accept_incomplete_resumes) flags.push('гибкие требования')
    if (vacancy.accept_temporary) flags.push('временная работа')
    if (vacancy.night_shifts) flags.push('ночные смены')
    if (vacancy.internship) flags.push('стажировка')
    if (vacancy.side_job) flags.push('подработка')
    if (vacancy.has_test) flags.push('тестовые задания')
    if (vacancy.allow_messages) flags.push('прямое общение')
    if (vacancy.quick_responses_allowed) flags.push('быстрые отклики')
    
    if (flags.length > 0) {
      corpus += `Особенности: ${flags.join(', ')}\n`
    }
    
    corpus += '\n'
  })
  
  return corpus.trim()
}

/**
 * Нормализует данные компании и вакансий в единый формат
 */
export function normalizeCompanyData(employer: HHEmployer, vacancies: HHVacancy[]): CompanyData {
  const logoUrl = employer.logo_urls?.original || employer.logo_urls?.['240'] || employer.logo_urls?.['90']
  
  return {
    id: employer.id,
    name: employer.name,
    description: employer.description ? htmlToText(employer.description) : undefined,
    industries: employer.industries.map(ind => ind.name),
    logoUrl,
    siteUrl: employer.site_url,
    area: employer.area.name,
    companyCorpus: buildCompanyCorpus(employer),
    vacancyCorpus: buildVacancyCorpus(vacancies || []),
    perks: extractPerks(vacancies || []),
    keySkills: extractKeySkills(vacancies || [])
  }
}
