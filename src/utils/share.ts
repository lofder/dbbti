import { toJpeg } from 'html-to-image'

export type ShareStatus = 'ok' | 'saved' | 'opened' | 'error'

const RENDER_OPTS = {
  quality: 0.88,
  pixelRatio: 2,
  backgroundColor: '#0a0a0f',
  cacheBust: true,
}

async function renderToBlob(element: HTMLElement): Promise<Blob> {
  await toJpeg(element, RENDER_OPTS).catch(() => {})
  await new Promise((r) => setTimeout(r, 400))
  const dataUrl = await toJpeg(element, RENDER_OPTS)
  const res = await fetch(dataUrl)
  return res.blob()
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = filename
  link.href = url
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 30000)
}

export async function downloadShareCard(
  element: HTMLElement,
  filename: string = 'dbbti-result.jpg',
): Promise<ShareStatus> {
  let blob: Blob

  try {
    blob = await renderToBlob(element)
  } catch {
    return 'error'
  }

  const file = new File([blob], filename, { type: 'image/jpeg' })

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] })
      return 'ok'
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return 'ok'
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
