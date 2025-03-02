#!/usr/bin/env node

/**
 * This script downloads placeholder images for the playground
 * Run with: node scripts/download-images.js
 */

import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'

const imagesDir = path.resolve(process.cwd(), 'public/images')

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// List of placeholder images to download
const images = [
  {
    name: 'sample1.jpg',
    url: 'https://picsum.photos/1920/1080',
  },
  {
    name: 'sample2.jpg',
    url: 'https://picsum.photos/800/600',
  },
  {
    name: 'sample3.jpg',
    url: 'https://picsum.photos/1200/800',
  },
  {
    name: 'portrait.jpg',
    url: 'https://picsum.photos/768/1024',
  },
  {
    name: 'square.jpg',
    url: 'https://picsum.photos/500/500',
  },
]

// Download each image
for (const image of images) {
  const filePath = path.join(imagesDir, image.name)
  console.log(`Downloading ${image.name}...`)

  const file = fs.createWriteStream(filePath)

  https.get(image.url, (response) => {
    response.pipe(file)

    file.on('finish', () => {
      file.close()
      console.log(`Downloaded ${image.name}`)
    })
  }).on('error', (err) => {
    fs.unlink(filePath, () => {})
    console.error(`Error downloading ${image.name}: ${err.message}`)
  })
}
