import { motion } from 'framer-motion'
import type { Question } from '../data/questions'

interface QuestionCardProps {
  question: Question
  selectedValue?: number
  onSelect: (value: number) => void
  direction: number
}

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 180 : -180, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -180 : 180, opacity: 0 }),
}

const LABELS = ['A', '🤷', 'B']

export default function QuestionCard({ question, selectedValue, onSelect, direction }: QuestionCardProps) {
  const options = [
    { value: 2, ...question.optionA },
    { value: 0, ...question.optionNeutral },
    { value: -2, ...question.optionB },
  ]

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Question text */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.5,
          color: 'var(--color-text-1)',
          marginBottom: '40px',
          padding: '0 8px',
        }}
      >
        {question.text}
      </h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt, i) => {
          const selected = selectedValue === opt.value
          const isNeutral = opt.value === 0

          return (
            <motion.button
              key={i}
              onClick={() => onSelect(opt.value)}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.99 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                textAlign: 'left',
                padding: '18px 20px',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: selected
                  ? 'rgba(113,112,255,0.1)'
                  : 'rgba(255,255,255,0.02)',
                border: selected
                  ? '1px solid rgba(113,112,255,0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: selected
                  ? '0 0 24px rgba(113,112,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.02)',
              }}
            >
              {/* Label badge */}
              <span
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isNeutral ? '1rem' : '0.75rem',
                  fontWeight: 600,
                  background: selected
                    ? 'rgba(113,112,255,0.2)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${selected ? 'rgba(113,112,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  color: selected ? '#a5b4fc' : 'var(--color-text-4)',
                  transition: 'all 0.2s',
                }}
              >
                {LABELS[i]}
              </span>

              {/* Emoji */}
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                {opt.emoji}
              </span>

              {/* Text */}
              <span
                style={{
                  fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
                  lineHeight: 1.5,
                  color: selected ? 'var(--color-text-1)' : 'var(--color-text-2)',
                  transition: 'color 0.2s',
                }}
              >
                {opt.text}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
