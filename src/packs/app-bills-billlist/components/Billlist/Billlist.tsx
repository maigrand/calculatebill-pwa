import React from 'react'
import * as Styles from './Billlist.styles'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { Add as AddIcon } from '@mui/icons-material'

export interface IBill {
    name: string,
    date: Date,
    guests: []
}

export default function Billlist() {
    const [billName, setBillName]= React.useState('')
    const [billDialogOpen, setBillDialogOpen]= React.useState(false)

    const bills= React.useMemo(() => {
        return localStorage.getItem("bills") === null ? [] : JSON.parse(localStorage.getItem("bills") || "")
    }, [
        billName
    ])

    const handleAddBill= (billName: string) => {
        bills.push({
            name: billName,
            date: new Date(),
            guests: []
        })
        localStorage.setItem("bills", JSON.stringify(bills))
    }

    React.useEffect(() => {

    }, [
        bills
    ])

    return (
        <>
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
            <Styles.SFab
                onClick={() => setBillDialogOpen(true)}
            >
                <AddIcon />
            </Styles.SFab>
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
        </>
    )
}
