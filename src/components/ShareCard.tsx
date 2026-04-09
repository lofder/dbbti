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
  const overview = type.overview.length > 140 ? type.overview.slice(0, 140) + '…' : type.overview

  return (
    <div
      ref={ref}
      style={{
        width: 540, borderRadius: 24, overflow: 'hidden',
        background: 'linear-gradient(160deg, #0c0c18 0%, #12121f 50%, #0c0c18 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", sans-serif',
        color: '#eeeef0',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: 290,
        background: `linear-gradient(180deg, ${color}18 0%, transparent 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 184, height: 184, borderRadius: 24, overflow: 'hidden',
          border: `3px solid ${color}44`,
          boxShadow: `0 10px 50px ${color}22, 0 0 100px ${color}10`,
        }}>
          <img
            src={type.image}
            alt={type.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0,
          textAlign: 'center', fontSize: 11, letterSpacing: '0.35em',
          color: '#74748e', textTransform: 'uppercase' as const, fontWeight: 600,
        }}>
          DBBTI · Dumbass Big Brain Type Indicator
        </div>
      </div>

      <div style={{ padding: '0 36px 36px' }}>
        <div style={{ textAlign: 'center', marginTop: -6 }}>
          <h2 style={{
            fontSize: 38, fontWeight: 800, margin: 0,
            letterSpacing: '-0.02em', color, lineHeight: 1.2,
          }}>
            {type.title}
          </h2>
          <p style={{ fontSize: 14, marginTop: 10, color: '#74748e', letterSpacing: '0.1em', fontWeight: 500 }}>
            {type.code}
          </p>
          <p style={{ fontSize: 16, color: '#b8b8cc', marginTop: 12, lineHeight: 1.65, fontWeight: 400 }}>
            {type.tagline}
          </p>
        </div>

        <div style={{
          width: 36, height: 2, borderRadius: 1,
          background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
          margin: '24px auto',
        }} />

        <div style={{
          padding: '18px 22px', borderRadius: 14,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.04)',
          marginBottom: 22,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#b8b8cc', margin: 0 }}>
            {overview}
          </p>
        </div>

        <div style={{ marginBottom: 22 }}>
          {dimensions.map((dim) => {
            const score = scores[dim.id]
            const pct = getPercentage(score)
            const positive = score > 0
            return (
              <div key={dim.id} style={{ marginBottom: 14 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 12, color: '#74748e', marginBottom: 4, fontWeight: 500,
                }}>
                  <span>{dim.labelB}</span>
                  <span style={{ letterSpacing: '0.06em' }}>{dim.name}</span>
                  <span>{dim.labelA}</span>
                </div>
                <div style={{
                  height: 7, borderRadius: 4,
                  background: 'rgba(255,255,255,0.04)', display: 'flex',
                }}>
                  <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                    {!positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '4px 0 0 4px', backgroundColor: dim.color, opacity: 0.85,
                      }} />
                    )}
                  </div>
                  <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                  <div style={{ width: '50%' }}>
                    {positive && (
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        borderRadius: '0 4px 4px 0', backgroundColor: dim.color, opacity: 0.85,
                      }} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          padding: '18px 22px', borderRadius: 14,
          background: `linear-gradient(135deg, ${color}0a, transparent 60%)`,
          border: `1px solid ${color}18`,
          textAlign: 'center', marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, color: '#74748e', letterSpacing: '0.12em', fontWeight: 600, margin: '0 0 10px' }}>
            💭
          </p>
          <p style={{
            fontSize: 15.5, fontStyle: 'italic', color: '#dddde6',
            lineHeight: 1.75, margin: 0,
          }}>
            &ldquo;{type.soulQuestion}&rdquo;
          </p>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
          <div style={{
            flex: 1, padding: '14px 16px', borderRadius: 12,
            background: 'rgba(52,211,153,0.04)',
            border: '1px solid rgba(52,211,153,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 11, color: '#34d399', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.06em' }}>💚</p>
            <p style={{ fontSize: 15, color: '#cccce0', fontWeight: 600, margin: 0 }}>{type.bestMatch}</p>
          </div>
          <div style={{
            flex: 1, padding: '14px 16px', borderRadius: 12,
            background: 'rgba(248,113,113,0.04)',
            border: '1px solid rgba(248,113,113,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 11, color: '#f87171', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.06em' }}>💔</p>
            <p style={{ fontSize: 15, color: '#cccce0', fontWeight: 600, margin: 0 }}>{type.worstMatch}</p>
          </div>
        </div>

        <div style={{
          textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: 18,
        }}>
          <p style={{ fontSize: 12, color: '#5a5a74', margin: 0, letterSpacing: '0.04em' }}>
            dbbti.silentsparkhub.com
          </p>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
