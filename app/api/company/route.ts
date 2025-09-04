import { NextRequest, NextResponse } from 'next/server'
import { getEmployer, getEmployerVacancies } from '@/lib/hh'
import { normalizeCompanyData } from '@/lib/normalize'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employerId = searchParams.get('employerId')
    
    if (!employerId) {
      return NextResponse.json({ error: 'employerId parameter is required' }, { status: 400 })
    }

    // Получаем данные компании и вакансии параллельно
    const [employerData, vacanciesData] = await Promise.all([
      getEmployer(employerId),
      getEmployerVacancies(employerId, 30)
    ])

    if (!employerData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Нормализуем данные
    const normalizedData = normalizeCompanyData(employerData, vacanciesData)

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error('Error fetching company data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
