import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useT } from '../i18n/useGameData'

export default function LoadingScreen() {
  const t = useT()
  const messages = t.loadingMessages
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const mt = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 400)
    const pt = setInterval(() => setProgress((p) => Math.min(p + 2, 100)), 42)
    return () => { clearInterval(mt); clearInterval(pt) }
  }, [messages.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col items-center justify-center"
      style={{ padding: '40px 24px' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        style={{ fontSize: 'clamp(3rem, 7vw, 4rem)' }}
      >
        🧠
      </motion.div>

      <div style={{ height: 28, overflow: 'hidden', marginTop: '28px' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              textAlign: 'center',
              color: 'var(--color-text-3)',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            }}
          >
            {messages[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div style={{
        width: 200, height: 4, marginTop: '28px',
        borderRadius: 2, overflow: 'hidden',
        background: 'rgba(255,255,255,0.05)',
      }}>
        <motion.div
          style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            boxShadow: '0 0 8px rgba(245,158,11,0.25)',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.08 }}
        />
      </div>
    </motion.div>
  )
}
