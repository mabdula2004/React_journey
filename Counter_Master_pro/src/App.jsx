import React, { useState } from 'react'
import Navbar from './components/Navbar'
import CounterDisplay from './components/CounterDisplay'
import ControlPanel from './components/ControlPanel'
import { useTheme } from './hooks/useTheme'
import { CheckCircle2, Sliders, History, Sparkles } from 'lucide-react'

function App() {
  const { theme, toggleTheme } = useTheme()

  // Counter core state
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [lastAction, setLastAction] = useState('Initial state (0)')

  // Min / Max boundary states (ready for Milestone 4)
  const [minLimit, setMinLimit] = useState(-100)
  const [maxLimit, setMaxLimit] = useState(100)
  const [isMinEnabled, setIsMinEnabled] = useState(false)
  const [isMaxEnabled, setIsMaxEnabled] = useState(false)

  // Validation checks
  const disabledIncrement = isMaxEnabled && count + step > maxLimit
  const disabledDecrement = isMinEnabled && count - step < minLimit

  // Handlers with bounds clamping and lastAction tracking
  const handleIncrement = () => {
    if (disabledIncrement) return
    const nextVal = count + step
    setCount(nextVal)
    setLastAction(`Increased (+${step})`)
  }

  const handleDecrement = () => {
    if (disabledDecrement) return
    const nextVal = count - step
    setCount(nextVal)
    setLastAction(`Decreased (-${step})`)
  }

  const handleReset = () => {
    setCount(0)
    setLastAction('Reset (0)')
  }

  const handleMultiply = () => {
    const nextVal = count * 2
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Multiplied (×2)')
  }

  const handleDivide = () => {
    const nextVal = Math.trunc(count / 2)
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Divided (÷2)')
  }

  const handleInvert = () => {
    const nextVal = -count
    if (isMaxEnabled && nextVal > maxLimit) return
    if (isMinEnabled && nextVal < minLimit) return
    setCount(nextVal)
    setLastAction('Inverted sign (±)')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center">
        
        {/* Milestone 3 Active Tag */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Milestone 3: Core Counter Active</span>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Step: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{step}</span>
          </div>
        </div>

        {/* Counter Card & Controls */}
        <div className="w-full flex flex-col gap-6">
          {/* Animated Counter Display */}
          <CounterDisplay
            count={count}
            lastAction={lastAction}
            minLimit={minLimit}
            maxLimit={maxLimit}
            isMinEnabled={isMinEnabled}
            isMaxEnabled={isMaxEnabled}
          />

          {/* Core Controls */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none">
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
        </div>

        {/* Up Next Preview Footer */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Milestone 4 next: Custom Step Configurator & Min/Max Limit Safeguards</span>
        </div>

      </main>
    </div>
  )
}

export default App
