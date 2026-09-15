import React from 'react'
import { History, Download, Trash2, Clock, Plus, Minus, RotateCcw, Zap, Divide, RefreshCw } from 'lucide-react'

export default function HistoryLog({ history = [], onClearHistory }) {
  // Export History as JSON file
  const handleExportJSON = () => {
    if (history.length === 0) return
    const exportData = {
      app: 'Counter Master Pro',
      exportedAt: new Date().toISOString(),
      totalEntries: history.length,
      history: history,
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `counter-history-${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Get action styling
  const getActionBadge = (type) => {
    switch (type) {
      case 'increment':
        return {
          label: 'Increased',
          color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
          icon: Plus,
        }
      case 'decrement':
        return {
          label: 'Decreased',
          color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
          icon: Minus,
        }
      case 'reset':
        return {
          label: 'Reset',
          color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
          icon: RotateCcw,
        }
      case 'multiply':
        return {
          label: 'Multiplied',
          color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
          icon: Zap,
        }
      case 'divide':
        return {
          label: 'Divided',
          color: 'text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800',
          icon: Divide,
        }
      case 'invert':
      case 'clamp':
      default:
        return {
          label: type ? type.toUpperCase() : 'ACTION',
          color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
          icon: RefreshCw,
        }
    }
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Activity Log</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {history.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Audit trail of all counter changes
            </p>
          </div>
        </div>

        {/* Action Buttons: Export & Clear */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleExportJSON}
            disabled={history.length === 0}
            title="Export history as JSON"
            type="button"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            title="Clear all history"
            type="button"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="py-8 px-4 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500">
          <Clock className="w-8 h-8 stroke-[1.5] mb-2 opacity-50" />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            No activity recorded yet
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Use the buttons or keyboard shortcuts to start counting
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto pr-1">
          {history.map((entry) => {
            const badge = getActionBadge(entry.type)
            const Icon = badge.icon
            return (
              <div
                key={entry.id}
                className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-1 rounded-lg transition-colors"
              >
                {/* Left: Badge + Operation */}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[10px] border ${badge.color}`}>
                    <Icon className="w-2.5 h-2.5" />
                    <span>{badge.label}</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {entry.delta}
                  </span>
                </div>

                {/* Right: Result Value & Timestamp */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                    = {entry.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {entry.timestamp}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* History Stats Summary */}
      {history.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Session: {history.length} operations</span>
          <button
            onClick={handleExportJSON}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            Export log (.json)
          </button>
        </div>
      )}
    </div>
  )
}
