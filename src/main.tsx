import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './style/main.scss'
import './style/tailwind.scss'
import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: string[][]
    gapi: {
      load: (type: 'client', callback: () => void) => void
      client: {
        init: (payload: { apiKey: string; discoveryDocs: string[] }) => Promise<unknown>
      }
    }
  }
}
// 1. Create a client engine instance
const engine = new Styletron()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyletronProvider value={engine} debugAfterHydration>
    <App />
  </StyletronProvider>,
)
