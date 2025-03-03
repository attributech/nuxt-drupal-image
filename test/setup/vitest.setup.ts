import { afterEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

// Create a mock Nuxt app instance
const mockNuxtApp = {
  provide: {
    runtimeConfig: { public: { serverUrl: 'https://example.com' } },
  },
}

// Mock the Nuxt functions
vi.mock('#imports', () => {
  return {
    useRuntimeConfig: () => mockNuxtApp.provide.runtimeConfig,
    useNuxtApp: () => mockNuxtApp,
  }
})

// Export the mock config for tests to use
export const mockConfig = mockNuxtApp.provide.runtimeConfig

// Reset all mocks after each test
afterEach(() => {
  vi.resetAllMocks()
})

// Global Vue test utils configuration
config.global.stubs = {
  // Add any global stubs here if needed
}
