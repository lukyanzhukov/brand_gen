import { NextRequest, NextResponse } from 'next/server'
import { resolveEmployerIdFromUrl, getEmployer, getEmployerVacancies } from '@/lib/hh'
import { normalizeCompanyData } from '@/lib/normalize'
import { extractContent } from '@/lib/extract'
import { generatePalette } from '@/lib/palette-server'
import { generateUnifiedContent } from '@/lib/generate-unified'
import { validatePage } from '@/lib/validate'

export async function POST(request: NextRequest) {
  try {
    // Проверяем наличие API ключа
    if (!process.env.OPENAI_API_KEY && !process.env.AUTH_TOKEN) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY or AUTH_TOKEN environment variable.' 
      }, { status: 500 })
    }

    const body = await request.json()
    
    const { url, variants = 3 } = body
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // 1. Получаем employer ID
    const employerId = await resolveEmployerIdFromUrl(url)
    if (!employerId) {
      return NextResponse.json({ error: 'Could not resolve employer ID from URL' }, { status: 404 })
    }

    // 2. Получаем данные компании
    const [employerData, vacanciesData] = await Promise.all([
      getEmployer(employerId),
      getEmployerVacancies(employerId, 10) // Ограничиваем до 10 вакансий
    ])

    if (!employerData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // 3. Нормализуем данные
    const normalizedData = normalizeCompanyData(employerData, vacanciesData)

    // 4. Извлекаем контент для блоков
    let extractedContent
    try {
      extractedContent = await extractContent(normalizedData)
    } catch (error) {
      console.error('Content extraction failed:', error)
      throw error
    }

    // 5. Генерируем цветовую палитру
    let palette
    try {
      // Используем companyCorpus вместо vacancyCorpus для лучшего определения цветов
      palette = await generatePalette(normalizedData.companyCorpus, normalizedData.logoUrl, normalizedData.name)
    } catch (error) {
      console.error('Palette generation failed, using fallback:', error)
      palette = undefined // Будет использована fallback палитра
    }

    // 6. Генерируем варианты страниц с объединенной генерацией
    const pageVariants = []
    
    for (let i = 0; i < variants; i++) {
      // Объединенная генерация структуры и текстов
      const { layout, copy } = await generateUnifiedContent(normalizedData, palette)
      
      // Валидируем страницу
      const validation = validatePage(layout, normalizedData.logoUrl)
      
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
    console.error('Error building page variants:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
