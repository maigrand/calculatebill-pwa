import React, { Key } from 'react'
import * as Styles from './Bill.styles'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Add as AddIcon } from '@mui/icons-material'
import { Edit as EditIcon } from '@mui/icons-material'
import { Delete as DeleteIcon } from '@mui/icons-material'

import { IBill } from '../../../app-bills-billlist/components/Billlist/Billlist'

interface IGuest {
    id: string,
    name: string,
    positions: IPosition[],
}

interface IPosition {
    id: string,
    name: string,
    cost: number,
}

export default function Bill() {
    const params = useParams()
    const billName = params.id

    const [guestDialogOpen, setGuestDialogOpen] = React.useState(false)
    const [guestName, setGuestName] = React.useState('')
    const [guestId, setGuestId] = React.useState('')

    const [positionDialogOpen, setPositionDialogOpen] = React.useState(false)
    const [positionName, setPositionName] = React.useState('')
    const [positionCost, setPositionCost] = React.useState(0)

    const [totalCost, setTotalCost] = React.useState(0)

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

    const handleTotalCost = () => {
        let total = 0
        bill.guests.forEach((guest: IGuest) => {
            guest.positions.forEach((position: IPosition) => {
                total += position.cost
            })
        })
        setTotalCost(total)
    }

    React.useEffect(() => {
        if (bill) {
            handleTotalCost()
        }
    },[
        totalCost,
    ])

    const handleAddGuest = (guestName: string) => {
        bill.guests.push({
            id: uuidv4(),
            name: guestName,
            positions: []
        })
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    //@FIXME: нет ререндера
    const handleDeleteGuest = (guestId: string) => {
        bill.guests = bill.guests.filter((guest: IGuest) => guest.id !== guestId)
        bills[bill] = bill
        localStorage.setItem("bills", JSON.stringify(bills))
        handleTotalCost()
    }

    const getGuestTotalCost = (guestId: string) => {
        let total = 0
        bill.guests.forEach((guest: IGuest) => {
            if (guest.id === guestId) {
                guest.positions.forEach((position: IPosition) => {
                    total += position.cost
                })
            }
        })
        return total
    }

    const handleAddPosition = (guestId: string, positionName: string, positionCost: number) => {
        const guest = bill.guests.filter((guest: IGuest) => guest.id === guestId)[0]
        guest.positions.push({
            id: uuidv4(),
            name: positionName,
            cost: positionCost
        })
        bills[bill] = bill
        localStorage.setItem("bills", JSON.stringify(bills))
        handleTotalCost()
    }

    const handleDeletePosition = (guestId: string, positionId: string) => {
        const guest = bill.guests.filter((guest: IGuest) => guest.id === guestId)[0]
        guest.positions = guest.positions.filter((position: IPosition) => position.id !== positionId)
        bills[bill] = bill
        localStorage.setItem("bills", JSON.stringify(bills))
        handleTotalCost()
    }

    return (
        <Styles.Root>
            <Box sx={{
                        width: '20%',
                        height: '100%',
                    }}
            >
                <List>
                    {!!bill.guests && bill.guests.map((guest: IGuest) => (
                        <>
                            <ListItem key={guest.id}>
                                <ListItemText primary={guest.name} secondary={getGuestTotalCost(guest.id)}/>
                                <Button>
                                    <AddIcon onClick={() => {
                                        setPositionDialogOpen(true)
                                        setGuestId(guest.id)
                                    }}/>
                                </Button>
                                <Button>
                                    <EditIcon/>
                                </Button>
                                <Button>
                                    <DeleteIcon onClick={() => handleDeleteGuest(guest.id)}/>
                                </Button>
                            </ListItem>
                            {!!guest.positions && guest.positions.map((position: IPosition) => (
                                <ListItem key={position.id}>
                                    <ListItemText primary={position.name} secondary={position.cost.toString()}/>
                                    <Button>
                                        <EditIcon/>
                                    </Button>
                                    <Button>
                                        <DeleteIcon
                                            onClick={() => handleDeletePosition(guest.id, position.id)}
                                        />
                                    </Button>
                                </ListItem>
                            ))}
                        </>
                    ))}
                </List>
                <Typography variant="body1">
                    TotalCost: {totalCost}
                </Typography>
                <Fab onClick={() => setGuestDialogOpen(true)}>
                    <AddIcon/>
                </Fab>

                <Dialog open={guestDialogOpen}>
                    <DialogContent>
                        <TextField
                            required
                            label="Guest Name"
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

                <Dialog open={positionDialogOpen}>
                    <DialogContent>
                        <TextField
                            required
                            label="Position Name"
                            onChange={(e) => setPositionName(e.target.value)}
                        />
                        <TextField
                            required
                            label="Position Cost"
                            onChange={(e) => setPositionCost(Number(e.target.value))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleAddPosition(guestId, positionName, positionCost)
                                setPositionDialogOpen(false)
                            }}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => setPositionDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Styles.Root>
    )
}
