import React from 'react'
import { Sliders, Plus, Minus, Zap } from 'lucide-react'

const PRESET_STEPS = [1, 5, 10, 50, 100]

export default function StepConfigurator({ step, onStepChange }) {
  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val >= 1) {
      onStepChange(val)
    } else if (e.target.value === '') {
      onStepChange(1)
    }
  }

  const handleNudge = (delta) => {
    const nextVal = Math.max(1, step + delta)
    onStepChange(nextVal)
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Step Configuration
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Amount changed per increment or decrement
            </p>
          </div>
        </div>

        {/* Current Step Value Badge */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-mono font-bold">
          <span>Step:</span>
          <span>+{step}</span>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
          Quick Presets
        </span>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_STEPS.map((preset) => {
            const isActive = step === preset
            return (
              <button
                key={preset}
                type="button"
                onClick={() => onStepChange(preset)}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all duration-200 select-none active:scale-95 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 ring-2 ring-indigo-500/50 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                +{preset}
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Step Input & Nudge Controls */}
      <div>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
          Custom Step Value
        </span>
        <div className="flex items-center gap-2">
          {/* Nudge Down */}
          <button
            type="button"
            onClick={() => handleNudge(-1)}
            disabled={step <= 1}
            aria-label="Decrease step by 1"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90 transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Direct Input */}
          <div className="relative flex-1">
            <input
              type="number"
              min="1"
              max="99999"
              value={step}
              onChange={handleInputChange}
              className="w-full text-center font-mono font-bold text-sm sm:text-base py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Nudge Up */}
          <button
            type="button"
            onClick={() => handleNudge(1)}
            aria-label="Increase step by 1"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 active:scale-90 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
