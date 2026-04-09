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
  const overview = type.overview.length > 100 ? type.overview.slice(0, 100) + '…' : type.overview

  return (
    <div
      ref={ref}
      style={{
        width: 400, borderRadius: 20, overflow: 'hidden',
        background: 'linear-gradient(160deg, #0c0c18 0%, #12121f 50%, #0c0c18 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", sans-serif',
        color: '#eeeef0',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: 220,
        background: `linear-gradient(180deg, ${color}18 0%, transparent 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 140, height: 140, borderRadius: 20, overflow: 'hidden',
          border: `2.5px solid ${color}44`,
          boxShadow: `0 8px 40px ${color}22, 0 0 80px ${color}10`,
        }}>
          <img
            src={type.image}
            alt={type.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{
          position: 'absolute', top: 16, left: 0, right: 0,
          textAlign: 'center', fontSize: 9, letterSpacing: '0.35em',
          color: '#55556a', textTransform: 'uppercase' as const, fontWeight: 600,
        }}>
          DBBTI · Dumbass Big Brain Type Indicator
        </div>
      </div>

      <div style={{ padding: '0 28px 28px' }}>
        <div style={{ textAlign: 'center', marginTop: -6 }}>
          <h2 style={{
            fontSize: 30, fontWeight: 800, margin: 0,
            letterSpacing: '-0.02em', color, lineHeight: 1.2,
          }}>
            {type.title}
          </h2>
          <p style={{ fontSize: 11, marginTop: 8, color: '#55556a', letterSpacing: '0.1em', fontWeight: 500 }}>
            {type.code}
          </p>
          <p style={{ fontSize: 13.5, color: '#aaaabc', marginTop: 10, lineHeight: 1.65, fontWeight: 400 }}>
            {type.tagline}
          </p>
        </div>

        <div style={{
          width: 28, height: 2, borderRadius: 1,
          background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
          margin: '20px auto',
        }} />

        <div style={{
          padding: '14px 16px', borderRadius: 12,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.04)',
          marginBottom: 18,
        }}>
          <p style={{ fontSize: 12, lineHeight: 1.85, color: '#9999ae', margin: 0 }}>
            {overview}
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          {dimensions.map((dim) => {
            const score = scores[dim.id]
            const pct = getPercentage(score)
            const positive = score > 0
            return (
              <div key={dim.id} style={{ marginBottom: 11 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 9.5, color: '#55556a', marginBottom: 3, fontWeight: 500,
                }}>
                  <span>{dim.labelB}</span>
                  <span style={{ letterSpacing: '0.06em' }}>{dim.name}</span>
                  <span>{dim.labelA}</span>
                </div>
                <div style={{
                  height: 5, borderRadius: 3,
                  background: 'rgba(255,255,255,0.04)', display: 'flex',
                }}>
                  <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                    {!positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '3px 0 0 3px', backgroundColor: dim.color, opacity: 0.85,
                      }} />
                    )}
                  </div>
                  <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                  <div style={{ width: '50%' }}>
                    {positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '0 3px 3px 0', backgroundColor: dim.color, opacity: 0.85,
                      }} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          padding: '14px 16px', borderRadius: 12,
          background: `linear-gradient(135deg, ${color}0a, transparent 60%)`,
          border: `1px solid ${color}18`,
          textAlign: 'center', marginBottom: 20,
        }}>
          <p style={{ fontSize: 9, color: '#55556a', marginBottom: 8, letterSpacing: '0.12em', fontWeight: 600, margin: '0 0 8px' }}>
            💭
          </p>
          <p style={{
            fontSize: 12.5, fontStyle: 'italic', color: '#dddde6',
            lineHeight: 1.75, margin: 0,
          }}>
            &ldquo;{type.soulQuestion}&rdquo;
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{
            flex: 1, padding: '10px 12px', borderRadius: 10,
            background: 'rgba(52,211,153,0.04)',
            border: '1px solid rgba(52,211,153,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 9, color: '#34d399', fontWeight: 600, margin: '0 0 5px', letterSpacing: '0.06em' }}>💚</p>
            <p style={{ fontSize: 12, color: '#cccce0', fontWeight: 600, margin: 0 }}>{type.bestMatch}</p>
          </div>
          <div style={{
            flex: 1, padding: '10px 12px', borderRadius: 10,
            background: 'rgba(248,113,113,0.04)',
            border: '1px solid rgba(248,113,113,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 9, color: '#f87171', fontWeight: 600, margin: '0 0 5px', letterSpacing: '0.06em' }}>💔</p>
            <p style={{ fontSize: 12, color: '#cccce0', fontWeight: 600, margin: 0 }}>{type.worstMatch}</p>
          </div>
        </div>

        <div style={{
          textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: 14,
        }}>
          <p style={{ fontSize: 9.5, color: '#44445a', margin: 0, letterSpacing: '0.04em' }}>
            dbbti.pages.dev
          </p>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
