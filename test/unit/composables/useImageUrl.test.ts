import { describe, it, expect } from 'vitest'
import { createTestImageUri } from '../../setup/test-utils'
import { useImageUrl } from '../../../src/runtime/composables'

describe('useImageUrl', () => {
  it('should build a correct URL with default server URL', () => {
    const imageUri = createTestImageUri()
    const style = 'thumbnail'
    const url = useImageUrl(imageUri, style)

    expect(url).toBe('http://localhost:3000/sites/default/files/styles/thumbnail/public/test-image.jpg')
  })

  it('should handle image URIs with special characters', () => {
    const imageUri = 'public://test image with spaces & special chars.jpg'
    const style = 'medium'
    const url = useImageUrl(imageUri, style)

    expect(url).toBe('http://localhost:3000/sites/default/files/styles/medium/public/test%20image%20with%20spaces%20%26%20special%20chars.jpg')
  })

  it('should handle image URIs with subdirectories', () => {
    const imageUri = 'public://2023/01/test-image.jpg'
    const style = 'wide'
    const url = useImageUrl(imageUri, style)

    expect(url).toBe('http://localhost:3000/sites/default/files/styles/wide/public/2023%2F01%2Ftest-image.jpg')
  })
})
