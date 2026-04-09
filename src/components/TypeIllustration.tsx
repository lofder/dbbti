import { motion } from 'framer-motion'

interface TypeIllustrationProps {
  image: string
  title: string
  isHidden?: boolean
}

export default function TypeIllustration({ image, title, isHidden }: TypeIllustrationProps) {
  if (isHidden) {
    return (
      <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto' }}>
        {/* Outer holographic glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -6,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #a855f7, #60a5fa, #f472b6, #fb923c, #34d399, #a855f7)',
            backgroundSize: '200% 200%',
            animation: 'shimmer-border 3s linear infinite',
            opacity: 0.5,
            filter: 'blur(2px)',
          }}
        />
        {/* Inner card */}
        <div style={{
          position: 'absolute', inset: 2, borderRadius: 22, overflow: 'hidden',
          background: '#0a0a14',
        }}>
          <motion.img
            src={image}
            alt={title}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Rainbow overlay */}
          <div
            className="holographic-bg"
            style={{ position: 'absolute', inset: 0, opacity: 0.12, mixBlendMode: 'overlay' }}
          />
        </div>
        {/* Pulsing rings */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', inset: -16 - i * 18, borderRadius: 32 + i * 8,
              border: '1px solid rgba(168,85,247,0.08)',
            }}
            animate={{ scale: [0.95, 1.04, 0.95], opacity: [0.3, 0.06, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        {/* HIDDEN badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="holographic-bg"
          style={{
            position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em',
            padding: '3px 14px', borderRadius: 20,
          }}
        >
          <span style={{ color: '#0a0a14' }}>HIDDEN</span>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
      {/* Subtle glow behind */}
      <div style={{
        position: 'absolute', inset: -12, borderRadius: 28,
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />
      {/* Image card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        style={{
          position: 'relative', width: '100%', height: '100%',
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  )
}
