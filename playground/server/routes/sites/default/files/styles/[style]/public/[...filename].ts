import { defineEventHandler, getRouterParams, createError } from 'h3'
import { join } from 'path'
import { existsSync } from 'fs'
import sharp from 'sharp'
import { readFileSync } from 'fs'

// Define the ImageStyle interface locally
interface ImageStyle {
  name: string
  width: number
}

/**
 * Server route to handle image resizing
 * Matches the URL pattern used by Drupal image styles:
 * /sites/default/files/styles/:style/public/:filename
 */
export default defineEventHandler(async (event) => {
  // Get route parameters
  const params = getRouterParams(event)
  const style = params.style
  const filename = Array.isArray(params.filename) 
    ? params.filename.join('/') 
    : params.filename

  // Get the image styles configuration from nuxt.config.ts
  // Read and parse the config file directly
  const configPath = join(process.cwd(), 'nuxt.config.ts')
  const configContent = readFileSync(configPath, 'utf-8')
  
  // Extract the image styles from the config using regex
  // This is a simple approach - in a real app you might want to use a more robust method
  const styleMatch = configContent.match(/defaultImageStyles:\s*\[([\s\S]*?)\]/)
  const imageStyles: ImageStyle[] = []
  
  if (styleMatch && styleMatch[1]) {
    // Parse the styles from the config text
    const stylesText = styleMatch[1]
    const styleRegex = /{\s*name:\s*['"]([^'"]+)['"]\s*,\s*width:\s*(\d+)\s*}/g
    let match
    
    while ((match = styleRegex.exec(stylesText)) !== null) {
      imageStyles.push({
        name: match[1],
        width: parseInt(match[2], 10)
      })
    }
  }
  
  // Find the requested style in the Nuxt configuration
  let styleConfig = imageStyles.find((s: ImageStyle) => s.name === style)
  
  // If not found in the Nuxt configuration, check for custom styles
  if (!styleConfig) {
    // Define custom styles that might be used in the advanced examples
    const customStyles: ImageStyle[] = [
      { name: 'custom_small', width: 400 },
      { name: 'custom_medium', width: 800 },
      { name: 'custom_large', width: 1200 },
      { name: 'custom_xlarge', width: 1600 },
    ]
    
    styleConfig = customStyles.find((s: ImageStyle) => s.name === style)
    
    if (!styleConfig) {
      throw createError({
        statusCode: 404,
        statusMessage: `Image style "${style}" not found`
      })
    }
  }

  // Handle WebP extension
  let originalFilename = filename
  const isWebP = filename.toLowerCase().endsWith('.webp')
  
  if (isWebP) {
    // Remove .webp extension to find the original image
    originalFilename = filename.slice(0, -5)
  }

  try {
    // Create a solid color image with text
    const svg = `
      <svg width="${styleConfig.width}" height="${styleConfig.width * 0.66}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#D3D3D3"/>
        <text x="50%" y="50%" font-family="Arial" font-size="42" fill="black" text-anchor="middle" dominant-baseline="middle">
          Style: ${styleConfig.name}
          Width:  ${styleConfig.width}
        </text>
      </svg>
    `
      
    // Process the image with Sharp
    const transformer = sharp(Buffer.from(svg))
      .resize({
        width: styleConfig.width,
        withoutEnlargement: true
      })
    
    // Determine output format based on the requested format
    if (isWebP) {
      transformer.webp({ quality: 80 })
      event.node.res.setHeader('Content-Type', 'image/webp')
    } else {
      transformer.jpeg({ quality: 80 })
      event.node.res.setHeader('Content-Type', 'image/jpeg')
    }

    // Return the processed image as a buffer
    const buffer = await transformer.toBuffer()
    event.node.res.end(buffer)
    return
  } catch (error) {
    console.error('Error processing image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing image'
    })
  }
})
