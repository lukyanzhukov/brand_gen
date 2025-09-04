/**
 * Нормализует URL логотипа из HH API
 */
export function normalizeLogoUrl(logoUrls?: {
  original?: string
  '90'?: string
  '240'?: string
}): string | null {
  if (!logoUrls) {
    return null
  }

  // Приоритет: original > 240 > 90
  return logoUrls.original || logoUrls['240'] || logoUrls['90'] || null
}

/**
 * Проверяет валидность URL изображения
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * Получает размеры изображения (заглушка)
 */
export function getImageDimensions(url: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve(null)
    img.src = url
  })
}
