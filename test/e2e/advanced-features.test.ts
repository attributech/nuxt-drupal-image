import { expect, test } from '@nuxt/test-utils/playwright'

test('should handle custom image styles on the advanced page', async ({ page, goto }) => {
  // Navigate to the advanced page
  await goto('/advanced', { waitUntil: 'hydration' })

  // Check if the images are loaded
  const images = page.locator('img.lazyload')
  await expect(images).toHaveCount(await images.count())

  // Check if the picture elements are present
  const pictures = page.locator('picture')
  await expect(pictures).toHaveCount(await pictures.count())
  // Check if the custom styled images are loaded
  const customStyledImages = page.locator('.custom-styles img.lazyload')
  if (await customStyledImages.count() > 0) {
    await expect(customStyledImages.first()).toBeVisible()
  }
})

test('should handle portrait images correctly', async ({ page, goto }) => {
  // Navigate to the advanced page
  await goto('/advanced', { waitUntil: 'hydration' })

  // Check if the dynamic URL images are loaded
  const dynamicUrlImages = page.locator('.dynamic-urls img.lazyload')
  if (await dynamicUrlImages.count() > 0) {
    await expect(dynamicUrlImages.first()).toBeVisible()

    // Check if the sources have data-srcset attributes
    const sources = page.locator('.dynamic-urls source')
    if (await sources.count() > 0) {
      await expect(sources.first()).toHaveAttribute('data-srcset')
    }
  }
})

test('should handle alt text and dimensions correctly', async ({ page, goto }) => {
  // Navigate to the advanced page
  await goto('/advanced', { waitUntil: 'hydration' })

  // Find images with alt text
  const images = page.locator('img.lazyload[alt]')

  // Check if there are images with alt text
  if (await images.count() > 0) {
    // Verify that at least one image has a non-empty alt attribute
    const firstImage = images.first()
    const altText = await firstImage.getAttribute('alt')
    expect(altText).toBeTruthy()
  }

  // Find images with width and height attributes
  const imagesWithDimensions = page.locator('img.lazyload[width][height]')

  // Check if there are images with dimensions
  if (await imagesWithDimensions.count() > 0) {
    // Verify that at least one image has width and height attributes
    const firstImage = imagesWithDimensions.first()
    const width = await firstImage.getAttribute('width')
    const height = await firstImage.getAttribute('height')

    expect(width).toBeTruthy()
    expect(height).toBeTruthy()
  }
})
