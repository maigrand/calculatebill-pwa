import React from 'react'

import { IBill } from '../../../app-bills/components/Bills/Bills.interfaces'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import {ListItem, MenuItem, OutlinedInput, Select, SelectChangeEvent} from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

interface PositionGuestProps {
    guests: IBill['guests']
    open: boolean
    onClose: () => void
    //handleAddGuest: (name: string) => void
}

export default function PositionGuestDialog(props: PositionGuestProps) {
    const { guests, open, onClose } = props
    //const { handleAddGuest } = props

    //@FIXME: убрать initialState
    const [ value, setValue ] = React.useState<string>('')

    const handleChange = React.useCallback((event: SelectChangeEvent<typeof value>) => {
        setValue(event.target.value)
    }, [])

    const handleClick = React.useCallback((value: string) => {
        //handleAddGuest(value)
        onClose()
    }, [])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Guest</DialogTitle>
            <DialogContent>
                <Select
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Guest"/>}
                >
                    {guests != null && guests.map((guest) => (
                        <MenuItem value={guest}>{guest}</MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClick(value)}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
