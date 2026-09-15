import React from 'react'
import Navbar from './components/Navbar'
import { useTheme } from './hooks/useTheme'
import { Moon, Sun, CheckCircle2, ArrowRight } from 'lucide-react'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center justify-center">
        
        {/* Milestone 2 Completion Card */}
        <div className="w-full max-w-lg p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-indigo-500/5 text-center transition-all duration-300">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>Milestone 2 Active</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Navbar & Theme Switcher
          </h2>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Dark and light modes are active, dynamically toggled via the navbar button, and persisted in <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-indigo-600 dark:text-indigo-400">localStorage</code>.
          </p>

          <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current Theme Mode
            </span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <span>Next up: Core Counter Display & Controls</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
          </div>

        </div>

      </main>
    </div>
  )
}

export default App
