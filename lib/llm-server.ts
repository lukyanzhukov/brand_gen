import OpenAI from 'openai'

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.AUTH_TOKEN,
    baseURL: process.env.BASE_URL || 'https://api.openai.com/v1',
  })
}

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
    
    // Исправляем проблемные символы
    cleanJson = cleanJson.replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Убираем управляющие символы
    
    return JSON.parse(cleanJson)
  } catch (error) {
    console.error('Error parsing JSON:', error)
    console.error('Original string length:', jsonString.length)
    console.error('Original string preview:', jsonString.substring(0, 200) + '...')
    console.error('Cleaned string length:', cleanJson.length)
    console.error('Cleaned string preview:', cleanJson.substring(0, 200) + '...')
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
    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: 4000,
    }, {
      timeout: 120000, // 2 минуты таймаут
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content in response')
    }

    return content
  } catch (error) {
    console.error('OpenAI API error:', error)
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        throw new Error('Invalid API key. Please check your OpenAI API key configuration.')
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please check your OpenAI account.')
      }
    }
    throw new Error('Failed to generate content with AI: ' + (error instanceof Error ? error.message : 'Unknown error'))
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

/**
 * Генерация JSON контента с изображением
 */
export async function generateJsonContentWithImage<T>(
  systemPrompt: string,
  userPrompt: string,
  fallback: T,
  model: string = 'gpt-4o',
  imageBase64?: string | null
): Promise<T> {
  try {
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string | Array<{ type: 'text' | 'image_url'; text?: string; image_url?: { url: string } }> }> = [
      { role: 'system' as const, content: systemPrompt }
    ]

    if (imageBase64) {
      // Если есть изображение, создаем мультимодальное сообщение
      messages.push({
        role: 'user' as const,
        content: [
          { type: 'text', text: userPrompt },
          { 
            type: 'image_url', 
            image_url: { url: imageBase64 }
          }
        ]
      })
    } else {
      // Если нет изображения, используем обычный текст
      messages.push({ role: 'user' as const, content: userPrompt })
    }

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model,
      messages: messages as any,
      temperature: 0.3,
      max_tokens: 4000,
    }, {
      timeout: 120000, // 2 минуты таймаут
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content in response')
    }

    return await safeJsonParse(content, fallback)
  } catch (error) {
    console.error('Error generating JSON content with image:', error)
    return fallback
  }
}
