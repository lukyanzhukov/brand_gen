// HH API utilities
const HH_API_BASE = process.env.HH_API_BASE || 'https://api.hh.ru'

// Типы на основе документации HH API
export interface HHEmployer {
  id: string
  name: string
  description?: string
  branded_description?: string
  industries: Array<{ id: string; name: string }>
  logo_urls?: {
    original?: string
    '90'?: string
    '240'?: string
  }
  site_url: string
  area: {
    id: string
    name: string
    url: string
  }
  type?: string
  trusted: boolean
  open_vacancies?: number
  alternate_url: string
  vacancies_url: string
  accredited_it_employer?: boolean
  badges?: Array<{
    description: string
    position?: string
    type: string
    url?: string
    year?: number
  }>
  insider_interviews: Array<{
    id: string
    title: string
    url: string
  }>
  relations: string[]
}

export interface HHVacancy {
  id: string
  name: string
  description: string
  branded_description?: string
  key_skills: Array<{ name: string }>
  area: {
    id: string
    name: string
    url: string
  }
  salary?: {
    from?: number
    to?: number
    currency: string
    gross?: boolean
  }
  salary_range?: {
    from?: number
    to?: number
    currency: string
    gross?: boolean
    frequency?: {
      id: string
      name: string
    }
    mode?: {
      id: string
      name: string
    }
  }
  employer?: {
    id: string
    name: string
    alternate_url: string
    logo_urls?: {
      original?: string
      '90'?: string
      '240'?: string
    }
    trusted?: boolean
    url?: string
  }
  published_at: string
  created_at: string
  alternate_url: string
  apply_alternate_url: string
  experience?: {
    id: string
    name: string
  }
  employment?: {
    id: string
    name: string
  }
  schedule?: {
    id: string
    name: string
  }
  work_format?: Array<{
    id: string
    name: string
  }>
  professional_roles: Array<{
    id: string
    name: string
  }>
  specializations?: Array<{
    id: string
    name: string
  }>
  languages?: Array<{
    id: string
    name: string
    level?: {
      id: string
      name: string
    }
  }>
  driver_license_types: Array<{
    id: string
  }>
  premium: boolean
  archived: boolean
  approved: boolean
  has_test: boolean
  response_letter_required: boolean
  allow_messages: boolean
  accept_handicapped: boolean
  accept_incomplete_resumes: boolean
  accept_kids: boolean
  accept_temporary?: boolean
  night_shifts?: boolean
  internship?: boolean
  side_job?: boolean
  address?: {
    city: string
    street?: string
    building?: string
    description?: string
    lat?: number
    lng?: number
    metro_stations?: Array<{
      station_id: string
      station_name: string
      line_id: string
      line_name: string
      lat: number
      lng: number
    }>
  }
  contacts?: {
    name?: string
    email?: string
    phones?: Array<{
      country: string
      city: string
      number: string
      comment?: string
    }>
  }
  insider_interview?: {
    id: string
    url: string
  }
  video_vacancy?: {
    video_url: string
    cover_picture?: {
      resized_path: string
      resized_width: number
      resized_height: number
    }
  }
  test?: {
    required: boolean
  }
  type: {
    id: string
    name: string
  }
  billing_type?: {
    id: string
    name: string
  }
  department?: {
    id: string
    name: string
  }
  age_restriction?: {
    id: string
    name: string
  }
  work_schedule_by_days?: Array<{
    id: string
    name: string
  }>
  working_hours?: Array<{
    id: string
    name: string
  }>
  working_days?: Array<{
    id: string
    name: string
  }>
  working_time_intervals?: Array<{
    id: string
    name: string
  }>
  working_time_modes?: Array<{
    id: string
    name: string
  }>
  fly_in_fly_out_duration?: Array<{
    id: string
    name: string
  }>
  quick_responses_allowed: boolean
  responses_count?: number
  online_users_count?: number
  show_contacts?: boolean
  show_logo_in_search: boolean
  closed_for_applicants?: boolean
  response_url?: string
  negotiations_url?: string
  suitable_resumes_url?: string
  immediate_redirect_url?: string
  immediate_redirect_vacancy_id?: string
  adv_context?: string
  adv_response_url?: string
  code?: string
  hidden: boolean
  initial_created_at: string
  expires_at?: string
  response_notifications?: boolean
  can_upgrade_billing_type?: boolean
  complaint_about_employer?: {
    id: string
    text: string
  }
  misleading_vacancy_alert?: boolean
  allow_chat_with_manager?: boolean
  show_question_input?: boolean
  experimental_modes?: string[]
  relations?: string[]
  counters?: {
    responses_count: number
  }
}

export interface HHResponse<T> {
  items: T[]
  found: number
  pages: number
  per_page: number
  page: number
}

/**
 * Извлекает employer ID из URL hh.ru
 */
export async function resolveEmployerIdFromUrl(url: string): Promise<string | null> {
  try {
    // TODO: Реализовать парсинг URL и получение employer ID
    // Возможные форматы:
    // - https://hh.ru/employer/123456
    // - https://hh.ru/company/123456
    // - https://hh.ru/employer/123456/vacancies
    
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/').filter(Boolean)
    
    if (pathParts.length >= 2 && (pathParts[0] === 'employer' || pathParts[0] === 'company')) {
      return pathParts[1]
    }
    
    return null
  } catch (error) {
    console.error('Error resolving employer ID from URL:', error)
    return null
  }
}

/**
 * Получает данные работодателя по ID
 */
export async function getEmployer(employerId: string): Promise<HHEmployer | null> {
  try {
    const response = await fetch(`${HH_API_BASE}/employers/${employerId}`, {
      headers: {
        'User-Agent': 'BrandGen/1.0 (hh.ru brand page generator)',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching employer:', error)
    return null
  }
}

/**
 * Получает вакансии работодателя
 */
export async function getEmployerVacancies(
  employerId: string, 
  limit: number = 30
): Promise<HHVacancy[]> {
  try {
    const response = await fetch(
      `${HH_API_BASE}/vacancies?employer_id=${employerId}&per_page=${limit}&order_by=publication_time`,
      {
        headers: {
          'User-Agent': 'BrandGen/1.0 (hh.ru brand page generator)',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: HHResponse<HHVacancy> = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching vacancies:', error)
    return []
  }
}
