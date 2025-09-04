import { NextRequest, NextResponse } from 'next/server'
import { getEmployer, getEmployerVacancies } from '@/lib/hh'
import { normalizeCompanyData } from '@/lib/normalize'
import { extractContent } from '@/lib/extract'

export async function POST(request: NextRequest) {
  try {
    const { employerId } = await request.json()
    
    if (!employerId) {
      return NextResponse.json({ error: 'Employer ID is required' }, { status: 400 })
    }

    console.log('Testing with employer ID:', employerId)

    // Получаем данные компании
    const [employerData, vacanciesData] = await Promise.all([
      getEmployer(employerId),
      getEmployerVacancies(employerId, 30)
    ])

    console.log('Employer data:', employerData?.name)
    console.log('Vacancies count:', vacanciesData?.length)

    if (!employerData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Нормализуем данные
    const normalizedData = normalizeCompanyData(employerData, vacanciesData)
    console.log('Normalized data:', {
      name: normalizedData.name,
      companyCorpus: normalizedData.companyCorpus?.substring(0, 100) + '...',
      vacancyCorpus: normalizedData.vacancyCorpus?.substring(0, 100) + '...'
    })

    // Тестируем извлечение контента
    console.log('Starting content extraction...')
    const extractedContent = await extractContent(normalizedData)
    console.log('Content extraction completed')

    return NextResponse.json({ 
      success: true,
      employer: normalizedData.name,
      extractedContent: {
        hero: extractedContent.hero?.title,
        about: extractedContent.about?.title
      }
    })
  } catch (error) {
    console.error('Test extract error:', error)
    return NextResponse.json({ 
      error: 'Test extract failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
