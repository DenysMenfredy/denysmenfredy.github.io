import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  const viewsFilePath = join(process.cwd(), 'data', 'views.json')
  
  try {
    // Read existing views data
    let viewsData: Record<string, number> = {}
    try {
      const data = await readFile(viewsFilePath, 'utf-8')
      viewsData = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty object
      viewsData = {}
    }

    return {
      slug,
      views: viewsData[slug] || 0
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read views data'
    })
  }
})

