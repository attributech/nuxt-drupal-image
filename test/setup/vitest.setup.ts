import { afterEach, vi } from 'vitest'
import { config } from '@vue/test-utils'

// Reset all mocks after each test
afterEach(() => {
  vi.resetAllMocks()
})

// Global Vue test utils configuration
config.global.stubs = {
  // Add any global stubs here if needed
}
