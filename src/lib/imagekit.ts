import ImageKit from 'imagekit'

// Client-side configuration (safe for browser)
export const imagekitConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
}

// Server-side ImageKit instance (with private key) - only for API routes
export function createServerImageKit() {
  return new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  })
}

// Helper functions
export function getImageKitUrl(filePath: string, transformations?: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
  const transformString = transformations ? `tr=${transformations.join(',')}` : ''
  return transformString ? `${baseUrl}/${filePath}?${transformString}` : `${baseUrl}/${filePath}`
}

export function getOptimizedImageUrl(
  filePath: string, 
  width?: number, 
  height?: number, 
  quality = 80
) {
  const transformations = []
  
  if (width) transformations.push(`w-${width}`)
  if (height) transformations.push(`h-${height}`)
  transformations.push(`q-${quality}`)
  
  return getImageKitUrl(filePath, transformations)
}