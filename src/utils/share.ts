import { toPng } from 'html-to-image'

export async function downloadShareCard(element: HTMLElement, filename: string = 'dbbti-result.png') {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#0a0a0f',
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()
    return true
  } catch {
    return false
  }
}
