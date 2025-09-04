// Клиентские функции LLM (без инициализации OpenAI)
// Серверные функции находятся в lib/llm-server.ts

/**
 * Безопасный парсинг JSON с fallback
 */
export async function safeJsonParse<T>(jsonString: string, fallback: T): Promise<T> {
  let jsonMatch: RegExpMatchArray | null = null
  
  try {
    // Очищаем markdown разметку
    let cleanJson = jsonString.trim()
    
    // Убираем ```json и ``` если есть
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
    // Ищем JSON объект в тексте (ищем как объект, так и массив)
    jsonMatch = cleanJson.match(/(?:\[[\s\S]*\]|\{[\s\S]*\})/)
    if (jsonMatch) {
      cleanJson = jsonMatch[0]
    }
    
    // Убираем комментарии и лишние символы
    cleanJson = cleanJson.replace(/\/\*[\s\S]*?\*\//g, '') // Убираем /* комментарии */
    cleanJson = cleanJson.replace(/\/\/.*$/gm, '') // Убираем // комментарии
    
    return JSON.parse(cleanJson)
  } catch (error) {
    console.error('Error parsing JSON:', error)
    console.error('Original string:', jsonString.substring(0, 500) + '...')
    console.error('Cleaned string:', (jsonMatch?.[1] || '').substring(0, 500) + '...')
    return fallback
  }
}