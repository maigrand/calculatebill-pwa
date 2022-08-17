import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'
import { HashRouter } from 'react-router-dom'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import { theme } from './theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'

import App from './packs/app/components/App/App'

const root= ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <App />
            </HashRouter>
        </ThemeProvider>
    </React.StrictMode>
)

serviceWorkerRegistration.register()
reportWebVitals()
