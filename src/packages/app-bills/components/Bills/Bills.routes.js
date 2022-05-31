import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Billlist from '../../../app-bills-billlist/components/Billlist/Billlist'
import Bill from '../../../app-bills-bill/components/Bill/Bill'

export default function BillsRoutes() {
    return (
        <Routes>
            <Route path="/:id" element={<Bill />} />
            <Route path="*" element={<Billlist />} />
        </Routes>
    )
}
