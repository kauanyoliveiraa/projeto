import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

//import './index.css'
//import App from './App.jsx'

import Rotas from './rotas.jsx'

import './pages/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
