/**
 * Composable for building Drupal image style URLs
 *
 * Works with both Nuxt 2 (with Bridge) and Nuxt 3
 */

import { useRuntimeConfig } from '#imports'

/**
 * Builds a URL for a Drupal image with a specific image style
 *
 * @param imageUri - The Drupal image URI (e.g., 'public://image.jpg')
 * @param style - The Drupal image style name (e.g., 'thumbnail', 'large')
 * @returns The complete URL to the styled image
 */
export default function useImageUrl(imageUri: string, style: string): string {
  const config = useRuntimeConfig()

  // Handle both Nuxt 2 and Nuxt 3 config structures
  const serverUrl = config.public?.serverUrl || config.serverUrl || ''

  const imageBaseUrl = serverUrl + '/sites/default/files/styles'
  const imageFilePath = imageUri.replace('public://', '')

  return `${imageBaseUrl}/${style}/public/${encodeURIComponent(imageFilePath)}`
}
