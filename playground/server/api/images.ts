// Type declaration for Nuxt server API
declare const defineEventHandler: (handler: () => any) => any

export default defineEventHandler(() => {
  return {
    images: [
      {
        id: 1,
        title: 'Sample Image 1',
        uri: 'public://sample1.jpg',
        alt: 'A sample image for testing',
        width: 1920,
        height: 1080
      },
      {
        id: 2,
        title: 'Sample Image 2',
        uri: 'public://sample2.jpg',
        alt: 'Another sample image',
        width: 800,
        height: 600
      },
      {
        id: 3,
        title: 'Sample Image 3',
        uri: 'public://sample3.jpg',
        alt: 'Yet another sample image',
        width: 1200,
        height: 800
      },
      {
        id: 4,
        title: 'Portrait Image',
        uri: 'public://portrait.jpg',
        alt: 'A portrait orientation image',
        width: 768,
        height: 1024
      },
      {
        id: 5,
        title: 'Square Image',
        uri: 'public://square.jpg',
        alt: 'A square image',
        width: 500,
        height: 500
      }
    ]
  }
})
