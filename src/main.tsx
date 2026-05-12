import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const junLogo = `
      ██╗██╗   ██╗███╗   ██╗
      ██║██║   ██║████╗  ██║
      ██║██║   ██║██╔██╗ ██║
 ██╗  ██║██║   ██║██║╚██╗██║
 ╚█████╔╝╚██████╔╝██║ ╚████║
  ╚════╝  ╚═════╝ ╚═╝  ╚═══╝
`;

console.log(`%c${junLogo}`, "color: #ee9e35; font-weight: bold; text-shadow: 2px 2px 5px #000;");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
