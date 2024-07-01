import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
const App = () => {
  return (
    <div>
        <Navbar />
        <Admin />
    </div>
  )
}

export default App