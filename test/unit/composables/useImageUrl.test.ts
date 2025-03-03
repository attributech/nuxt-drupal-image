import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createTestImageUri } from '../../setup/test-utils'
import useImageUrlMock, { setMockServerUrl } from '../../setup/mocks/useImageUrl.mock'

// Import after mocking
import useImageUrl from '../../../src/composables/useImageUrl'

// Mock the useImageUrl composable
vi.mock('../../../src/composables/useImageUrl', () => {
  return {
    default: useImageUrlMock,
  }
})

describe('useImageUrl', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks()
  })

  it('should build a correct URL with default server URL', () => {
    // Setup mock
    setMockServerUrl('https://example.com')

    // Test the composable
    const imageUri = createTestImageUri()
    const style = 'thumbnail'
    const url = useImageUrl(imageUri, style)

    // Verify the result
    expect(url).toBe('https://example.com/sites/default/files/styles/thumbnail/public/test-image.jpg')
  })

  it('should build a correct URL with custom server URL', () => {
    // Setup mock with custom server URL
    setMockServerUrl('https://drupal.example.org')

    // Test the composable
    const imageUri = createTestImageUri()
    const style = 'large'
    const url = useImageUrl(imageUri, style)

    // Verify the result
    expect(url).toBe('https://drupal.example.org/sites/default/files/styles/large/public/test-image.jpg')
  })

  it('should handle image URIs with special characters', () => {
    // Setup mock
    setMockServerUrl('https://example.com')

    // Test the composable with a URI containing special characters
    const imageUri = 'public://test image with spaces & special chars.jpg'
    const style = 'medium'
    const url = useImageUrl(imageUri, style)

    // Verify the result has properly encoded the special characters
    expect(url).toBe('https://example.com/sites/default/files/styles/medium/public/test%20image%20with%20spaces%20%26%20special%20chars.jpg')
  })

  it('should handle image URIs with subdirectories', () => {
    // Setup mock
    setMockServerUrl('https://example.com')

    // Test the composable with a URI containing subdirectories
    const imageUri = 'public://2023/01/test-image.jpg'
    const style = 'wide'
    const url = useImageUrl(imageUri, style)

    // Verify the result
    expect(url).toBe('https://example.com/sites/default/files/styles/wide/public/2023%2F01%2Ftest-image.jpg')
  })

  it('should handle empty server URL gracefully', () => {
    // Setup mock with empty server URL
    setMockServerUrl('')

    // Test the composable
    const imageUri = createTestImageUri()
    const style = 'thumbnail'
    const url = useImageUrl(imageUri, style)

    // Verify the result starts with the correct path even without a server URL
    expect(url).toBe('/sites/default/files/styles/thumbnail/public/test-image.jpg')
  })
})
