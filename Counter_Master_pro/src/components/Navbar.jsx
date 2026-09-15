import React from 'react'
import { Sun, Moon, Sparkles, Command, Sliders, Activity } from 'lucide-react'

export default function Navbar({ theme, toggleTheme, onOpenShortcuts }) {
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 select-none">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
              <Activity className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-700 dark:from-white dark:via-indigo-100 dark:to-slate-300 bg-clip-text text-transparent">
                Counter Master
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm shadow-indigo-500/30">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              Interactive State & Analytics Studio
            </span>
          </div>
        </div>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Keyboard Shortcuts Hint / Trigger */}
          {onOpenShortcuts && (
            <button
              onClick={onOpenShortcuts}
              type="button"
              title="Keyboard Shortcuts (Press ?)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200 active:scale-95"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Shortcuts</span>
              <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500">
                ?
              </kbd>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:shadow active:scale-90 group focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
              {/* Sun icon for dark mode (click to switch to light) */}
              <Sun
                className={`w-5 h-5 text-amber-500 absolute transition-all duration-300 transform ${
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-0 opacity-0'
                }`}
              />
              {/* Moon icon for light mode (click to switch to dark) */}
              <Moon
                className={`w-5 h-5 text-indigo-600 dark:text-indigo-400 absolute transition-all duration-300 transform ${
                  !isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                }`}
              />
            </div>
            
            {/* Ping indicator for hover flair */}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>

      </div>
    </header>
  )
}
