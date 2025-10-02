import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  const dataDir = join(process.cwd(), 'data')
  const viewsFilePath = join(dataDir, 'views.json')
  
  try {
    // Ensure data directory exists
    await mkdir(dataDir, { recursive: true })
    
    // Read existing views data
    let viewsData: Record<string, number> = {}
    try {
      const data = await readFile(viewsFilePath, 'utf-8')
      viewsData = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty object
      viewsData = {}
    }

    // Increment view count for this slug
    viewsData[slug] = (viewsData[slug] || 0) + 1

    // Write updated data back to file
    await writeFile(viewsFilePath, JSON.stringify(viewsData, null, 2))

    return {
      slug,
      views: viewsData[slug]
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update views data'
    })
  }
})

