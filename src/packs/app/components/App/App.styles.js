import styled from '@mui/material/styles/styled'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'

export const MenuLogo= styled(SvgIcon)((theme) => ({
    marginRight: 24,
    color: theme.palette.primary.light,
}))

export const MenuButton= styled(IconButton)(() => ({
    marginRight: 12
}))
