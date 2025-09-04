import { NextRequest, NextResponse } from 'next/server'
import { resolveEmployerIdFromUrl, getEmployer, getEmployerVacancies } from '@/lib/hh'
import { normalizeCompanyData } from '@/lib/normalize'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    console.log('Testing with URL:', url)

    // Получаем employer ID
    const employerId = await resolveEmployerIdFromUrl(url)
    if (!employerId) {
      return NextResponse.json({ error: 'Could not resolve employer ID' }, { status: 404 })
    }

    console.log('Employer ID:', employerId)

    // Получаем данные компании
    const [employerData, vacanciesData] = await Promise.all([
      getEmployer(employerId),
      getEmployerVacancies(employerId, 5)
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

    return NextResponse.json({ 
      success: true,
      employer: normalizedData.name,
      logoUrl: normalizedData.logoUrl,
      companyCorpus: normalizedData.companyCorpus?.substring(0, 200) + '...',
      vacancyCorpus: normalizedData.vacancyCorpus?.substring(0, 200) + '...'
    })
  } catch (error) {
    console.error('Test simple error:', error)
    return NextResponse.json({ 
      error: 'Test simple failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
