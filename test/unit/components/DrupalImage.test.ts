import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestImageStyles, createTestImageUri } from '../../setup/test-utils'
import useImageUrlMock, { setMockServerUrl } from '../../setup/mocks/useImageUrl.mock'

// Import after mocking
import DrupalImage from '../../../src/runtime/components/DrupalImage.vue'

// Mock the useImageUrl composable
vi.mock('../../../src/composables/useImageUrl', () => {
  return {
    default: useImageUrlMock,
  }
})

// Mock the lazyload functionality
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    ref: vi.fn(val => ({ value: val })),
  }
})

describe('DrupalImage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()

    // Setup default mock
    setMockServerUrl('https://example.com')
  })

  it('should render the component with default props', () => {
    const imageUri = createTestImageUri()
    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
      },
    })

    // Check the component structure
    expect(wrapper.find('picture').exists()).toBe(true)
    expect(wrapper.findAll('source').length).toBe(2)
    expect(wrapper.find('img').exists()).toBe(true)

    // Check the img attributes
    const img = wrapper.find('img')
    expect(img.attributes('class')).toContain('lazyload')
    expect(img.attributes('alt')).toBe('')
    expect(img.attributes('src')).toBeDefined()
  })

  it('should set alt text correctly', () => {
    const imageUri = createTestImageUri()
    const altText = 'Test alt text'
    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
        alt: altText,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(altText)
  })

  it('should use altFallback when alt is not provided', () => {
    const imageUri = createTestImageUri()
    const altFallback = 'Fallback alt text'
    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
        altFallback,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(altFallback)
  })

  it('should set width and height attributes when provided', () => {
    const imageUri = createTestImageUri()
    const width = 800
    const height = 600
    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
        width,
        height,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe(width.toString())
    expect(img.attributes('height')).toBe(height.toString())
  })

  it('should generate correct srcset for default and webp formats', () => {
    const imageUri = createTestImageUri()
    const customStyles = createTestImageStyles()

    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
        imageStyles: customStyles,
      },
    })

    const sources = wrapper.findAll('source')

    // Check webp source
    const webpSource = sources[0]
    expect(webpSource.attributes('type')).toBe('image/webp')
    expect(webpSource.attributes('data-srcset')).toContain('.webp')
    expect(webpSource.attributes('data-srcset')).toContain('320w')
    expect(webpSource.attributes('data-srcset')).toContain('640w')

    // Check default source
    const defaultSource = sources[1]
    expect(defaultSource.attributes('type')).toBe('image/jpeg')
    expect(defaultSource.attributes('data-srcset')).not.toContain('.webp')
    expect(defaultSource.attributes('data-srcset')).toContain('320w')
    expect(defaultSource.attributes('data-srcset')).toContain('640w')
  })

  it('should use custom image styles when provided', () => {
    const imageUri = createTestImageUri()
    const customStyles = [
      { name: 'custom_small', width: 400 },
      { name: 'custom_medium', width: 800 },
      { name: 'custom_large', width: 1200 },
    ]

    const wrapper = mount(DrupalImage, {
      props: {
        uri: imageUri,
        imageStyles: customStyles,
      },
    })

    const sources = wrapper.findAll('source')

    // Check that custom styles are used in srcset
    const defaultSource = sources[1]
    const srcset = defaultSource.attributes('data-srcset')

    expect(srcset).toContain('custom_small')
    expect(srcset).toContain('custom_medium')
    expect(srcset).toContain('custom_large')
    expect(srcset).toContain('400w')
    expect(srcset).toContain('800w')
    expect(srcset).toContain('1200w')
  })
})
