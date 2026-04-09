import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current + 1) / total) * 100

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-2)', fontVariantNumeric: 'tabular-nums' }}>
          {current + 1}<span style={{ color: 'var(--color-text-4)', fontWeight: 400 }}> / {total}</span>
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-4)', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            borderRadius: 2,
            background: 'linear-gradient(90deg, #5e6ad2, #7170ff)',
            boxShadow: '0 0 8px rgba(113,112,255,0.3)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  )
}
