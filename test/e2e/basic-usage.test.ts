import { test, expect } from '@playwright/test'

test('should load and display images correctly on the index page', async ({ page }) => {
  // Navigate to the index page of the playground
  await page.goto('/')

  // Wait for the page to load
  await page.waitForLoadState('networkidle')

  // Check if the page title is correct
  await expect(page).toHaveTitle(/Nuxt Drupal Image/)

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

  // Check if the sources have the correct attributes
  const webpSource = page.locator('source[type="image/webp"]')
  await expect(webpSource).toHaveAttribute('data-srcset')

  const jpegSource = page.locator('source[type="image/jpeg"]')
  await expect(jpegSource).toHaveAttribute('data-srcset')
})
