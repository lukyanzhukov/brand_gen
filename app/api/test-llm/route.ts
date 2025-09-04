import { NextRequest, NextResponse } from 'next/server'
import { generateUnifiedContent } from '@/lib/generate-unified'
import { generatePalette } from '@/lib/palette-server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST LLM REQUEST START ===')
    
    // Фиксированные тестовые данные компании
    const companyData = {
      name: "Heads&Hands",
      description: "Привет, мы Heads&Hands. Если коротко: мы делаем супераппы и крупные цифровые экосистемы для таких компаний, как Т-банк, LaModa, 12Storeez, Спортмастер, Достаевский, Леруа Мерлен, и другие хорошо знакомые тебе иконки в смартфоне. За 13 лет работы мы собрали команду из 200+ крутых ребят, открыли школы разработки, тестирования и аналитики, а также 4 офиса: головной — в Санкт-Петербурге, и филиалы — в Новосибирске, Саранске и Саратове.",
      logoUrl: "https://img.hhcdn.ru/employer-logo-original/1439083.png",
      companyCorpus: "Привет, мы Heads&Hands. Если коротко: мы делаем супераппы и крупные цифровые экосистемы для таких компаний, как Т-банк, LaModa, 12Storeez, Спортмастер, Достаевский, Леруа Мерлен, и другие хорошо знакомые тебе иконки в смартфоне. За 13 лет работы мы собрали команду из 200+ крутых ребят, открыли школы разработки, тестирования и аналитики, а также 4 офиса: головной — в Санкт-Петербурге, и филиалы — в Новосибирске, Саранске и Саратове. А еще стали лидерами разработки в России — заняли 2 место среди разработчиков для крупного бизнеса в Рейтинге Рунета.",
      vacancyCorpus: "Стажер-тестировщик / QA Trainee. Привет! Мы ищем стажера-тестировщика для работы с мобильными приложениями. Ты будешь тестировать приложения на iOS и Android, искать баги и помогать команде разработки их исправлять."
    }

    // Генерируем цветовую палитру
    const colorPalette = await generatePalette(companyData.logoUrl)
    console.log('Generated palette:', colorPalette)

    // Генерируем контент через LLM
    console.log('=== CALLING LLM ===')
    const result = await generateUnifiedContent(companyData, colorPalette)
    console.log('=== LLM RESULT ===')
    console.log(JSON.stringify(result, null, 2))

    return NextResponse.json({
      success: true,
      result: result
    })

  } catch (error) {
    console.error('=== TEST LLM ERROR ===')
    console.error('Error:', error)
    return NextResponse.json({ 
      error: 'LLM test failed', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}