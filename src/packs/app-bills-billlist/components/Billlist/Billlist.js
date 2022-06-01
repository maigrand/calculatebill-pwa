import React from 'react'
import { Link } from 'react-router-dom'

import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from './Billlist.styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'

const useStyles= makeStyles(styles, {
    name: Billlist.name
})

export default function Billlist() {
    const classes= useStyles()

    const [billName, setBillName]= React.useState('')
    const [billDialogOpen, setBillDialogOpen]= React.useState(false)

    const bills= localStorage.getItem("bills") === null ? [] : JSON.parse(localStorage.getItem("bills"))

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
            <Fab
                className={classes.fab}
                onClick={() => setBillDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
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
