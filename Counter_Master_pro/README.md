# Counter Master Pro ⚡

> A modern, interactive, and beautifully styled React counter and state management studio built with **Vite**, **Tailwind CSS**, and **Lucide React**.

![Counter Master Pro Preview](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/activity.svg)

---

## ✨ Features & Capabilities

### 1. 🎯 Core Counter & Dynamic Aesthetics
- **Large Animated Display**: High-impact reactive typography with subtle micro-scale bump animations on value updates.
- **Adaptive Auto-Fitting**: Automatically scales font size down as numbers grow (hundreds, millions, billions) so text never overflows card borders.
- **Dynamic Color Shifts**: 
  - **Emerald Green** for positive values ($> 0$)
  - **Rose Red** for negative values ($< 0$)
  - **Neutral Slate / Indigo** for zero ($0$)
- **Contextual Badges**: Real-time indicators for Positive/Negative/Zero and Even/Odd parity.
- **Number Formats**: Quick toggle between formatted thousand separators (`892,080,332`) and raw numbers.

### 2. 🎮 Comprehensive Control Panel
- **Increment & Decrement**: Large, tactile buttons with step-awareness and micro-interaction effects.
- **Reset (0)**: Instant reset with smooth rotating icon animation.
- **Multipliers**: Quick `×2` multiplication and `÷2` division.
- **Invert Sign**: One-click `±` sign inverter.
- **Intelligent Safeguards**: Actions are automatically disabled or restricted when boundary limits are reached.

### 3. ⚙️ Step Configurator
- **Quick Presets**: Instant pills for `+1`, `+5`, `+10`, `+50`, and `+100`.
- **Custom Numeric Step**: Direct numeric input with nudge up (`+`) and nudge down (`-`) buttons.

### 4. 🛡️ Min / Max Boundary Safeguards
- **Independent Toggles**: Separate activation switches for Minimum and Maximum thresholds.
- **Quick Preset Boundaries**: Quick boundary presets (`0`, `-100`, `50`, `100`).
- **Visual Alert Badges**: Pulsing badges warning when minimum or maximum limit is hit.
- **One-Click Clamp**: Instant "Clamp Now" action if current value drifts outside configured boundaries.

### 5. 📜 Activity History Log
- **Real-Time Audit Trail**: Detailed log capturing timestamp (`HH:MM:SS`), action type, delta, and resulting snapshot value.
- **Color-Coded Action Pills**: Color-matched pills for every operation type.
- **Export JSON**: One-click download of the complete session history as a structured `.json` file.
- **Clear History**: Quick session reset with clean empty-state illustration.

### 6. ⌨️ Global Keyboard Navigation
| Key | Action |
| :--- | :--- |
| <kbd>↑</kbd> | Increase counter by active step |
| <kbd>↓</kbd> | Decrease counter by active step |
| <kbd>R</kbd> | Reset counter to 0 |
| <kbd>M</kbd> | Multiply counter by 2 (`×2`) |
| <kbd>D</kbd> | Divide counter by 2 (`÷2`) |
| <kbd>?</kbd> | Toggle Keyboard Shortcuts Modal |
| <kbd>Esc</kbd> | Close active modal dialog |

*Note: Hotkeys are intelligently disabled when the user is typing into input fields.*

### 7. 🌓 Theme Persistence & Glassmorphism
- **Dark / Light Mode**: Seamless theme switcher in Navbar with sun/moon transition animation.
- **Local Persistence**: Stores user preference in `localStorage` and automatically syncs with system color scheme.
- **Glassmorphism Design**: Frosted glass panels, backdrop blurs (`backdrop-blur-xl`), soft glowing gradients, and custom sleek scrollbars.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd Counter_Master_pro

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
```
The optimized production output will be generated in the `dist/` folder.

---

## 📁 Project Structure

```
Counter_Master_pro/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx                       # Main studio container & state orchestration
│   ├── index.css                     # Tailwind CSS v4 directives & glassmorphic tokens
│   ├── hooks/
│   │   └── useTheme.js               # Theme state management & localStorage persistence
│   └── components/
│       ├── Navbar.jsx                # Sticky glassmorphic navbar with theme toggle
│       ├── CounterDisplay.jsx        # Animated auto-fitting counter with color shifts
│       ├── ControlPanel.jsx          # Primary actions, multipliers, and sign inversion
│       ├── StepConfigurator.jsx      # Custom step inputs and quick preset pills
│       ├── LimitsPanel.jsx           # Min/Max boundary controls with alerts
│       ├── HistoryLog.jsx            # Timestamped activity history & JSON export
│       └── KeyboardShortcutsModal.jsx # Accessible hotkeys guide
```

---

## 📄 License
MIT License. Crafted with modern web design standards.
