import React, { useContext, useEffect } from 'react'
import CheckIcon from '../assets/icons/check.png';
import { LayoutContext } from '../context/LayoutContextProvider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingVideos } from '../features/videos/videoSlice';
import { formatISODuration, formatNumber, formatPublishedTime } from '../utils/formatNumber';
import { fetchDetailedVideoById } from '../features/watch/watchSlice';


const Home = () => {
  const {showSidebar} = useContext(LayoutContext);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.videos);
  const searchData = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getTrendingVideos());
  }, [dispatch]);

  const videosToDisplay = searchData.data.length > 0 ? searchData.data : data.videos;
  if (data.loading || searchData.loading) return <h1>Loading...</h1>
  if (data.error || searchData.error) return <h1>Error: {data.error}</h1>

  return (
      <section>
        <div className={`grid ${showSidebar ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-5`}>
          {
            videosToDisplay?.map((item) => (
              <Link onClick={() => dispatch(fetchDetailedVideoById(searchData.data.length > 0 ? item.id.videoId : item?.id))} key={searchData.data.length > 0 ? item.id.videoId : item?.id} to='watch'>
              <div className='cursor-pointer'>
                <div className="relative">
                  <img className={`rounded-xl ${showSidebar ? 'h-70' : 'h-60'} w-full object-cover`} src={`${item?.snippet?.thumbnails?.high?.url}`} alt="thumbnail" />
                  <span className='absolute bottom-3 right-3 z-5 text-xs font-bold bg-black/50 p-1 rounded-sm text-white'>{item?.contentDetails?.duration && formatISODuration(item?.contentDetails?.duration)}</span>
                </div>
                <div className='mt-2 flex gap-x-3'>
                  <img className='rounded-full w-10 h-10' src={item?.channelIcon} alt="channel-icons" />
                  <div>
                    <h1 className='text-sm font-semibold'>{item?.snippet?.title}</h1>
                    <div className='flex items-center gap-x-1 my-1'>
                      <p className='text-xs text-slate-500 font-semibold'>{item?.snippet?.channelTitle}</p>
                      <span><img className='w-4' src={CheckIcon} alt="Check" /></span>
                    </div>
                    <div className='flex items-center gap-x-1 items-center'>
                      <p className='text-xs text-slate-500 font-semibold'>{formatNumber(item?.statistics?.viewCount)} views</p>
                      <p className='text-xs text-slate-500 font-semibold'>&#x2022; {formatPublishedTime(item?.snippet?.publishedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
          </Link>
            ))
          }
        </div>
      </section>
  )
}

export default Home
