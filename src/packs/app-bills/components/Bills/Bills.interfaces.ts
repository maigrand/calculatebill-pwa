export interface IBill {
    id: string
    name: string
    date: Date
    guests?: Array<string>
    items?: Array<IPosition>
}

export interface IPosition {
    id: string
    name: string
    quantity: number
    price: number
    guests?: Array<IPositionGuest>
}

export interface IPositionGuest {
    name: {
        percentage: number
        manual: boolean
    }
}
