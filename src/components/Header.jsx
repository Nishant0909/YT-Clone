import React, { useContext, useEffect, useRef, useState } from 'react'
import { LayoutContext } from '../context/LayoutContextProvider';

import ToggleIcon from '../assets/icons/menu.png';
import Logo from '../assets/icons/youtube.png';
import UserIcon from '../assets/icons/user.png';
import BellIcon from '../assets/icons/bell.png';
import MicIcon from '../assets/icons/mic.png';
import PlusIcon from '../assets/icons/plus.png';
import SearchIcon from '../assets/icons/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/categories/categorySlice';
import { clearSearch, getSearchVideo } from '../features/search/searchSlice';
import { getTrendingVideos } from '../features/videos/videoSlice';


const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {showSidebar, toggleSidebar, isHomePage} = useContext(LayoutContext);

  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.length > 1) {
      dispatch(getSearchVideo(searchQuery));
      setSearchQuery("");
      navigate('/search');
    }
  }

  return (
    <>
      <nav className='bg-white fixed top-0 left-0 w-full flex justify-between items-center h-16 z-10 pl-5 pr-5'>
        <div className="nav-brand flex items-center">
          <button className='hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center' onClick={toggleSidebar}>
            <img className='w-5' src={ToggleIcon} alt="Menu" />
          </button>
          <span className="nav-logo">
            <Link to='/'>
              <img className='w-9 ml-3 cursor-pointer' src={Logo} alt="YouTube" />
            </Link>
          </span>
          <Link to='/'>
            <span className="nav-brand-name cursor-pointer text-2xl">YouTube</span>
          </Link>
        </div>

        <div className="w-1/3 flex flex-col">
          <form className='flex'>
            {showSearch && 
              <button className={`border border-r-0 border-slate-300 rounded-l-full w-13 flex justify-center items-center`}>
                <img className='w-5 h-5' src={SearchIcon} alt="Search" />
              </button>
            }
            <input type="text" ref={inputRef} onChange={(e) => setSearchQuery(e.target.value)} onMouseDownCapture={() => setShowSearch(true)} className={`${showSearch ? 'rounded-l-0 border-l-0 pl-1' : 'rounded-l-full pl-4'} flex-1 border border-slate-300 h-10 pr-4`} placeholder='Search' />
            <button onClick={handleSearch} className='border border-slate-300 rounded-r-full border-l-0 cursor-pointer w-15 bg-gray-100 flex justify-center items-center'>
              <img className='w-5 h-5' src={SearchIcon} alt="Search" />
            </button>
            <button className='rounded-full cursor-pointer w-10 bg-gray-100 ml-4 flex justify-center items-center'>
              <img className='w-5 h-5' src={MicIcon} alt="VoiceSearch" />
            </button>
          </form>
        </div>

        <div className="nav-brand flex items-center">
          <button className='hover:bg-gray-300 bg-gray-200 cursor-pointer p-3 pt-1 pb-1 rounded-full flex justify-center items-center'>
            <img className='w-8 mr-1' src={PlusIcon} alt="Plus" /> Create
          </button>
          <button className='hover:bg-gray-100 cursor-pointer w-10 h-10 rounded-full flex justify-center items-center ml-2'>
            <img className='w-5' src={BellIcon} alt="Notification" />
          </button>
          <button className='cursor-pointer w-10 h-10 rounded-full flex justify-center items-center ml-4'>
            <img className='w-10' src={UserIcon} alt="Profile" />
          </button>
        </div>
      </nav>
    
      {
        isHomePage && 
        <section className={`bg-white sticky top-16 ${showSidebar ? 'ml-60' : 'ml-20'} pl-5 pr-5 pb-3 h-10 z-10 flex items-center`}>
          <div className='flex gap-x-2 overflow-auto whitespace-nowrap hide-scrollbar'>
            <button onClick={() => {dispatch(clearSearch()); dispatch(getTrendingVideos());}} className='rounded-lg bg-gray-200 hover:bg-gray-300 pt-1 pb-1 pl-3 pr-3 text-sm font-semibold cursor-pointer'>All</button>
            {
              categoriesData?.categories?.map((cat) => (
                <button key={cat.id} onClick={() => dispatch(getSearchVideo(cat.snippet.title))} className='rounded-lg bg-gray-200 hover:bg-gray-300 pt-1 pb-1 pl-3 pr-3 text-sm font-semibold cursor-pointer'>{cat.snippet.title}</button>
              ))
            }
          </div>
        </section>
      }
    </>
  )
}

export default Header
