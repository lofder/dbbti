import { toCanvas } from 'html-to-image'

const RENDER_OPTS = {
  pixelRatio: 2,
  backgroundColor: '#0a0a0f',
  cacheBust: true,
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('canvas.toBlob failed'))),
      'image/jpeg',
      0.88,
    )
  })
}

let _cachedUrl: string | null = null

export async function preRenderShareCard(element: HTMLElement): Promise<void> {
  try {
    await toCanvas(element, RENDER_OPTS).catch(() => {})
    await new Promise((r) => setTimeout(r, 500))
    const canvas = await toCanvas(element, RENDER_OPTS)
    const blob = await canvasToBlob(canvas)
    if (_cachedUrl) URL.revokeObjectURL(_cachedUrl)
    _cachedUrl = URL.createObjectURL(blob)
  } catch {
    _cachedUrl = null
  }
}

export async function generateShareImage(element: HTMLElement): Promise<string | null> {
  if (_cachedUrl) return _cachedUrl
  try {
    await toCanvas(element, RENDER_OPTS).catch(() => {})
    await new Promise((r) => setTimeout(r, 500))
    const canvas = await toCanvas(element, RENDER_OPTS)
    const blob = await canvasToBlob(canvas)
    _cachedUrl = URL.createObjectURL(blob)
    return _cachedUrl
  } catch {
    return null
  }
}
