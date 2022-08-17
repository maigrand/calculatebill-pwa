import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

interface GuestDialogProps {
    open: boolean
    onClose: () => void
    handleAddGuest: (guestName: string) => void
}

export default function GuestDialog(props: GuestDialogProps) {
    const { open, onClose, handleAddGuest } = props

    const [ guestName, setGuestName ] = React.useState<string | null>(null)

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <TextField
                    required
                    label="Guest name"
                    onChange={(e) => setGuestName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={guestName === null}
                    onClick={() => {
                        handleAddGuest(guestName as string)
                        onClose()
                    }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
