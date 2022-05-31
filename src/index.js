import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import { theme } from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import App from './packages/app/components/App/App.js'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <App />
            </HashRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()
reportWebVitals()
