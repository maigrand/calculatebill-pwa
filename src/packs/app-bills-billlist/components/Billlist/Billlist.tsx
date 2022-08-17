import React from 'react'
import * as Styles from './Billlist.styles'
import { Link } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'

import {IBill} from '../../../app-bills/components/Bills/Bills.interfaces'

export default function Billlist() {
    const [billName, setBillName]= React.useState('')
    const [billDialogOpen, setBillDialogOpen]= React.useState(false)

    const bills: IBill[] = React.useMemo(() => {
        return localStorage.getItem("bills") === null ? [] : JSON.parse(localStorage.getItem("bills") || "")
    }, [
        billName
    ])

    const handleAddBill = (billName: string) => {
        bills.push({
            id: uuidv4(),
            name: billName,
            date: new Date(),
        })
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    React.useEffect(() => {

    }, [
        bills
    ])

    return (
        <Styles.Root>
            <List>
                {bills.length === 0 && (
                    <ListItem>
                        <ListItemText primary="No bills"/>
                    </ListItem>
                )}
                {bills.map((bill: IBill) => (
                    <ListItem key={bill.name}>
                        <Link to={`/${bill.name}`}>
                            <ListItemText primary={bill.name} secondary={bill.date.toString()}/>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Styles.Fab
                onClick={() => setBillDialogOpen(true)}
            >
                <AddIcon />
            </Styles.Fab>
            <Dialog open={billDialogOpen}>
                <DialogTitle>Test Dialog</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label="input"
                        onChange={(e)=> setBillName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleAddBill(billName)
                            setBillDialogOpen(false)
                        }}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setBillDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Styles.Root>
    )
}
