import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useCallback, useState, useEffect } from 'react'
import { useQuestions, useT, useBonusQuestion } from '../i18n/useGameData'
import { calculateScores, isBalanced } from '../utils/calculate'
import type { BonusOption } from '../data/questions'

interface QuizFlowProps {
  onComplete: (answers: Record<number, number>, bonusAnswer?: BonusOption | null) => void
}

const LABELS = ['A', '~', 'B']

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const questions = useQuestions()
  const bonus = useBonusQuestion()
  const t = useT()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showBonus, setShowBonus] = useState(false)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])
  const bonusRef = useRef<HTMLDivElement | null>(null)
  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length
  const pct = Math.round((answeredCount / questions.length) * 100)

  const selectAnswer = useCallback((qId: number, value: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [qId]: value }
      const qIdx = questions.findIndex((q) => q.id === qId)
      if (qIdx < questions.length - 1) {
        setTimeout(() => {
          questionRefs.current[qIdx + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 300)
      }
      return next
    })
  }, [questions])

  const handleSubmit = useCallback(() => {
    if (!allAnswered) return
    const scores = calculateScores(answers)
    if (isBalanced(scores)) {
      setShowBonus(true)
      setTimeout(() => {
        bonusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 200)
    } else {
      onComplete(answers)
    }
  }, [allAnswered, answers, onComplete])

  const handleBonusSelect = useCallback((opt: BonusOption) => {
    onComplete(answers, opt)
  }, [answers, onComplete])

  useEffect(() => {
    questionRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100dvh', paddingBottom: 120 }}
    >
      {/* Sticky progress */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '16px 24px 12px',
        background: 'linear-gradient(to bottom, var(--color-bg-base) 60%, transparent)',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-2)', fontVariantNumeric: 'tabular-nums' }}>
              {answeredCount}<span style={{ color: 'var(--color-text-4)', fontWeight: 400 }}> / {questions.length}</span>
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-4)', fontVariantNumeric: 'tabular-nums' }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%', borderRadius: 2,
                background: showBonus
                  ? 'linear-gradient(90deg, #a855f7, #c084fc)'
                  : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                boxShadow: showBonus
                  ? '0 0 12px rgba(168,85,247,0.35)'
                  : '0 0 10px rgba(245,158,11,0.25)',
              }}
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 0' }}>
        {questions.map((q, qIdx) => {
          const opts = [
            { value: 2, ...q.optionA },
            { value: 0, ...q.optionNeutral },
            { value: -2, ...q.optionB },
          ]

          return (
            <motion.div
              key={q.id}
              ref={(el) => { questionRefs.current[qIdx] = el }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: qIdx < 3 ? qIdx * 0.08 : 0 }}
              style={{ marginBottom: qIdx < questions.length - 1 ? 72 : 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 28 }}>
                <span style={{
                  flexShrink: 0, width: 32, height: 32, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                  background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.12)',
                  color: '#fbbf24', fontVariantNumeric: 'tabular-nums',
                }}>
                  {qIdx + 1}
                </span>
                <h2 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  fontWeight: 600, lineHeight: 1.55,
                  color: 'var(--color-text-1)',
                  paddingTop: 4,
                }}>
                  {q.text}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 46 }}>
                {opts.map((opt, i) => {
                  const selected = answers[q.id] === opt.value
                  const isNeutral = opt.value === 0

                  return (
                    <motion.button
                      key={i}
                      onClick={() => selectAnswer(q.id, opt.value)}
                      whileTap={{ scale: 0.985 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        width: '100%', textAlign: 'left',
                        padding: '15px 18px', borderRadius: 14, cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: selected ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)',
                        border: selected ? '1px solid rgba(245,158,11,0.22)' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: selected ? '0 0 20px rgba(245,158,11,0.05)' : 'none',
                      }}
                    >
                      <span style={{
                        flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: isNeutral ? '0.9rem' : '0.7rem', fontWeight: 700,
                        background: selected ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.035)',
                        border: `1px solid ${selected ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)'}`,
                        color: selected ? '#fbbf24' : 'var(--color-text-4)',
                        transition: 'all 0.2s',
                      }}>
                        {LABELS[i]}
                      </span>
                      <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{opt.emoji}</span>
                      <span style={{
                        fontSize: 'clamp(0.88rem, 1.4vw, 0.98rem)',
                        lineHeight: 1.55,
                        color: selected ? 'var(--color-text-1)' : 'var(--color-text-2)',
                        transition: 'color 0.2s',
                      }}>
                        {opt.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}

        {/* Submit or bonus */}
        <AnimatePresence mode="wait">
          {showBonus ? (
            <motion.div
              key="bonus"
              ref={bonusRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginTop: 80, paddingBottom: 40 }}
            >
              {/* Glitchy divider */}
              <div style={{
                textAlign: 'center', marginBottom: 36,
              }}>
                <div style={{
                  display: 'inline-block', padding: '4px 16px', borderRadius: 6,
                  background: 'rgba(168,85,247,0.08)',
                  border: '1px solid rgba(168,85,247,0.15)',
                  fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em',
                  color: '#c084fc',
                }}>
                  HIDDEN QUEST
                </div>
              </div>

              <div style={{
                padding: 'clamp(24px, 5vw, 32px)', borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.06), transparent 60%)',
                border: '1px solid rgba(168,85,247,0.12)',
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.05rem, 2.3vw, 1.2rem)',
                  fontWeight: 600, lineHeight: 1.6,
                  color: 'var(--color-text-1)',
                  marginBottom: 28,
                }}>
                  {bonus.text}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {bonus.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleBonusSelect(opt)}
                      whileTap={{ scale: 0.985 }}
                      whileHover={{ borderColor: 'rgba(168,85,247,0.25)' }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        width: '100%', textAlign: 'left',
                        padding: '15px 18px', borderRadius: 14, cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: 'rgba(168,85,247,0.03)',
                        border: '1px solid rgba(168,85,247,0.08)',
                      }}
                    >
                      <span style={{
                        flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700,
                        background: 'rgba(168,85,247,0.08)',
                        border: '1px solid rgba(168,85,247,0.12)',
                        color: '#c084fc',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{opt.emoji}</span>
                      <span style={{
                        fontSize: 'clamp(0.88rem, 1.4vw, 0.98rem)',
                        lineHeight: 1.55,
                        color: 'var(--color-text-2)',
                      }}>
                        {opt.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submit"
              style={{ textAlign: 'center', marginTop: 64, paddingBottom: 40 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {allAnswered ? (
                <button onClick={handleSubmit} className="btn-primary" style={{ padding: '16px 56px', fontSize: '1.05rem' }}>
                  {t.submitBtn}
                </button>
              ) : (
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-4)' }}>
                  {t.remaining(questions.length - answeredCount)}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
