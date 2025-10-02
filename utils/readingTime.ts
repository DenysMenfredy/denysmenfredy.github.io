/**
 * Calculate reading time based on text content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Object with reading time in minutes and formatted string
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200) {
  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  
  // Count words
  const wordCount = cleanText.split(' ').filter(word => word.length > 0).length
  
  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  
  // Format reading time
  const formatReadingTime = (minutes: number): string => {
    if (minutes === 1) return '1 min read'
    return `${minutes} min read`
  }
  
  return {
    wordCount,
    readingTimeMinutes,
    formattedTime: formatReadingTime(readingTimeMinutes)
  }
}

/**
 * Extract text content from markdown or HTML content
 * @param content - The content to extract text from
 * @returns Plain text content
 */
export function extractTextContent(content: string): string {
  // Remove markdown syntax
  let text = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/>\s*/g, '') // Remove blockquote markers
    .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
    .trim()
  
  return text
}
