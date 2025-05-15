import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Watch from '../pages/Watch';
import Search from '../pages/Search';
import Channel from '../pages/Channel';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='watch' element={<Watch />} />
            <Route path='search' element={<Search />} />
            <Route path='channel' element={<Channel />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes
