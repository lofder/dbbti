import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Lang = 'zh' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  setLang: () => {},
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem('dbbti-lang') as Lang) || 'zh' } catch { return 'zh' }
  })

  const set = useCallback((l: Lang) => {
    setLang(l)
    try { localStorage.setItem('dbbti-lang', l) } catch { /* noop */ }
  }, [])

  const toggle = useCallback(() => set(lang === 'zh' ? 'en' : 'zh'), [lang, set])

  return (
    <LangContext.Provider value={{ lang, setLang: set, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
