import { NextRequest, NextResponse } from 'next/server'
import { generatePalette } from '@/lib/palette-server'

export async function POST(request: NextRequest) {
  try {
    const { url, vacancyCorpus, logoUrl, companyName, companyCorpus } = await request.json()

    if (!url && !companyName) {
      return NextResponse.json(
        { error: 'URL или companyName обязательны' },
        { status: 400 }
      )
    }

    console.log('🎨 Generating palette for:', { url, companyName, logoUrl })

    // Генерируем палитру - используем companyCorpus если есть, иначе vacancyCorpus
    const corpus = companyCorpus || vacancyCorpus || ''
    const palette = await generatePalette(corpus, logoUrl, companyName)

    console.log('🎨 Generated palette:', palette)

    return NextResponse.json({
      success: true,
      palette,
      metadata: {
        companyName,
        logoUrl,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error generating palette:', error)
    return NextResponse.json(
      { 
        error: 'Ошибка генерации палитры',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    )
  }
}
