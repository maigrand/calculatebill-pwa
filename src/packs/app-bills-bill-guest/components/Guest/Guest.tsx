import React from 'react'
import * as Styles from './Guest.styles'

import GuestDialog from '../GuestDialog/GuestDialog'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { IBill } from '../../../app-bills/components/Bills/Bills.interfaces'

interface GuestProps {
    guests: IBill['guests']
    onChangeGuests: (guests: IBill['guests']) => void
}

export default function Guest(props: GuestProps) {
    const { guests, onChangeGuests } = props

    const [ guestDialogOpen, setGuestDialogOpen ] = React.useState(false)

    const handleAddGuest = (guestName: string) => {
        if (guests) {
            const nGuests = [...guests, guestName]
            onChangeGuests(nGuests)
        } else {
            const nGuests = [guestName]
            onChangeGuests(nGuests)
        }
    }

    const handleCloseGuestDialog = React.useCallback(() => {
        setGuestDialogOpen(false)
    }, [])

    return (
        <Styles.Root>
            <Fab>
                <AddIcon onClick={() => setGuestDialogOpen(true)}/>
            </Fab>
            {guests != null && guests.map((guestName) => (
                <IconButton>
                    <Typography>{guestName}</Typography>
                </IconButton>
            ))}
            <GuestDialog
                open={guestDialogOpen}
                onClose={handleCloseGuestDialog}
                handleAddGuest={handleAddGuest}
            />
        </Styles.Root>
    )
}
