import React, { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Hash, AlertTriangle } from 'lucide-react'

export default function CounterDisplay({
  count,
  lastAction,
  minLimit,
  maxLimit,
  isMinEnabled,
  isMaxEnabled,
}) {
  const [isBumping, setIsBumping] = useState(false)

  // Trigger brief bump micro-animation whenever count changes
  useEffect(() => {
    setIsBumping(true)
    const timer = setTimeout(() => setIsBumping(false), 200)
    return () => clearTimeout(timer)
  }, [count])

  // Determine state & color themes
  const isPositive = count > 0
  const isNegative = count < 0
  const isZero = count === 0

  const isAtMin = isMinEnabled && count <= minLimit
  const isAtMax = isMaxEnabled && count >= maxLimit

  // Color palette based on value
  const getThemeStyles = () => {
    if (isPositive) {
      return {
        text: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        glow: 'shadow-emerald-500/10 dark:shadow-emerald-400/5',
        gradient: 'from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/15 dark:to-teal-500/5',
        ring: 'ring-emerald-500/20',
        icon: TrendingUp,
        label: 'Positive',
      }
    }
    if (isNegative) {
      return {
        text: 'text-rose-600 dark:text-rose-400',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
        glow: 'shadow-rose-500/10 dark:shadow-rose-400/5',
        gradient: 'from-rose-500/10 to-pink-500/5 dark:from-rose-500/15 dark:to-pink-500/5',
        ring: 'ring-rose-500/20',
        icon: TrendingDown,
        label: 'Negative',
      }
    }
    return {
      text: 'text-slate-700 dark:text-slate-200',
      badgeBg: 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
      glow: 'shadow-slate-500/5',
      gradient: 'from-slate-500/5 to-indigo-500/5 dark:from-slate-800/30 dark:to-indigo-950/20',
      ring: 'ring-slate-400/10',
      icon: Minus,
      label: 'Zero (Neutral)',
    }
  }

  const themeStyle = getThemeStyles()
  const IconComponent = themeStyle.icon

  // Calculate parity (Even/Odd)
  const isEven = count % 2 === 0

  return (
    <div className={`relative w-full rounded-3xl p-6 sm:p-10 transition-all duration-500 glass-panel shadow-2xl ${themeStyle.glow} border border-slate-200/80 dark:border-slate-800/80 overflow-hidden`}>
      
      {/* Dynamic Background Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-b ${themeStyle.gradient} pointer-events-none transition-all duration-700`} />

      {/* Decorative Blur Spheres */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Top Badges: Status & Parity */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${themeStyle.badgeBg} transition-colors duration-300`}>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{themeStyle.label}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
            <Hash className="w-3 h-3 text-slate-400" />
            <span>{isEven ? 'Even' : 'Odd'}</span>
          </span>

          {/* Boundary Alert Badges */}
          {isAtMin && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>Min Limit Hit</span>
            </span>
          )}

          {isAtMax && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>Max Limit Hit</span>
            </span>
          )}
        </div>

        {/* The Giant Animated Counter Display */}
        <div className="my-2 sm:my-4 flex items-center justify-center select-none">
          <div
            className={`font-mono text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter transition-all duration-200 transform ${
              themeStyle.text
            } ${isBumping ? 'scale-108' : 'scale-100'}`}
            style={{ textShadow: isPositive ? '0 0 40px rgba(16, 185, 129, 0.2)' : isNegative ? '0 0 40px rgba(244, 63, 94, 0.2)' : 'none' }}
          >
            {count}
          </div>
        </div>

        {/* Subtitle / Last Action Summary */}
        <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          <span>Last action:</span>
          <span className="font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
            {lastAction || 'None (Initial state)'}
          </span>
        </div>

      </div>

    </div>
  )
}
