import { expect, test } from '@nuxt/test-utils/playwright'

test('should load responsive images on the responsive page', async ({ page, goto }) => {
  // Navigate to the responsive page
  await goto('/responsive', { waitUntil: 'hydration' })

  // Check if the images are loaded
  const images = page.locator('img.lazyload')
  await expect(images).toHaveCount(await images.count())

  // Check if the picture elements are present
  const pictures = page.locator('picture')
  await expect(pictures).toHaveCount(await pictures.count())
})
