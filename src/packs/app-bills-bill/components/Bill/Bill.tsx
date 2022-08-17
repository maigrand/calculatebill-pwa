import React from 'react'
import * as Styles from './Bill.styles'
import { useParams } from 'react-router-dom'

import Guests from '../../../app-bills-bill-guest/components/Guest/Guest'
import Positions from '../../../app-bills-bill-position/components/Position/Position'

import { IBill, IPosition } from '../../../app-bills/components/Bills/Bills.interfaces'

export default function Bill() {
    const params = useParams()

    const [ bill, setBill ] = React.useState<IBill | null>(null)

    const bills: IBill[] = React.useMemo(() => {
        const dataRaw = localStorage.getItem('bills')
        if (!dataRaw) {
            return {}
        }
        const data = JSON.parse(dataRaw)
        return data.filter((bill: IBill) => bill.name === params.id)
    }, [
        params,
    ])

    React.useEffect(() => {
        setBill(bills[0])
    }, [])

    React.useEffect(() => {
        if (bill) {
            const newBills = [...bills].filter((nbill) => nbill.id !== bill.id)
            newBills.push(bill)
            localStorage.setItem('bills', JSON.stringify(newBills))
        }
    }, [bill])

    if (bill === null) {
        return null
    }

    const onChangeGuests = (guests: IBill['guests']) => {
        setBill({ ...bill, guests })
    }

    const onChangePositions = (positions: IPosition[]) => {
        setBill({ ...bill, items:positions})
    }

    return (
        <Styles.Root>
            <Guests guests={bill.guests} onChangeGuests={onChangeGuests}/>
            <Positions bill={bill} positions={bill.items} onChangePositions={onChangePositions}/>
        </Styles.Root>
    )
}
