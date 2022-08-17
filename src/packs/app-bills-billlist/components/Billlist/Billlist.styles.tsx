import styled from '@mui/material/styles/styled'
import FabBase from '@mui/material/Fab'
import Box from '@mui/material/Box'

export const Fab = styled(FabBase)(() => ({
    position: 'absolute',
    bottom: 32,
    right: 32
}))

export const Root = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}))
