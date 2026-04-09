import { forwardRef } from 'react'
import type { PersonalityType } from '../data/types'
import type { DimensionScores } from '../utils/calculate'
import type { Dimension } from '../data/dimensions'
import { getPercentage } from '../utils/calculate'

interface ShareCardProps {
  type: PersonalityType
  scores: DimensionScores
  dimensions: Dimension[]
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ type, scores, dimensions }, ref) => {
  const color = type.isHidden ? '#c084fc' : type.color

  return (
    <div
      ref={ref}
      style={{
        width: 720, overflow: 'hidden',
        background: 'linear-gradient(160deg, #0c0c18 0%, #12121f 50%, #0c0c18 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", sans-serif',
        color: '#eeeef0',
      }}
    >
      {/* ═══ HERO ═══ */}
      <div style={{
        position: 'relative', width: '100%',
        paddingTop: 48, paddingBottom: 48,
        background: `linear-gradient(180deg, ${color}14 0%, transparent 70%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 24, left: 0, right: 0,
          textAlign: 'center', fontSize: 12, letterSpacing: '0.3em',
          color: '#74748e', textTransform: 'uppercase' as const, fontWeight: 600,
        }}>
          DBBTI · Dumbass Big Brain Type Indicator
        </div>

        <div style={{
          width: 240, height: 240, borderRadius: 32, overflow: 'hidden',
          border: `3px solid ${color}44`,
          boxShadow: `0 12px 60px ${color}28, 0 0 120px ${color}12`,
          marginTop: 24,
        }}>
          <img
            src={type.image}
            alt={type.title}
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <h2 style={{
          fontSize: 46, fontWeight: 800, margin: '32px 0 0',
          letterSpacing: '-0.02em', color, lineHeight: 1.15, textAlign: 'center',
        }}>
          {type.title}
        </h2>

        <p style={{
          fontSize: 15, marginTop: 12, color: '#74748e',
          letterSpacing: '0.1em', fontWeight: 500, textAlign: 'center',
        }}>
          {type.code}
        </p>

        <p style={{
          fontSize: 18, color: '#b8b8cc', marginTop: 14, lineHeight: 1.7,
          fontWeight: 400, textAlign: 'center', maxWidth: 540, padding: '0 32px',
        }}>
          {type.tagline}
        </p>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ padding: '0 44px 44px' }}>

        <div style={{
          width: 48, height: 2, borderRadius: 1,
          background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
          margin: '0 auto 36px',
        }} />

        {/* Overview */}
        <div style={{
          padding: '24px 28px', borderRadius: 16,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: 32,
        }}>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: '#c8c8da', margin: 0 }}>
            {type.overview}
          </p>
        </div>

        {/* Dimensions */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
            color: '#74748e', textTransform: 'uppercase' as const, marginBottom: 20,
          }}>
            DIMENSIONS
          </p>
          {dimensions.map((dim) => {
            const score = scores[dim.id]
            const pct = getPercentage(score)
            const positive = score > 0
            return (
              <div key={dim.id} style={{ marginBottom: 18 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 14, color: '#9898b0', marginBottom: 6, fontWeight: 500,
                }}>
                  <span>{dim.labelB}</span>
                  <span style={{ letterSpacing: '0.06em', color: '#74748e', fontSize: 12 }}>{dim.name}</span>
                  <span>{dim.labelA}</span>
                </div>
                <div style={{
                  height: 8, borderRadius: 4,
                  background: 'rgba(255,255,255,0.04)', display: 'flex',
                }}>
                  <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                    {!positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '4px 0 0 4px', backgroundColor: dim.color, opacity: 0.9,
                      }} />
                    )}
                  </div>
                  <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                  <div style={{ width: '50%' }}>
                    {positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '0 4px 4px 0', backgroundColor: dim.color, opacity: 0.9,
                      }} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Soul question */}
        <div style={{
          padding: '24px 28px', borderRadius: 16,
          background: `linear-gradient(135deg, ${color}0c, transparent 60%)`,
          border: `1px solid ${color}1a`,
          textAlign: 'center', marginBottom: 28,
        }}>
          <p style={{ fontSize: 12, color: '#74748e', letterSpacing: '0.12em', fontWeight: 600, margin: '0 0 14px' }}>
            💭 SOUL QUESTION
          </p>
          <p style={{
            fontSize: 18, fontStyle: 'italic', color: '#e4e4ee',
            lineHeight: 1.75, margin: 0,
          }}>
            &ldquo;{type.soulQuestion}&rdquo;
          </p>
        </div>

        {/* Match */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <div style={{
            flex: 1, padding: '18px 20px', borderRadius: 14,
            background: 'rgba(52,211,153,0.04)',
            border: '1px solid rgba(52,211,153,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: '#34d399', fontWeight: 600, margin: '0 0 8px', letterSpacing: '0.06em' }}>💚 BEST</p>
            <p style={{ fontSize: 17, color: '#d8d8e8', fontWeight: 600, margin: 0 }}>{type.bestMatch}</p>
          </div>
          <div style={{
            flex: 1, padding: '18px 20px', borderRadius: 14,
            background: 'rgba(248,113,113,0.04)',
            border: '1px solid rgba(248,113,113,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: '#f87171', fontWeight: 600, margin: '0 0 8px', letterSpacing: '0.06em' }}>💔 WORST</p>
            <p style={{ fontSize: 17, color: '#d8d8e8', fontWeight: 600, margin: 0 }}>{type.worstMatch}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 20,
        }}>
          <p style={{ fontSize: 13, color: '#5a5a74', margin: 0, letterSpacing: '0.06em' }}>
            dbbti.silentsparkhub.com
          </p>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
