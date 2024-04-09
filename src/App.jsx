import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Delete from './pages/Delete'
import Show from './pages/Show'
import Edit from './pages/Edit'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/delete/:id" element={<Delete/>}/>
        <Route path="/show/:id" element={<Show/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
