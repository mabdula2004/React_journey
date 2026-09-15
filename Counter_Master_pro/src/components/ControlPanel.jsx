import React from 'react'
import { Plus, Minus, RotateCcw, Zap, Divide, ArrowUp, ArrowDown } from 'lucide-react'

export default function ControlPanel({
  onIncrement,
  onDecrement,
  onReset,
  onMultiply,
  onDivide,
  onInvert,
  step = 1,
  disabledIncrement = false,
  disabledDecrement = false,
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Primary Actions Grid: Decrement & Increment */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        
        {/* Decrement Button */}
        <button
          onClick={onDecrement}
          disabled={disabledDecrement}
          type="button"
          aria-label={`Decrement by ${step}`}
          className={`group relative flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 px-6 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 select-none shadow-lg active:scale-95 ${
            disabledDecrement
              ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
              : 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 text-white shadow-rose-500/25 hover:shadow-rose-500/35 hover:-translate-y-0.5'
          }`}
        >
          <Minus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:scale-125" />
          <span>Decrease</span>
          <span className="font-mono text-xs sm:text-sm px-2 py-0.5 rounded-lg bg-black/15 text-white/90">
            -{step}
          </span>
          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white ml-auto">
            <ArrowDown className="w-2.5 h-2.5" />
          </span>
        </button>

        {/* Increment Button */}
        <button
          onClick={onIncrement}
          disabled={disabledIncrement}
          type="button"
          aria-label={`Increment by ${step}`}
          className={`group relative flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 px-6 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 select-none shadow-lg active:scale-95 ${
            disabledIncrement
              ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
              : 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5'
          }`}
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:scale-125" />
          <span>Increase</span>
          <span className="font-mono text-xs sm:text-sm px-2 py-0.5 rounded-lg bg-black/15 text-white/90">
            +{step}
          </span>
          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white ml-auto">
            <ArrowUp className="w-2.5 h-2.5" />
          </span>
        </button>

      </div>

      {/* Secondary Actions Grid: Reset & Multipliers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          type="button"
          aria-label="Reset counter to zero"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 shadow-sm active:scale-95 group"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90 duration-300 text-amber-500 group-hover:text-white" />
          <span>Reset (0)</span>
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-1 py-0.2 rounded bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-500 group-hover:text-white group-hover:border-transparent">
            R
          </kbd>
        </button>

        {/* Multiply by 2 */}
        <button
          onClick={onMultiply}
          type="button"
          aria-label="Multiply counter by 2"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 shadow-sm active:scale-95 group"
        >
          <Zap className="w-4 h-4 text-indigo-500 group-hover:text-white transition-transform group-hover:scale-110" />
          <span>Multiply</span>
          <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[11px] bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-700 group-hover:text-white">
            ×2
          </span>
        </button>

        {/* Divide by 2 */}
        <button
          onClick={onDivide}
          type="button"
          aria-label="Divide counter by 2"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 shadow-sm active:scale-95 group"
        >
          <Divide className="w-4 h-4 text-violet-500 group-hover:text-white transition-transform group-hover:scale-110" />
          <span>Divide</span>
          <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[11px] bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 group-hover:bg-violet-700 group-hover:text-white">
            ÷2
          </span>
        </button>

        {/* Invert Sign */}
        <button
          onClick={onInvert}
          type="button"
          aria-label="Invert sign of counter"
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 shadow-sm active:scale-95 group"
        >
          <span className="font-mono font-bold text-slate-500 group-hover:text-white">±</span>
          <span>Invert</span>
          <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[11px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-600 group-hover:text-white">
            +/-
          </span>
        </button>

      </div>
    </div>
  )
}
