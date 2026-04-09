import { toCanvas } from 'html-to-image'

export type ShareStatus = 'shared' | 'cancelled' | 'saved' | 'opened' | 'error'

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

let _cachedBlob: Blob | null = null

export async function preRenderShareCard(element: HTMLElement): Promise<void> {
  try {
    await toCanvas(element, RENDER_OPTS).catch(() => {})
    await new Promise((r) => setTimeout(r, 500))
    const canvas = await toCanvas(element, RENDER_OPTS)
    _cachedBlob = await canvasToBlob(canvas)
  } catch {
    _cachedBlob = null
  }
}

async function getBlob(element: HTMLElement): Promise<Blob> {
  if (_cachedBlob) return _cachedBlob
  await toCanvas(element, RENDER_OPTS).catch(() => {})
  await new Promise((r) => setTimeout(r, 500))
  const canvas = await toCanvas(element, RENDER_OPTS)
  _cachedBlob = await canvasToBlob(canvas)
  return _cachedBlob
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = filename
  link.href = url
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 120000)
}

export async function downloadShareCard(
  element: HTMLElement,
  filename: string = 'dbbti-result.jpg',
): Promise<ShareStatus> {
  let blob: Blob

  try {
    blob = await getBlob(element)
  } catch {
    return 'error'
  }

  const file = new File([blob], filename, { type: 'image/jpeg', lastModified: Date.now() })

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'DBBTI Result' })
      return 'shared'
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return 'cancelled'
  }

  try {
    downloadBlob(blob, filename)
    return 'saved'
  } catch {
    /* fall through */
  }

  try {
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    return 'opened'
  } catch {
    /* fall through */
  }

  return 'error'
}
