import { useState, useCallback } from 'react'
import { questions } from '../data/questions'

export function useQuiz(onComplete: (answers: Record<number, number>) => void) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [direction, setDirection] = useState(1)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = Object.keys(answers).length / totalQuestions

  const selectAnswer = useCallback(
    (value: number) => {
      const newAnswers = { ...answers, [currentQuestion.id]: value }
      setAnswers(newAnswers)
      setDirection(1)

      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 400)
      } else {
        setTimeout(() => onComplete(newAnswers), 400)
      }
    },
    [answers, currentIndex, currentQuestion, totalQuestions, onComplete],
  )

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    answers,
    direction,
    selectAnswer,
    goBack,
  }
}
