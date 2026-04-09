import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import { useLang } from '../i18n/context'
import { useT } from '../i18n/useGameData'

interface LandingProps {
  onStart: () => void
}

function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed', top: 20, right: 20, zIndex: 100,
        padding: '6px 14px', borderRadius: 10,
        fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--color-text-3)',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  )
}

function AboutSection() {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        textAlign: 'center', padding: '40px 24px 32px',
      }}
    >
      <div style={{
        maxWidth: 420, margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24,
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-4)', letterSpacing: '0.1em', marginBottom: 10 }}>
          {t.aboutTitle}
        </p>
        <p style={{ fontSize: '0.72rem', lineHeight: 1.85, color: 'var(--color-text-4)', opacity: 0.7 }}>
          {t.aboutText}
        </p>
        <p style={{ marginTop: 12 }}>
          <a
            href={t.aboutGithub}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', textDecoration: 'none', opacity: 0.7 }}
          >
            {t.aboutStar}
          </a>
        </p>
        <p style={{ marginTop: 6 }}>
          <a
            href={t.aboutGithub}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.68rem', color: 'var(--color-text-4)', opacity: 0.4, textDecoration: 'underline' }}
          >
            GitHub
          </a>
        </p>
        <p style={{ fontSize: '0.68rem', color: 'var(--color-text-4)', opacity: 0.3, marginTop: 12 }}>
          {t.aboutMadeWith}
        </p>
      </div>
    </motion.div>
  )
}

export default function Landing({ onStart }: LandingProps) {
  const t = useT()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-dvh flex flex-col items-center justify-center relative"
      style={{ padding: '40px 24px 180px' }}
    >
      <ParticleBackground />
      <LangToggle />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.1 }}
          className="glitch-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5.5rem, 16vw, 10rem)',
            fontWeight: 700,
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            userSelect: 'none',
          }}
        >
          DBBTI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.6rem, 1.1vw, 0.72rem)',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'var(--color-text-4)',
            marginTop: 20,
            textTransform: 'uppercase' as const,
          }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ width: 40, height: 1, background: 'rgba(245,158,11,0.2)', margin: '32px auto' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{
            fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
            color: 'var(--color-text-3)',
            letterSpacing: '0.08em',
            lineHeight: 1.7,
          }}
        >
          {t.slogan}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          style={{ marginTop: 52 }}
        >
          <button onClick={onStart} className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 48px' }}>
            {t.startBtn}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            marginTop: 44,
            fontSize: 'clamp(0.68rem, 1vw, 0.78rem)',
            color: 'var(--color-text-4)',
            letterSpacing: '0.05em',
          }}
        >
          {t.meta}
        </motion.p>
      </div>

      <AboutSection />
    </motion.div>
  )
}
