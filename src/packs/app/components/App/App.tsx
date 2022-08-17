import React from 'react'
import * as Styles from './App.styles'

import AppRoutes from './App.routes'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

export default function App() {

    const [menuOpen, setMenuOpen]= React.useState<boolean>(false)

    return (
        <>
            <AppBar
                position="sticky"
                color="default"
                elevation={1}
            >
                <Container maxWidth={false}>
                    <Toolbar disableGutters>
                        <Styles.MenuButton
                            color="inherit"
                            edge="start"
                            onClick={() => setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </Styles.MenuButton>
                        <Typography variant="h6">
                            CalculateBill
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            >
                <AppBar
                    position="sticky"
                    color="default"
                    elevation={1}
                >
                    <Container maxWidth={false}>
                        <Toolbar disableGutters>
                            <Styles.MenuLogo>
                                <path fill="currentColor" d="M4,4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12C20,10.89 20.9,10 22,10V6C22,4.89 21.1,4 20,4H4M15.5,7L17,8.5L8.5,17L7,15.5L15.5,7M8.81,7.04C9.79,7.04 10.58,7.83 10.58,8.81A1.77,1.77 0 0,1 8.81,10.58C7.83,10.58 7.04,9.79 7.04,8.81A1.77,1.77 0 0,1 8.81,7.04M15.19,13.42C16.17,13.42 16.96,14.21 16.96,15.19A1.77,1.77 0 0,1 15.19,16.96C14.21,16.96 13.42,16.17 13.42,15.19A1.77,1.77 0 0,1 15.19,13.42Z" />
                            </Styles.MenuLogo>
                            <Typography variant="h6">
                                CalculateBill
                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Drawer>
            <AppRoutes />
        </>
    )
}
