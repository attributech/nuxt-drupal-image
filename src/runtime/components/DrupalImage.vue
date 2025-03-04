<template>
  <picture>
    <source
      :data-srcset="srcSetWebp"
      type="image/webp"
      sizes="auto"
    >
    <source
      :data-srcset="srcSetDefault"
      type="image/jpeg"
      sizes="auto"
    >
    <img
      ref="img"
      data-sizes="auto"
      :alt="alt || altFallback"
      :width="width || undefined"
      :height="height || undefined"
      class="lazyload"
      src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    >
  </picture>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useImageUrl } from '../composables'
import type { ImageStyle } from '../../types/index'

const img: Ref<HTMLImageElement | null> = ref(null)
const imageStyleBase = 'default'

export interface Props {
  uri: string
  width?: number | null
  height?: number | null
  alt?: string
  altFallback?: string
  sizes?: string
  imageStyles?: ImageStyle[]
}

const props = withDefaults(defineProps<Props>(), {
  width: null,
  height: null,
  alt: '',
  altFallback: '',
  sizes: '100vw',
  imageStyles: () => {
    return [
      { name: `${imageStyleBase}_xs`, width: 320 },
      { name: `${imageStyleBase}_s`, width: 640 },
      { name: `${imageStyleBase}_m`, width: 960 },
      { name: `${imageStyleBase}_l`, width: 1280 },
      { name: `${imageStyleBase}_xl`, width: 1440 },
      { name: `${imageStyleBase}_xxl`, width: 1920 },
      { name: `${imageStyleBase}_xxxl`, width: 2560 },
    ]
  },
})

const srcSetWebp = computed(() => {
  return srcSet('.webp')
})

const srcSetDefault = computed(() => {
  return srcSet()
})

function srcSet(suffix: string = ''): string {
  const srcSet: string[] = []
  props.imageStyles.forEach((imageStyle) => {
    const imageUrl = buildImageUrl(imageStyle, suffix)
    if (typeof imageUrl === 'string') {
      srcSet.push(imageUrl)
    }
  })
  return srcSet.join(', ')
}

function buildImageUrl(style: ImageStyle, suffix: string = ''): string | null {
  if (typeof props.uri === 'string') {
    return `${useImageUrl(props.uri, style.name)}${suffix} ${
      style.width
    }w`
  }
  return null
}

watch(
  () => props.uri,
  () => {
    img.value?.classList.add('lazyload')
  },
)
</script>

<style scoped>
picture,
img {
  display: block;
  width: 100%;
}
</style>
