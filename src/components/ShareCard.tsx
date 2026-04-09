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
  const overview = type.overview.length > 85 ? type.overview.slice(0, 85) + '…' : type.overview

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
      {/* ═══ HERO — 不动 ═══ */}
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
          width: 320, height: 320, borderRadius: 36, overflow: 'hidden',
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

      {/* ═══ BODY — 压缩 ═══ */}
      <div style={{ padding: '0 44px 32px' }}>

        <div style={{
          width: 48, height: 2, borderRadius: 1,
          background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
          margin: '0 auto 20px',
        }} />

        {/* Overview — 截断 */}
        <div style={{
          padding: '14px 20px', borderRadius: 14,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: 18,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#c8c8da', margin: 0 }}>
            {overview}
          </p>
        </div>

        {/* Dimensions — 紧凑 */}
        <div style={{ marginBottom: 18 }}>
          {dimensions.map((dim) => {
            const score = scores[dim.id]
            const pct = getPercentage(score)
            const positive = score > 0
            return (
              <div key={dim.id} style={{ marginBottom: 10 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 13, color: '#9898b0', marginBottom: 4, fontWeight: 500,
                }}>
                  <span>{dim.labelB}</span>
                  <span style={{ letterSpacing: '0.06em', color: '#74748e', fontSize: 11 }}>{dim.name}</span>
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

        {/* Soul question — 紧凑 */}
        <div style={{
          padding: '14px 20px', borderRadius: 14,
          background: `linear-gradient(135deg, ${color}0c, transparent 60%)`,
          border: `1px solid ${color}1a`,
          textAlign: 'center', marginBottom: 16,
        }}>
          <p style={{
            fontSize: 16, fontStyle: 'italic', color: '#e4e4ee',
            lineHeight: 1.7, margin: 0,
          }}>
            💭 &ldquo;{type.soulQuestion}&rdquo;
          </p>
        </div>

        {/* Match — 单行紧凑 */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{
            flex: 1, padding: '12px 14px', borderRadius: 12,
            background: 'rgba(52,211,153,0.04)',
            border: '1px solid rgba(52,211,153,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, color: '#d8d8e8', fontWeight: 600, margin: 0 }}>
              <span style={{ color: '#34d399', fontSize: 12, marginRight: 6 }}>💚</span>{type.bestMatch}
            </p>
          </div>
          <div style={{
            flex: 1, padding: '12px 14px', borderRadius: 12,
            background: 'rgba(248,113,113,0.04)',
            border: '1px solid rgba(248,113,113,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, color: '#d8d8e8', fontWeight: 600, margin: 0 }}>
              <span style={{ color: '#f87171', fontSize: 12, marginRight: 6 }}>💔</span>{type.worstMatch}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 14,
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
