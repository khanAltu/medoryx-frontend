import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login'
import './index.css' // Agar css file ka naam alag hai toh use badal sakte hain

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
