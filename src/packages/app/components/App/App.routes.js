import React from 'react'
import { Routes, Route } from 'react-router-dom'

import About from '../../../app-about/components/About/About'
import Bills from '../../../app-bills/components/Bills/Bills'
import Config from '../../../app-config/components/Config/Config'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/config" element={<Config />} />
            <Route path="*" element={<Bills />} />
        </Routes>
    )
}
