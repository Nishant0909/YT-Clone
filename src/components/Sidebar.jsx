import React, { useContext } from 'react'
import { LayoutContext } from '../context/LayoutContextProvider'

import HomeIcon from '../assets/icons/home.png';
import ShortsIcon from '../assets/icons/shorts.png';
import SubscriptionIcon from '../assets/icons/subscription.png';
import VideoIcon from '../assets/icons/youtube-video.png';

const menus = [
  {
    label: 'Home',
    icon: HomeIcon,
  },
  {
    label: 'Shorts',
    icon: ShortsIcon,
  },
  {
    label: 'Subscriptions',
    icon: SubscriptionIcon,
  },
  {
    label: 'Youtube Music',
    icon: VideoIcon,
  },
]

const Sidebar = () => {
  const {showSidebar, isHomePage, isSearchPage} = useContext(LayoutContext);

  return (
    <aside className={`flex flex-col bg-white h-full fixed top-0 left-0 transition-all duration-300 overflow-auto ${isHomePage || isSearchPage ? showSidebar ? 'w-60' : 'w-21' : showSidebar ? 'w-60' : 'w-0 hidden'} mt-16 px-3 py-3`}>
      {
        menus.map((menu, index) => (
          <button className={`flex ${showSidebar ? 'flex-row items-start' : 'flex-col items-center'} gap-x-5 p-2 rounded-lg hover:bg-gray-100 cursor-pointer`} key={index}>
            <img className='w-6' src={menu.icon} alt={menu.label} />
            <span className={`${!showSidebar && 'text-xs'}`}>{menu.label}</span>
          </button>
        ))
      }
    </aside>
  )
}

export default Sidebar
