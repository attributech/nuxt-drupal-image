import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    exclude: [
      'test/e2e/**',
      'node_modules/**',
      'playground/node_modules/**',
    ],
    environment: 'jsdom',
    coverage: {
      exclude: [
        '**virtual**',
        '**/.nuxt',
        'node_modules',
        'playground',
        'test',
      ],
    },
  },
})
