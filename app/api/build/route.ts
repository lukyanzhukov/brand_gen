import { NextRequest, NextResponse } from 'next/server'
import { resolveEmployerIdFromUrl, getEmployer, getEmployerVacancies } from '@/lib/hh'
import { normalizeCompanyData } from '@/lib/normalize'
import { extractContent } from '@/lib/extract'
import { generatePalette } from '@/lib/palette-server'
import { generateUnifiedContent } from '@/lib/generate-unified'
import { validatePage } from '@/lib/validate'

export async function POST(request: NextRequest) {
  try {
    console.log('=== API BUILD REQUEST START ===')
    const body = await request.json()
    console.log('Request body:', body)
    
    const { url, variants = 3 } = body
    
    if (!url) {
      console.log('Error: URL is required')
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    
    console.log('Processing URL:', url, 'Variants:', variants)

    // 1. Получаем employer ID
    const employerId = await resolveEmployerIdFromUrl(url)
    if (!employerId) {
      return NextResponse.json({ error: 'Could not resolve employer ID from URL' }, { status: 404 })
    }

    // 2. Получаем данные компании
    console.log('Fetching employer data for ID:', employerId)
    const [employerData, vacanciesData] = await Promise.all([
      getEmployer(employerId),
      getEmployerVacancies(employerId, 10) // Ограничиваем до 10 вакансий
    ])

    console.log('Employer data:', JSON.stringify(employerData, null, 2))
    console.log('Vacancies data:', JSON.stringify(vacanciesData, null, 2))

    if (!employerData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // 3. Нормализуем данные
    console.log('Normalizing data...')
    const normalizedData = normalizeCompanyData(employerData, vacanciesData)
    console.log('Normalized data:', JSON.stringify(normalizedData, null, 2))

    // 4. Извлекаем контент для блоков
    console.log('Starting content extraction...')
    let extractedContent
    try {
      extractedContent = await extractContent(normalizedData)
      console.log('Content extraction completed')
      console.log('Extracted content:', JSON.stringify(extractedContent, null, 2))
    } catch (error) {
      console.error('Content extraction failed:', error)
      throw error
    }

    // 5. Генерируем цветовую палитру (отдельно, сразу после извлечения данных)
    console.log('Generating color palette...')
    let palette
    try {
      palette = await generatePalette(normalizedData.vacancyCorpus, normalizedData.logoUrl)
      console.log('Palette generated:', JSON.stringify(palette, null, 2))
    } catch (error) {
      console.error('Palette generation failed, using fallback:', error)
      palette = undefined // Будет использована fallback палитра
    }

    // 6. Генерируем варианты страниц с объединенной генерацией
    const pageVariants = []
    
    for (let i = 0; i < variants; i++) {
      console.log(`\n=== GENERATING VARIANT ${i + 1} ===`)
      
      // Объединенная генерация структуры и текстов
      console.log('Generating unified content (layout + copy)...')
      const { layout, copy } = await generateUnifiedContent(normalizedData, palette)
      console.log('Layout generated:', JSON.stringify(layout, null, 2))
      console.log('Copy generated:', JSON.stringify(copy, null, 2))
      
      // Валидируем страницу
      console.log('Validating page...')
      const validation = validatePage(layout, normalizedData.logoUrl)
      console.log('Validation result:', JSON.stringify(validation, null, 2))
      
      pageVariants.push({
        id: `variant_${i + 1}`,
        layout,
        copy,
        palette,
        validation,
        metadata: {
          companyName: normalizedData.name,
          logoUrl: normalizedData.logoUrl,
          generatedAt: new Date().toISOString()
        }
      })
    }

    console.log('=== API BUILD SUCCESS ===')
    return NextResponse.json({
      success: true,
      variants: pageVariants,
      sourceData: {
        employerId,
        companyName: normalizedData.name,
        logoUrl: normalizedData.logoUrl
      }
    })
  } catch (error) {
    console.error('=== API BUILD ERROR ===')
    console.error('Error building page variants:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
