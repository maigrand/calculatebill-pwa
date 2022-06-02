import React from 'react'
import * as Styles from './Bill.styles'
import { useParams, Routes, Route } from 'react-router-dom'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { Add as AddIcon } from '@mui/icons-material'

export default function Bill() {
    const params= useParams()
    const billName= params.id

    const bills= React.useMemo(() => {
        return JSON.parse(localStorage.getItem("bills"))
    }, [

    ])
    const bill= bills.filter((bill) => bill.name === billName)[0]

    const [guestDialogOpen, setGuestDialogOpen]= React.useState(false)
    const [guestName, setGuestName]= React.useState('')
    const [currentGuestName, setCurrentGuestName]= React.useState('')

    const [positionsDialogOpen, setPositionsDialogOpen]= React.useState(false)
    const [positionName, setPositionName]= React.useState('')
    const [positionCost, setPositionCost]= React.useState('')

    React.useEffect(() => {

    }, [
        bills
    ])

    const handleAddGuest= (guestName) => {
        bill.guests.push({
            name: guestName,
            positions: []
        })
        bills[bill]= bill
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    const handleAddPosition= (currentGuestName, positionName, positionCost) => {
        const guest= bill.guests.filter((guest) => guest.name === currentGuestName)[0]
        guest.positions.push({
            name: positionName,
            cost: positionCost,
        })
        bill.guests[guestName] = guest
        bills[bill] = bill
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    return (
        <Styles.DivRoot>
            <List>
                {!!bill.guests && bill.guests.map((guest) => (
                    <ListItem key={guest.name}>
                        <ListItemText
                            primary={guest.name}
                            secondary={guest.positions.map((position) => `${position.name}:${position.cost} `)}
                            onClick={() => {
                                setPositionsDialogOpen(true)
                                setCurrentGuestName(guest.name)
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Fab onClick={() => setGuestDialogOpen(true)}>
                 <AddIcon/>
            </Fab>
            <Dialog open={guestDialogOpen}>
                <DialogContent>
                    <TextField
                        required
                        label="input"
                        onChange={(e) => setGuestName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleAddGuest(guestName)
                            setGuestDialogOpen(false)
                        }}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setGuestDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={positionsDialogOpen}>
                <DialogContent>
                    <TextField
                        required
                        label="Position"
                        onChange={(e) => setPositionName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Cost"
                        onChange={(e) => setPositionCost(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleAddPosition(currentGuestName, positionName, positionCost)
                            setPositionsDialogOpen(false)
                        }}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setPositionsDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Styles.DivRoot>
    )
}
