import { questions } from '../data/questions'
import type { BonusOption } from '../data/questions'
import { personalityTypes, type PersonalityType } from '../data/types'

export interface DimensionScores {
  energy: number
  social: number
  drive: number
  expression: number
}

export interface QuizResult {
  type: PersonalityType
  scores: DimensionScores
}

export function calculateScores(answers: Record<number, number>): DimensionScores {
  const scores: DimensionScores = { energy: 0, social: 0, drive: 0, expression: 0 }

  for (const q of questions) {
    const answer = answers[q.id]
    if (answer !== undefined) {
      scores[q.dimension] += answer
    }
  }

  return scores
}

export function isBalanced(scores: DimensionScores): boolean {
  return (
    Math.abs(scores.energy) <= 2 &&
    Math.abs(scores.social) <= 2 &&
    Math.abs(scores.drive) <= 2 &&
    Math.abs(scores.expression) <= 2
  )
}

export function determineType(scores: DimensionScores): PersonalityType {
  if (isBalanced(scores)) {
    return personalityTypes.find((t) => t.isHidden)!
  }

  const e = scores.energy > 0 ? '疯' : '丧'
  const s = scores.social > 0 ? '牛' : '恐'
  const d = scores.drive > 0 ? '卷' : '躺'
  const x = scores.expression > 0 ? '毒' : '甜'
  const code = `${e}${s}${d}${x}`

  return personalityTypes.find((t) => t.code === code) ?? personalityTypes[0]
}

export function calculateResult(
  answers: Record<number, number>,
  bonusAnswer?: BonusOption | null,
): QuizResult {
  const scores = calculateScores(answers)

  if (isBalanced(scores) && bonusAnswer) {
    if (bonusAnswer.dimension === null) {
      return { type: personalityTypes.find((t) => t.isHidden)!, scores }
    }
    scores[bonusAnswer.dimension] += bonusAnswer.value
  }

  const type = determineType(scores)
  return { type, scores }
}

export function getPercentage(score: number, max: number = 8): number {
  return Math.round((Math.abs(score) / max) * 100)
}
