import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { IPosition } from '../../../app-bills/components/Bills/Bills.interfaces'

interface PositionDialogProps {
    positions?: IPosition[]
    open: boolean
    onClose: () => void
    handleAddPosition: (name: string, quantity: number, price: number, id?: string) => void
    positionId?: string
}

export default function PositionDialog(props: PositionDialogProps) {
    const { positions, open, onClose, handleAddPosition, positionId } = props

    //@FIXME: убрать initialState
    const [ name, setName ] = React.useState<string>('')
    const [ quantity, setQuantity ] = React.useState<number>(0)
    const [ price, setPrice ] = React.useState<number>(0)

    React.useEffect(() => {
        if (positions && positionId) {
            const pos = positions.filter((position) => position.id === positionId)[0]
            setName(pos.name)
            setQuantity(pos.quantity)
            setPrice(pos.price)
        }
    }, [
        positions,
        positionId
    ])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <TextField
                    required
                    label="Position name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    label="Position quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <TextField
                    required
                    label="Position cost"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleAddPosition(name, quantity, price, positionId)
                        onClose()
                    }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
