import React, { Key } from 'react'
import * as Styles from './Bill.styles'
import { useParams } from 'react-router-dom'

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
import Typography from '@mui/material/Typography'

import { IBill } from '../../../app-bills-billlist/components/Billlist/Billlist'

interface IGuest {
    name: String,
    positions: IPosition[],
}

interface IPosition {
    name: String,
    cost: Number,
}

export default function Bill() {
    const params= useParams()
    const billName= params.id

    const bills= React.useMemo(() => {
        return JSON.parse(localStorage.getItem("bills") as string)
    }, [
        billName
    ])

    const bill= React.useMemo(() => {
        return bills.filter((bill: IBill) => bill.name === billName)[0]
    }, [
        billName
    ])

    const [guestDialogOpen, setGuestDialogOpen]= React.useState<boolean>(false)
    const [guestName, setGuestName]= React.useState<string>('')
    const [currentGuestName, setCurrentGuestName]= React.useState<String>('')

    const [positionsDialogOpen, setPositionsDialogOpen]= React.useState<boolean>(false)
    const [positionName, setPositionName]= React.useState<string>('')
    const [positionCost, setPositionCost]= React.useState<number>(0)

    const [totalCost, setTotalCost]= React.useState<number>(0)

    const handleTotalCost= () => {
        let total: number = 0
        for (const guest of bill.guests) {
            for (const position of guest.positions) {
                total += parseFloat(position.cost)
            }
        }
        setTotalCost(total)
    }

    console.log(totalCost)

    React.useEffect(() => {
        handleTotalCost
    }, [])

    const handleAddGuest= (guestName: String) => {
        bill.guests.push({
            name: guestName,
            positions: []
        })
        bills[bill]= bill
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    const handleAddPosition= (currentGuestName: String, positionName: String, positionCost: Number) => {
        const guest= bill.guests.filter((guest: IGuest) => guest.name === currentGuestName)[0]
        guest.positions.push({
            name: positionName,
            cost: positionCost,
        })
        bill.guests[guestName] = guest
        bills[bill] = bill
        localStorage.setItem("bills", JSON.stringify(bills))
        handleTotalCost()
    }

    return (
        <Styles.DivRoot>
            <List>
                {!!bill.guests && bill.guests.map((guest: IGuest) => (
                    <ListItem key={guest.name as Key}>
                        <ListItemText
                            primary={guest.name}
                            secondary={guest.positions.map((position: IPosition) => `${position.name}:${position.cost} `)}
                            onClick={() => {
                                setPositionsDialogOpen(true)
                                setCurrentGuestName(guest.name)
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography>
                TotalCost: {totalCost}
            </Typography>
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
                        onChange={(e) => setPositionCost(parseFloat(e.target.value))}
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
