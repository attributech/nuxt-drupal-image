import { expect, test } from '@nuxt/test-utils/playwright'

test('should load and display images correctly on the index page', async ({ page, goto }) => {
  // Navigate to the index page
  await goto('/', { waitUntil: 'hydration' })

  // Check if the images are loaded
  const images = page.locator('img.lazyload')
  await expect(images).toHaveCount(await images.count())

  // Check if at least one image is visible
  await expect(images.first()).toBeVisible()

  // Check if the picture elements are present
  const pictures = page.locator('picture')
  await expect(pictures).toHaveCount(await pictures.count())

  // Check if source elements are present for webp and default formats
  const sources = page.locator('source')
  await expect(sources).toHaveCount(await sources.count())
})
