import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { DimensionScores } from '../utils/calculate'
import TypeIllustration from './TypeIllustration'
import DimensionChart from './DimensionChart'
import ShareCard from './ShareCard'
import { downloadShareCard } from '../utils/share'
import { useLocalizedType, useT, useDimensions } from '../i18n/useGameData'

interface ResultProps {
  typeId: string
  scores: DimensionScores
  onRestart: () => void
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

function HiddenCodeCycle() {
  const codes = ['疯牛卷毒', '丧恐躺甜', '疯恐卷甜', '丧牛躺毒', '疯牛躺甜', '丧恐卷毒', '？？？？']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % codes.length), 280)
    return () => clearInterval(t)
  }, [])
  return (
    <span
      style={{
        display: 'inline-block', minWidth: '5em', textAlign: 'center',
        background: 'linear-gradient(135deg, #a855f7, #60a5fa, #f472b6, #fb923c, #34d399, #a855f7)',
        backgroundSize: '400% 400%',
        animation: 'holographic 5s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {codes[idx]}
    </span>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.72rem', fontWeight: 600,
      letterSpacing: '0.14em', color: 'var(--color-text-4)',
      textTransform: 'uppercase' as const, marginBottom: 18,
    }}>
      {children}
    </p>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="glass-card" style={{ padding: 'clamp(22px, 4vw, 30px)', ...style }}>{children}</div>
}

export default function Result({ typeId, scores, onRestart }: ResultProps) {
  const type = useLocalizedType(typeId)
  const t = useT()
  const dims = useDimensions()
  const shareRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)

  const color = type?.isHidden ? '#c084fc' : (type?.color ?? '#f59e0b')

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.35 }, colors: ['#f59e0b', '#fbbf24', '#60a5fa', '#f472b6', '#34d399'] })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = async () => {
    if (!shareRef.current || saving) return
    setSaving(true)
    await downloadShareCard(shareRef.current, `dbbti-${typeId}.png`)
    setSaving(false)
  }

  if (!type) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100dvh' }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '80px 24px',
      }}>
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.15 }}
        >
          <TypeIllustration image={type.image} title={type.title} isHidden={type.isHidden} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ marginTop: 44, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', color: 'var(--color-text-4)', textTransform: 'uppercase' as const }}
        >
          {t.yourType}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: 14, fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          {type.title}
        </motion.h1>

        {type.isHidden ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
            style={{ marginTop: 10 }}>
            <HiddenCodeCycle />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            style={{
              marginTop: 10, fontSize: '0.72rem', fontWeight: 500,
              color: 'var(--color-text-4)', letterSpacing: '0.08em',
              padding: '3px 12px', borderRadius: 6,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              display: 'inline-block',
            }}
          >
            {type.code}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ marginTop: 18, fontSize: 'clamp(0.95rem, 1.8vw, 1.12rem)', color: 'var(--color-text-3)', lineHeight: 1.75, maxWidth: 440 }}
        >
          {type.tagline}
        </motion.p>

        {/* Soul question in hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          style={{
            marginTop: 40, maxWidth: 440, padding: 'clamp(20px, 4vw, 28px)',
            borderRadius: 16,
            background: `linear-gradient(135deg, ${color}08, transparent 60%)`,
            border: `1px solid ${color}14`,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-4)', letterSpacing: '0.14em', marginBottom: 14 }}>
            {t.soulQuestionLabel}
          </p>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', fontWeight: 500, fontStyle: 'italic', color: 'var(--color-text-1)', lineHeight: 1.75 }}>
            &ldquo;{type.soulQuestion}&rdquo;
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 2.0, duration: 1 }} style={{ marginTop: 40 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce" style={{ color: 'var(--color-text-4)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ═══ REPORT ═══ */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 140px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>

          <motion.section {...fadeUp}>
            <Label>{t.sectionOverview}</Label>
            <Card>
              <p style={{ fontSize: 'clamp(0.93rem, 1.5vw, 1.04rem)', lineHeight: 1.9, color: 'var(--color-text-2)' }}>
                {type.overview}
              </p>
            </Card>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionSuperpower}</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              <Card style={{ borderColor: 'rgba(52,211,153,0.1)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', marginBottom: 14, letterSpacing: '0.06em' }}>{t.superpowerLabel}</p>
                <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--color-text-2)' }}>{type.superpower}</p>
              </Card>
              <Card style={{ borderColor: 'rgba(248,113,113,0.1)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', marginBottom: 14, letterSpacing: '0.06em' }}>{t.blindspotLabel}</p>
                <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--color-text-2)' }}>{type.blindspot}</p>
              </Card>
            </div>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionDimensions}</Label>
            <Card><DimensionChart scores={scores} breakdown={type.dimensionBreakdown} /></Card>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionRelationships}</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([
                { label: t.friendsLabel, emoji: t.friendsEmoji, text: type.relationships.friends },
                { label: t.romanticLabel, emoji: t.romanticEmoji, text: type.relationships.romantic },
                { label: t.colleaguesLabel, emoji: t.colleaguesEmoji, text: type.relationships.colleagues },
              ]).map((r) => (
                <Card key={r.label}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-4)', marginBottom: 10, letterSpacing: '0.04em' }}>
                    {r.emoji} {r.label}
                  </p>
                  <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--color-text-2)' }}>{r.text}</p>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionCareer}</Label>
            <Card>
              <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--color-text-2)' }}>{type.careerGuide}</p>
            </Card>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionQuote}</Label>
            <Card>
              <p style={{ fontSize: 'clamp(1.02rem, 1.8vw, 1.14rem)', fontWeight: 500, fontStyle: 'italic', color, lineHeight: 1.75 }}>
                &ldquo;{type.quote}&rdquo;
              </p>
            </Card>
          </motion.section>

          <motion.section {...fadeUp}>
            <Label>{t.sectionMatch}</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Card style={{ borderColor: 'rgba(52,211,153,0.08)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', marginBottom: 10 }}>{t.bestMatchLabel}</p>
                <p style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--color-text-1)' }}>{type.bestMatch}</p>
              </Card>
              <Card style={{ borderColor: 'rgba(248,113,113,0.08)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', marginBottom: 10 }}>{t.worstMatchLabel}</p>
                <p style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--color-text-1)' }}>{type.worstMatch}</p>
              </Card>
            </div>
          </motion.section>

          <motion.section {...fadeUp}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 32, height: 1, background: 'rgba(245,158,11,0.12)', margin: '0 auto 22px' }} />
              <p style={{ fontSize: '0.82rem', lineHeight: 1.85, color: 'var(--color-text-4)' }}>
                {t.disclaimer1}
                <br />
                {t.disclaimer2}
              </p>
            </div>
          </motion.section>

          <motion.section {...fadeUp}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ width: '100%', maxWidth: 340 }}>
                {saving ? t.savingBtn : t.saveBtn}
              </button>
              <button onClick={onRestart} className="btn-ghost" style={{ width: '100%', maxWidth: 340 }}>
                {t.restartBtn}
              </button>
            </div>
          </motion.section>

          {/* About */}
          <motion.section {...fadeUp}>
            <div style={{
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 32,
            }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-4)', letterSpacing: '0.1em', marginBottom: 10 }}>
                {t.aboutTitle}
              </p>
              <p style={{ fontSize: '0.72rem', lineHeight: 1.85, color: 'var(--color-text-4)', maxWidth: 400, margin: '0 auto' }}>
                {t.aboutText}
              </p>
              <p style={{ marginTop: 12, textAlign: 'center' }}>
                <a
                  href={t.aboutGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', textDecoration: 'none' }}
                >
                  {t.aboutStar}
                </a>
              </p>
              <p style={{ marginTop: 6, textAlign: 'center' }}>
                <a
                  href={t.aboutGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.68rem', color: 'var(--color-text-4)', textDecoration: 'underline' }}
                >
                  GitHub
                </a>
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--color-text-4)', opacity: 0.6, marginTop: 12 }}>
                {t.aboutMadeWith}
              </p>
            </div>
          </motion.section>
        </div>
      </div>

      <div style={{ position: 'fixed', left: -9999, top: -9999 }}>
        <ShareCard ref={shareRef} type={type} scores={scores} dimensions={dims} />
      </div>
    </motion.div>
  )
}
