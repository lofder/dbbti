import { toPng } from 'html-to-image'

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export async function downloadShareCard(
  element: HTMLElement,
  filename: string = 'dbbti-result.png',
): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#0a0a0f',
    })

    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const file = new File([blob], filename, { type: 'image/png' })

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] })
      return true
    }

    if (isIOS()) {
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
      return true
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 10000)
    return true
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return true
    return false
  }
}
