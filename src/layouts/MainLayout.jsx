import React, { useContext } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { LayoutContext } from '../context/LayoutContextProvider';

const MainLayout = () => {
  const {showSidebar, isHomePage, isSearchPage} = useContext(LayoutContext);

  return (
    <div className='main-layout'>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className={`page-content ${isHomePage || isSearchPage ? showSidebar ? 'ml-60' : 'ml-20' : showSidebar ? 'ml-60' : 'ml-0'} mt-16 transition-all duration-300 overflow-hidden p-5`}>
            <Outlet /> {/* This renders the current route's page */}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
