import { useEffect, useRef } from 'react'

const EMOJIS = ['🧠', '🔥', '💀', '🤡', '⚡', '🫠', '🌀', '👁️', '🎭', '💊']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  emoji: string
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const count = 15

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 16 + Math.random() * 20,
        opacity: 0.08 + Math.random() * 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50
        if (p.y < -50) p.y = canvas.height + 50
        if (p.y > canvas.height + 50) p.y = -50

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.font = `${p.size}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.emoji, 0, 0)
        ctx.restore()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
