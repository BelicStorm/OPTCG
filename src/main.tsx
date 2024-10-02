import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './layouts/default.layout'
import AllCards from './pages/allCards.view'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
       <AllCards/>
    </Layout>
  </StrictMode>,
)
