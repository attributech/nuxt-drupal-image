/**
 * Mock implementation of the useImageUrl composable for testing
 */

// Variable to control the server URL in tests
let _mockServerUrl = 'https://example.com'

export function setMockServerUrl(url: string): void {
  _mockServerUrl = url
}

export function getMockServerUrl(): string {
  return _mockServerUrl
}

export default function useImageUrlMock(imageUri: string, style: string): string {
  // Get the server URL from the mock config
  const serverUrl = _mockServerUrl || ''

  // Extract the file path from the URI
  const imageFilePath = imageUri.replace('public://', '')

  // Build and return the URL
  return `${serverUrl}/sites/default/files/styles/${style}/public/${encodeURIComponent(imageFilePath)}`
}
