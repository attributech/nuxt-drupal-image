import { vi } from 'vitest'
import type { ImageStyle } from '../../src/types'

/**
 * Mock the Nuxt runtime config with a custom server URL
 * @param serverUrl The server URL to use in the mock
 */
export async function mockRuntimeConfig(serverUrl: string = 'https://example.com') {
  // Import from #imports (not using the import directly)
  await import('#imports')

  // Create a mock implementation
  const mockImplementation = vi.fn().mockReturnValue({
    public: {
      serverUrl,
    },
  })

  // Override the imported function with our mock
  vi.stubGlobal('useRuntimeConfig', mockImplementation)

  return mockImplementation
}

/**
 * Create a set of test image styles
 */
export function createTestImageStyles(): ImageStyle[] {
  return [
    { name: 'test_xs', width: 320 },
    { name: 'test_s', width: 640 },
    { name: 'test_m', width: 960 },
    { name: 'test_l', width: 1280 },
    { name: 'test_xl', width: 1920 },
  ]
}

/**
 * Create a test image URI
 */
export function createTestImageUri(): string {
  return 'public://test-image.jpg'
}
