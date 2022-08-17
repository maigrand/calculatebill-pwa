import React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {IPositionGuest} from '../../../app-bills/components/Bills/Bills.interfaces'

interface PositionGuestProps {
    guests?: IPositionGuest[]
}

export default function PositionGuest(props: PositionGuestProps) {
    const { guests } = props

    return (
        <div>
            {guests == null ? (
                <div>empty</div>
            ) : (
                <div>
                    {guests.map((guest) => (
                        <div>
                            <Typography>{Object.keys(guest)} {guest.name.percentage}</Typography>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
