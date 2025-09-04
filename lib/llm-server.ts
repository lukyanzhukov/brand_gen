import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AUTH_TOKEN || process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL || 'https://api.openai.com/v1',
})

/**
 * Безопасный парсинг JSON с fallback
 */
export async function safeJsonParse<T>(jsonString: string, fallback: T): Promise<T> {
  let cleanJson = ''
  try {
    // Очищаем markdown разметку
    cleanJson = jsonString.trim()
    
    // Убираем ```json и ``` если есть
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    
    // Ищем JSON объект в тексте (ищем как объект, так и массив)
    const jsonMatch = cleanJson.match(/(?:\[[\s\S]*\]|\{[\s\S]*\})/)
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
    console.error('Cleaned string:', (cleanJson || '').substring(0, 500) + '...')
    return fallback
  }
}

/**
 * Вызов OpenAI API с обработкой ошибок
 */
export async function callOpenAI(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  model: string = 'gpt-4o-mini',
  temperature: number = 0.7
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: 4000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content in response')
    }

    return content
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate content with AI')
  }
}

/**
 * Генерация JSON контента с помощью AI
 */
export async function generateJsonContent<T>(
  systemPrompt: string,
  userPrompt: string,
  fallback: T,
  model: string = 'gpt-4o-mini'
): Promise<T> {
  try {
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: userPrompt }
    ]

    const response = await callOpenAI(messages, model, 0.3)
    return await safeJsonParse(response, fallback)
  } catch (error) {
    console.error('Error generating JSON content:', error)
    return fallback
  }
}
