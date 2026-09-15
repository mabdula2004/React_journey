import { useState, useEffect } from 'react'

const THEME_KEY = 'cmp-theme-mode'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check saved local storage theme
    try {
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme
      }
    } catch (e) {
      console.warn('LocalStorage not accessible for theme', e)
    }

    // Default to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return 'dark' // Default modern dark
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (e) {
      console.warn('Failed to save theme in localStorage', e)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
