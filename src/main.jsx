import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WalletKitProvider } from './providers/WalletKitProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <WalletKitProvider>
        <App />
    </WalletKitProvider>
  </StrictMode>,
)
