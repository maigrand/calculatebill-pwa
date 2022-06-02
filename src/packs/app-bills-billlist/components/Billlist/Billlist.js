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

export default function Billlist() {
    const classes= {}
    const [billName, setBillName]= React.useState('')
    const [billDialogOpen, setBillDialogOpen]= React.useState(false)

    const bills= React.useMemo(() => {
        return localStorage.getItem("bills") === null ? [] : JSON.parse(localStorage.getItem("bills"))
    }, [

    ])

    const handleAddBill= (billName) => {
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
                    <ListItem className={classes.listItem}>
                        <ListItemText className={classes.listItemText} primary="No bills"/>
                    </ListItem>
                )}
                {bills.map((bill) => (
                    <ListItem key={bill.name} className={classes.listItem}>
                        <Link to={`/${bill.name}`}>
                            <ListItemText className={classes.listItemText} primary={bill.name} secondary={bill.date}/>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Styles.SFab
                className={classes.fab}
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
