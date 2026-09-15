import React from 'react'
import { Shield, ShieldAlert, AlertCircle, Check } from 'lucide-react'

export default function LimitsPanel({
  minLimit,
  setMinLimit,
  maxLimit,
  setMaxLimit,
  isMinEnabled,
  setIsMinEnabled,
  isMaxEnabled,
  setIsMaxEnabled,
  currentCount,
  onClampToLimits,
}) {
  const isInvalidRange = isMinEnabled && isMaxEnabled && minLimit >= maxLimit
  const isOutOfBounds =
    (isMinEnabled && currentCount < minLimit) || (isMaxEnabled && currentCount > maxLimit)

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Min / Max Boundaries
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Set safeguards to prevent overshooting limits
            </p>
          </div>
        </div>

        {/* Global Limits State Pill */}
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isMinEnabled || isMaxEnabled
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isMinEnabled && isMaxEnabled
              ? 'Both Active'
              : isMinEnabled
              ? 'Min Only'
              : isMaxEnabled
              ? 'Max Only'
              : 'Off'}
          </span>
        </div>
      </div>

      {/* Invalid Range Warning Alert */}
      {isInvalidRange && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Minimum limit ({minLimit}) must be lower than maximum limit ({maxLimit}).</span>
        </div>
      )}

      {/* Out of Bounds Warning & Quick Clamp */}
      {isOutOfBounds && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>Count ({currentCount}) is currently outside bounds!</span>
          </div>
          {onClampToLimits && (
            <button
              type="button"
              onClick={onClampToLimits}
              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm active:scale-95 transition-all"
            >
              Clamp Now
            </button>
          )}
        </div>
      )}

      {/* Dual Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Min Limit Box */}
        <div
          className={`p-3.5 rounded-xl border transition-all duration-200 ${
            isMinEnabled
              ? 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-300 dark:border-rose-900/60'
              : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Minimum Limit
            </span>
            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsMinEnabled(!isMinEnabled)}
              aria-label="Toggle minimum limit"
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                isMinEnabled ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  isMinEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minLimit}
              disabled={!isMinEnabled}
              onChange={(e) => setMinLimit(parseInt(e.target.value, 10) || 0)}
              className="w-full text-center font-mono font-bold text-sm py-1.5 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-white"
            />
            {/* Quick preset buttons */}
            <button
              type="button"
              disabled={!isMinEnabled}
              onClick={() => setMinLimit(0)}
              className="px-2 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              0
            </button>
            <button
              type="button"
              disabled={!isMinEnabled}
              onClick={() => setMinLimit(-100)}
              className="px-2 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              -100
            </button>
          </div>
        </div>

        {/* Max Limit Box */}
        <div
          className={`p-3.5 rounded-xl border transition-all duration-200 ${
            isMaxEnabled
              ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-900/60'
              : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Maximum Limit
            </span>
            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsMaxEnabled(!isMaxEnabled)}
              aria-label="Toggle maximum limit"
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                isMaxEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  isMaxEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={maxLimit}
              disabled={!isMaxEnabled}
              onChange={(e) => setMaxLimit(parseInt(e.target.value, 10) || 0)}
              className="w-full text-center font-mono font-bold text-sm py-1.5 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
            {/* Quick preset buttons */}
            <button
              type="button"
              disabled={!isMaxEnabled}
              onClick={() => setMaxLimit(50)}
              className="px-2 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              50
            </button>
            <button
              type="button"
              disabled={!isMaxEnabled}
              onClick={() => setMaxLimit(100)}
              className="px-2 py-1.5 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              100
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
