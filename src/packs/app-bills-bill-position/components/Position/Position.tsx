import React from 'react'
import * as Styles from './Position.styles'
import { v4 as uuidv4 } from 'uuid'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PositionGuest from '../../../app-bills-bill-position-guest/components/PositionGuest/PositionGuest'
import PositionDialog from '../PositionDialog/PositionDialog'
import PositionGuestDialog from '../../../app-bills-bill-position-guest/components/PositionGuestDialog/PositionGuestDialog'

import {IBill, IPosition, IPositionGuest} from '../../../app-bills/components/Bills/Bills.interfaces'

interface PositionProps {
    bill: IBill
    positions?: IPosition[]
    onChangePositions: (positions: IPosition[]) => void
}

export default function Position(props: PositionProps) {
    const { bill, positions, onChangePositions } = props

    const [ positionId, setPositionId ] = React.useState<string | undefined>()
    const [ positionDialogOpen, setPositionDialogOpen ] = React.useState(false)
    const [ guestDialogOpen, setGuestDialogOpen ] = React.useState(false)

    const handleAddPosition = (name: string, quantity: number, price: number, id?: string) => {
        const newPosition: IPosition = {
            id: uuidv4(),
            name,
            quantity,
            price,
        }
        let nPositions: IPosition[]
        if (positions) {
            nPositions = [...positions]
        } else {
            nPositions = []
        }
        if (id) {
            nPositions = [...nPositions].map((position) => position.id === id ? newPosition : position)
            onChangePositions(nPositions)
        } else {
            nPositions.push(newPosition)
            onChangePositions(nPositions)
        }
    }

    const handleDelPosition = (id: string) => {
        if (!positions) {
            return
        }
        const nPositions = positions.filter((position) => position.id !== id)
        onChangePositions(nPositions)
    }

    const handleOpenPositionDialog = React.useCallback((event: React.MouseEvent<HTMLButtonElement>, id?:string) => {
        event.stopPropagation()
        if (id) {
            setPositionId(id)
        }
        setPositionDialogOpen(true)
    }, [])

    const handleClosePositionDialog = React.useCallback(() => {
        setPositionDialogOpen(false)
        setPositionId(undefined)
    }, [])

    // const handleAddGuest = (positionId: string, name: string) => {
    //     if (!positions) {
    //         return
    //     }
    //     const nPositions = positions.filter((position) => position.id === positionId)
    //     if (nPositions[0]) {
    //         const position = nPositions[0]
    //         if (position.guests) {
    //             const posGuest: IPositionGuest = {
    //                 percentage: 50,
    //                 manual: false
    //             }
    //             position.guests.push()
    //         }
    //     }
    // }

    const handleOpenGuestDialog = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setGuestDialogOpen(true)
    }, [])

    const handleCloseGuestDialog = React.useCallback(() => {
        setGuestDialogOpen(false)
    }, [])

    return (
        <Styles.SBox>
            <div>
                <IconButton onClick={handleOpenPositionDialog}>
                    AddPosition
                </IconButton>
                {positions?.map((position) => (
                    <Accordion
                        key={position.id}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Styles.STypography>{position.name}</Styles.STypography>
                            <Styles.STypography>quantity:{position.quantity}</Styles.STypography>
                            <Styles.STypography>price:{position.price}</Styles.STypography>
                            <IconButton onClick={handleOpenGuestDialog}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton
                                onClick={(event) => handleOpenPositionDialog(event, position.id)}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleDelPosition(position.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PositionGuest guests={position.guests}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <PositionDialog
                    positions={positions}
                    open={positionDialogOpen}
                    onClose={handleClosePositionDialog}
                    handleAddPosition={handleAddPosition}
                    positionId={positionId}
                />
                <PositionGuestDialog
                    guests={bill.guests}
                    open={guestDialogOpen}
                    onClose={handleCloseGuestDialog}
                    //handleAddGuest={}
                />
            </div>
        </Styles.SBox>
    )
}