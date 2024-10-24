import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { TodosProvider } from './store/todos';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <TodosProvider>
      <App />
    </TodosProvider>
    </BrowserRouter>
  </StrictMode>,
)
