# Land Pricing AI Dashboard

A modern, high-fidelity React dashboard developed for a Final Year Project (FYP). This application visualizes a multi-stage AI pipeline for land valuation, supporting both Urban and Rural contexts with unique feature sets.

## 🚀 Features

- **Interactive Valuation Pipeline**: Visual transition from Raw Data -> ML Model (Rupees) -> GenAI Context Adjustment.
- **Dynamic Context Toggling**: Switch between Urban and Rural land types to see specific inputs like "Soil Quality" or "Metro Proximity".
- **Location-Aware Reporting**: Input a specific location (e.g., Coimbatore South) and see it reflected in the final valuation report.
- **Premium UI**: Dark-mode glassmorphism design with smooth animations using Framer Motion.
- **Currency Awareness**: Full support for Indian Rupee (₹) formatting.

## 🛠️ Technical Stack

- **Vite + React**: Core framework for performance and reactivity.
- **Framer Motion**: For smooth pipeline transitions and micro-animations.
- **Recharts**: Data visualization for market value projections.
- **Lucide-React**: Clean, modern iconography.
- **Vanilla CSS**: Custom styling for maximum control over aesthetics.

## 🏃 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to the URL shown in your terminal (usually `http://localhost:5173/`).

## 📁 Project Structure

- `src/components/LandInputs.jsx`: Handle all user-facing land feature parameters.
- `src/components/ValuationDashboard.jsx`: The core visualization engine for the AI pipeline.
- `src/components/CurrencyDisplay.jsx`: Utility for formatting Indian Rupees.
- `src/App.jsx`: State orchestration and layout.

---
*Developed as part of a Pricing Pipeline FYP.*
