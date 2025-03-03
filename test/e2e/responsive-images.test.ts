import { test, expect } from '@playwright/test'

test('should load responsive images on the responsive page', async ({ page }) => {
  // Navigate to the responsive page of the playground
  await page.goto('/responsive')

  // Wait for the page to load
  await page.waitForLoadState('networkidle')

  // Check if the page has the responsive examples
  const heading = page.locator('h1:has-text("Responsive Images")')
  await expect(heading).toBeVisible()

  // Check if the images are loaded
  const images = page.locator('img.lazyload')
  await expect(images).toHaveCount(await images.count())

  // Check if the picture elements are present
  const pictures = page.locator('picture')
  await expect(pictures).toHaveCount(await pictures.count())

  // Check if source elements have sizes attribute
  const sources = page.locator('source')
  await expect(sources.first()).toHaveAttribute('sizes', 'auto')
})

test('should adapt to different viewport sizes', async ({ page }) => {
  // Navigate to the responsive page
  await page.goto('/responsive')
  await page.waitForLoadState('networkidle')

  // Get image element
  const image = page.locator('img.lazyload').first()

  // Resize viewport to mobile size
  await page.setViewportSize({ width: 375, height: 667 })
  await page.waitForTimeout(500) // Wait for resize to take effect

  // Get new image dimensions
  const mobileBoundingBox = await image.boundingBox()

  // Resize viewport to desktop size
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.waitForTimeout(500) // Wait for resize to take effect

  // Get desktop image dimensions
  const desktopBoundingBox = await image.boundingBox()

  // Verify that image dimensions changed with viewport size
  expect(mobileBoundingBox && desktopBoundingBox).toBeTruthy()
  if (mobileBoundingBox && desktopBoundingBox) {
    expect(mobileBoundingBox.width).toBeLessThan(desktopBoundingBox.width)
  }
})
