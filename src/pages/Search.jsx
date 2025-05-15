import React from 'react'
import Thumbnail from '../assets/images/thumbnail/thumbnail.jpg';
import CheckIcon from '../assets/icons/check.png';
import MoreVerticalIcon from '../assets/icons/more-vertical.png';
import { useSelector } from 'react-redux';
import { formatNumber, formatPublishedTime } from '../utils/formatNumber';

const Search = () => {
  const searchData = useSelector((state) => state.search);

  return (
    <section>
      {
        searchData?.data.map((data) => (
          <div key={data?.id?.videoId} className='flex max-w-7xl m-auto py-2'>
            <div className="thumbnail w-4/10">
              <img className='w-full h-70 rounded-xl' src={data?.snippet?.thumbnails?.high?.url} alt="thumbnail" />
            </div>
            <div className="details w-5/10 pl-5 pr-5">
              <h1 className="title text-xl fon-semibold">{data?.snippet?.title}</h1>
              <p className='text-xs text-slate-500'>{data?.statistics?.viewCount && formatNumber(data?.statistics?.viewCount)} &#x2022; {data?.snippet?.publishedAt && formatPublishedTime(data?.snippet?.publishedAt)}</p>
              <p className='flex items-center py-3 gap-x-2'><img className='w-7 h-7 rounded-full' src={data?.channelIcon} alt="channel-icon" /> <span className='text-xs text-slate-500'>{data?.snippet?.channelTitle}</span> <span><img className='w-4 h-4' src={CheckIcon} alt="check" /></span></p>
              <p className="detail text-xs text-slate-500">{data?.snippet?.description}</p>
            </div>
            <div className="more w-1/10">
              <img className='w-9 h-9 p-2 cursor-pointer hover:bg-gray-200 rounded-full' src={MoreVerticalIcon} alt="more" />
            </div>
          </div>
        ))
      }
    </section>
  )
}

export default Search
