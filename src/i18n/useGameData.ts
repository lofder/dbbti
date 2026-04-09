import { useMemo } from 'react'
import { useLang } from './context'
import { ui, type UiStrings } from './ui'
import { questions as questionsZh, bonusQuestion as bonusZh } from '../data/questions'
import { questionsEn, bonusQuestionEn } from '../data/questions-en'
import { personalityTypes as typesZh } from '../data/types'
import { personalityTypesEn } from '../data/types-en'
import { dimensions as dimensionsZh } from '../data/dimensions'
import { dimensionsEn } from '../data/dimensions-en'
import type { Question, BonusQuestion } from '../data/questions'
import type { PersonalityType } from '../data/types'
import type { Dimension } from '../data/dimensions'

export function useT(): UiStrings {
  const { lang } = useLang()
  return ui[lang]
}

export function useQuestions(): Question[] {
  const { lang } = useLang()
  return lang === 'zh' ? questionsZh : questionsEn
}

export function useTypes(): PersonalityType[] {
  const { lang } = useLang()
  return lang === 'zh' ? typesZh : personalityTypesEn
}

export function useDimensions(): Dimension[] {
  const { lang } = useLang()
  return lang === 'zh' ? dimensionsZh : dimensionsEn
}

export function useBonusQuestion(): BonusQuestion {
  const { lang } = useLang()
  return lang === 'zh' ? bonusZh : bonusQuestionEn
}

export function useLocalizedType(typeId: string): PersonalityType | undefined {
  const types = useTypes()
  return useMemo(() => types.find((t) => t.id === typeId), [types, typeId])
}
