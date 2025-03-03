import { vi } from 'vitest'

// Mock the useRuntimeConfig function from Nuxt
export const useRuntimeConfig = vi.fn(() => ({
  public: {
    serverUrl: 'https://example.com',
  },
}))
