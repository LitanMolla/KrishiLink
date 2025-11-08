import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContexProvider from './contexts/ContexProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContexProvider>
      <RouterProvider router={router} />
    </ContexProvider>
  </StrictMode>,
)
