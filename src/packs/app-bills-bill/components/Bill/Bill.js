import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from './Bill.styles'

import { useParams, Routes, Route } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'

const useStyles= makeStyles(styles, {
    name: Bill.name
})

export default function Bill() {
    const classes= useStyles()
    const params= useParams()
    const billName= params.id

    const bills= JSON.parse(localStorage.getItem("bills"))
    const bill= bills.filter((bill) => bill.name === billName)[0]

    const [guestDialogOpen, setGuestDialogOpen]= React.useState(false)
    const [guestName, setGuestName]= React.useState('')
    const [currentGuestName, setCurrentGuestName]= React.useState('')

    const [positionsDialogOpen, setPositionsDialogOpen]= React.useState(false)
    const [positionName, setPositionName]= React.useState('')
    const [positionCost, setPositionCost]= React.useState('')

    React.useEffect(() => {

    }, [
        bill
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
        <div className={classes.root}>
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
        </div>
    )
}
