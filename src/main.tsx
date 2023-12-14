import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { BillProvider } from './context/Bill.tsx';
import { GoalProvider } from './context/Goal.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BillProvider>
        <GoalProvider>
          <App />
        </GoalProvider>
      </BillProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
