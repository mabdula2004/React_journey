import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import CounterDisplay from './components/CounterDisplay'
import ControlPanel from './components/ControlPanel'
import StepConfigurator from './components/StepConfigurator'
import LimitsPanel from './components/LimitsPanel'
import HistoryLog from './components/HistoryLog'
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal'
import { useTheme } from './hooks/useTheme'
import { Sparkles, Command, ShieldCheck, Zap, Activity } from 'lucide-react'

function App() {
  const { theme, toggleTheme } = useTheme()

  // Counter state
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [lastAction, setLastAction] = useState('Initial state (0)')

  // Min / Max boundary states
  const [minLimit, setMinLimit] = useState(-50)
  const [maxLimit, setMaxLimit] = useState(100)
  const [isMinEnabled, setIsMinEnabled] = useState(false)
  const [isMaxEnabled, setIsMaxEnabled] = useState(false)

  // History log state
  const [history, setHistory] = useState([])

  // Keyboard shortcuts modal state
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  // Validation checks for buttons
  const disabledIncrement = isMaxEnabled && count + step > maxLimit
  const disabledDecrement = isMinEnabled && count - step < minLimit

  // Add an entry to history
  const addHistoryEntry = useCallback((type, delta, value) => {
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      delta,
      value,
    }
    setHistory((prev) => [newEntry, ...prev.slice(0, 99)]) // Keep last 100 entries
  }, [])

  // Handlers
  const handleIncrement = useCallback(() => {
    if (isMaxEnabled && count + step > maxLimit) return
    const nextVal = count + step
    setCount(nextVal)
    setLastAction(`Increased (+${step})`)
    addHistoryEntry('increment', `+${step}`, nextVal)
  }, [count, step, isMaxEnabled, maxLimit, addHistoryEntry])

  const handleDecrement = useCallback(() => {
    if (isMinEnabled && count - step < minLimit) return
    const nextVal = count - step
    setCount(nextVal)
    setLastAction(`Decreased (-${step})`)
    addHistoryEntry('decrement', `-${step}`, nextVal)
  }, [count, step, isMinEnabled, minLimit, addHistoryEntry])

  const handleReset = useCallback(() => {
    setCount(0)
    setLastAction('Reset (0)')
    addHistoryEntry('reset', 'Reset to 0', 0)
  }, [addHistoryEntry])

  const handleMultiply = useCallback(() => {
    const nextVal = count * 2
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Multiplied (×2)')
    addHistoryEntry('multiply', '×2', nextVal)
  }, [count, isMaxEnabled, maxLimit, isMinEnabled, minLimit, addHistoryEntry])

  const handleDivide = useCallback(() => {
    const nextVal = Math.trunc(count / 2)
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Divided (÷2)')
    addHistoryEntry('divide', '÷2', nextVal)
  }, [count, isMaxEnabled, maxLimit, isMinEnabled, minLimit, addHistoryEntry])

  const handleInvert = useCallback(() => {
    const nextVal = -count
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Inverted sign (±)')
    addHistoryEntry('invert', '±', nextVal)
  }, [count, isMaxEnabled, maxLimit, isMinEnabled, minLimit, addHistoryEntry])

  const handleClampToLimits = useCallback(() => {
    let clamped = count
    if (isMinEnabled && clamped < minLimit) clamped = minLimit
    if (isMaxEnabled && clamped > maxLimit) clamped = maxLimit
    setCount(clamped)
    setLastAction(`Clamped to limits (${clamped})`)
    addHistoryEntry('clamp', 'Clamped', clamped)
  }, [count, isMinEnabled, minLimit, isMaxEnabled, maxLimit, addHistoryEntry])

  const handleClearHistory = () => {
    setHistory([])
  }

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not trigger if typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) {
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          handleIncrement()
          break
        case 'ArrowDown':
          e.preventDefault()
          handleDecrement()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          handleReset()
          break
        case 'm':
        case 'M':
          e.preventDefault()
          handleMultiply()
          break
        case 'd':
        case 'D':
          e.preventDefault()
          handleDivide()
          break
        case '?':
          e.preventDefault()
          setIsShortcutsOpen((prev) => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleIncrement, handleDecrement, handleReset, handleMultiply, handleDivide])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 select-none">
      {/* Top Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col">
        
        {/* Status & Quick Stats Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">Studio Active</span>
            </div>

            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Step:</span>
              <strong className="font-mono text-indigo-600 dark:text-indigo-400">+{step}</strong>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Boundaries:</span>
              <strong className="text-slate-700 dark:text-slate-300">
                {isMinEnabled ? `Min ${minLimit}` : 'Min: ∞'} | {isMaxEnabled ? `Max ${maxLimit}` : 'Max: ∞'}
              </strong>
            </div>
          </div>

          {/* Quick Trigger for Hotkeys Modal */}
          <button
            type="button"
            onClick={() => setIsShortcutsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all shadow-sm ml-auto"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
            <kbd className="font-mono text-[10px] px-1 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500">
              ?
            </kbd>
          </button>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Counter & Controls Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CounterDisplay
              count={count}
              lastAction={lastAction}
              minLimit={minLimit}
              maxLimit={maxLimit}
              isMinEnabled={isMinEnabled}
              isMaxEnabled={isMaxEnabled}
            />

            <div className="p-4 sm:p-6 rounded-3xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <ControlPanel
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onReset={handleReset}
                onMultiply={handleMultiply}
                onDivide={handleDivide}
                onInvert={handleInvert}
                step={step}
                disabledIncrement={disabledIncrement}
                disabledDecrement={disabledDecrement}
              />
            </div>

            {/* History Log underneath primary counter */}
            <HistoryLog
              history={history}
              onClearHistory={handleClearHistory}
            />
          </div>

          {/* Configuration Sidebar: Step & Limits (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <StepConfigurator
              step={step}
              onStepChange={setStep}
            />

            <LimitsPanel
              minLimit={minLimit}
              setMinLimit={setMinLimit}
              maxLimit={maxLimit}
              setMaxLimit={setMaxLimit}
              isMinEnabled={isMinEnabled}
              setIsMinEnabled={setIsMinEnabled}
              isMaxEnabled={isMaxEnabled}
              setIsMaxEnabled={setIsMaxEnabled}
              currentCount={count}
              onClampToLimits={handleClampToLimits}
            />
          </div>

        </div>

      </main>

      {/* Elegant Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Counter Master Pro
            </span>
            <span>•</span>
            <span>State & Activity Studio</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>React 19 + Vite + Tailwind CSS</span>
            <span>•</span>
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Command className="w-3 h-3" />
              <span>Hotkeys Help</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  )
}

export default App
