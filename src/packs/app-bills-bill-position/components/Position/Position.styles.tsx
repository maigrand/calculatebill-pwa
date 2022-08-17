import styled from '@mui/material/styles/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const SBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
        margin: 6
    }
}))

export const STypography = styled(Typography)(() => ({
    margin: 4
}))
