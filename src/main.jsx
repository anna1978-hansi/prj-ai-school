import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import ChatSSE from './components/test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
    {/* <ChatSSE /> */}
  </StrictMode>,
)
