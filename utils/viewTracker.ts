/**
 * Track a view for a specific blog post
 * @param slug - The blog post slug
 * @returns Promise with updated view count
 */
export async function trackView(slug: string): Promise<number> {
  try {
    const response = await $fetch(`/api/views/${slug}`, {
      method: 'POST'
    })
    return response.views
  } catch (error) {
    console.error('Failed to track view:', error)
    return 0
  }
}

/**
 * Get view count for a specific blog post
 * @param slug - The blog post slug
 * @returns Promise with view count
 */
export async function getViewCount(slug: string): Promise<number> {
  try {
    const response = await $fetch(`/api/views/${slug}`, {
      method: 'GET'
    })
    return response.views
  } catch (error) {
    console.error('Failed to get view count:', error)
    return 0
  }
}

/**
 * Format view count for display
 * @param count - The view count
 * @returns Formatted string
 */
export function formatViewCount(count: number): string {
  if (count === 0) return 'No views'
  if (count === 1) return '1 view'
  if (count < 1000) return `${count} views`
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K views`
  return `${(count / 1000000).toFixed(1)}M views`
}

