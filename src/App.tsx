import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LangProvider } from './i18n/context'
import Landing from './components/Landing'
import QuizFlow from './components/QuizFlow'
import LoadingScreen from './components/LoadingScreen'
import Result from './components/Result'
import type { BonusOption } from './data/questions'
import { calculateResult } from './utils/calculate'

export type AppScreen = 'landing' | 'quiz' | 'loading' | 'result'

function AppInner() {
  const [screen, setScreen] = useState<AppScreen>('landing')
  const [result, setResult] = useState<{
    typeId: string
    scores: { energy: number; social: number; drive: number; expression: number }
  } | null>(null)

  const handleStart = () => {
    setResult(null)
    setScreen('quiz')
  }

  const handleQuizComplete = (finalAnswers: Record<number, number>, bonusAnswer?: BonusOption | null) => {
    setScreen('loading')
    const r = calculateResult(finalAnswers, bonusAnswer)
    setTimeout(() => {
      setResult({ typeId: r.type.id, scores: r.scores })
      setScreen('result')
    }, 2500)
  }

  const handleRestart = () => {
    setResult(null)
    setScreen('landing')
  }

  return (
    <div className="min-h-dvh relative">
      <div className="ambient-bg" />
      <AnimatePresence mode="wait">
        {screen === 'landing' && <Landing key="landing" onStart={handleStart} />}
        {screen === 'quiz' && <QuizFlow key="quiz" onComplete={handleQuizComplete} />}
        {screen === 'loading' && <LoadingScreen key="loading" />}
        {screen === 'result' && result && (
          <Result key="result" typeId={result.typeId} scores={result.scores} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
