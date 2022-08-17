import styled from '@mui/material/styles/styled'
import Box from '@mui/material/Box'

export const Root = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
        margin: 6
    }
}))
