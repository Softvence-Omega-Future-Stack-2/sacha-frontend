import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import './i18n.js'
import "./fonts/larken.css";
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
