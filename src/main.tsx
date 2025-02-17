import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalState } from './context/ModalContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!)
.render(
<BrowserRouter>
  <ModalState>
    <App />
  </ModalState>
</BrowserRouter>
)
