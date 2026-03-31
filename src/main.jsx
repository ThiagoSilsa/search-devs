import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
const router = createBrowserRouter(routes)

// Chackra
import { Provider } from './components/ui/provider.jsx'


// Fonts
import './assets/fonts.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
