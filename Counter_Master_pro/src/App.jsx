import React, { useState } from 'react'
import Navbar from './components/Navbar'
import CounterDisplay from './components/CounterDisplay'
import ControlPanel from './components/ControlPanel'
import StepConfigurator from './components/StepConfigurator'
import LimitsPanel from './components/LimitsPanel'
import { useTheme } from './hooks/useTheme'
import { CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react'

function App() {
  const { theme, toggleTheme } = useTheme()

  // Counter core state
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [lastAction, setLastAction] = useState('Initial state (0)')

  // Min / Max boundary states
  const [minLimit, setMinLimit] = useState(-50)
  const [maxLimit, setMaxLimit] = useState(100)
  const [isMinEnabled, setIsMinEnabled] = useState(false)
  const [isMaxEnabled, setIsMaxEnabled] = useState(false)

  // Validation checks for buttons
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

  const handleClampToLimits = () => {
    let clamped = count
    if (isMinEnabled && clamped < minLimit) clamped = minLimit
    if (isMaxEnabled && clamped > maxLimit) clamped = maxLimit
    setCount(clamped)
    setLastAction(`Clamped to limits (${clamped})`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col">
        
        {/* Milestone Indicator Banner */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Milestone 4: Step Config & Limits Active</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Step: <strong className="font-mono text-indigo-600 dark:text-indigo-400">{step}</strong></span>
            <span>•</span>
            <span>
              Limits: <strong className="text-slate-700 dark:text-slate-300">
                {isMinEnabled ? `Min ${minLimit}` : 'None'} | {isMaxEnabled ? `Max ${maxLimit}` : 'None'}
              </strong>
            </span>
          </div>
        </div>

        {/* Studio Grid: Counter + Controls on left/center, Settings on right */}
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

        {/* Up Next Preview Footer */}
        <div className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Milestone 5 next: Action History Log & Keyboard Shortcuts</span>
        </div>

      </main>
    </div>
  )
}

export default App
