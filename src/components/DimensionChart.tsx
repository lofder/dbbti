import { motion } from 'framer-motion'
import type { DimensionScores } from '../utils/calculate'
import { getPercentage } from '../utils/calculate'
import { useDimensions } from '../i18n/useGameData'

interface DimensionChartProps {
  scores: DimensionScores
  breakdown: { energy: string; social: string; drive: string; expression: string }
}

function Bar({ score, color, delay }: { score: number; color: string; delay: number }) {
  const pct = getPercentage(score)
  const isPositive = score > 0
  const isZero = score === 0

  return (
    <div style={{
      position: 'relative',
      height: 10,
      borderRadius: 5,
      background: 'rgba(255,255,255,0.04)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0,
        width: 1, background: 'rgba(255,255,255,0.12)', zIndex: 2,
      }} />

      {!isZero && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct / 2}%` }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            ...(isPositive
              ? { left: '50%', borderRadius: '0 5px 5px 0' }
              : { right: '50%', borderRadius: '5px 0 0 5px' }),
            background: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      )}
    </div>
  )
}

export default function DimensionChart({ scores, breakdown }: DimensionChartProps) {
  const dimensions = useDimensions()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {dimensions.map((dim, i) => {
        const score = scores[dim.id]
        const pct = getPercentage(score)
        const isPositive = score > 0
        const activeLabel = isPositive ? dim.labelA : dim.labelB

        return (
          <motion.div
            key={dim.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-2)' }}>
                {dim.name}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: dim.color }}>
                {activeLabel} {pct}%
              </span>
            </div>

            <Bar score={score} color={dim.color} delay={0.3 + i * 0.12} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-4)' }}>{dim.labelB}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-4)' }}>{dim.labelA}</span>
            </div>

            <p style={{ marginTop: '14px', fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--color-text-2)' }}>
              {breakdown[dim.id]}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
