import React, { useEffect } from 'react'
import Thumbnail from '../assets/images/thumbnail/thumbnail.jpg';
import LikeIcon from '../assets/icons/like.png';
import DisLikeIcon from '../assets/icons/dislike.png';
import ShareIcon from '../assets/icons/share.png';
import DownloadIcon from '../assets/icons/download.png';
import ClipIcon from '../assets/icons/clip.png';
import SaveIcon from '../assets/icons/save.png';
import MoreIcon from '../assets/icons/more.png';
import SortingIcon from '../assets/icons/sorting.png';
import UserIcon from '../assets/icons/user.png';

import ShortsIcon from '../assets/icons/shorts-red.png';
import MoreVerticalIcon from '../assets/icons/more-vertical.png';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber, formatPublishedTime } from '../utils/formatNumber';
import { fetchCommentThreads } from '../features/comments/commentSlice';
import { getTrendingVideos } from '../features/videos/videoSlice';
import { fetchShortVideos } from '../features/videos/shortSlice';


const Watch = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.watch.data[0]);
  const comments = useSelector((state) => state.comment.comments);
  const relatedVideo = useSelector((state) => state.videos);
  const categories = useSelector((state) => state.categories.categories);
  const shorts = useSelector((state) => state.short.data);
  
  useEffect(() => {
    if (data?.id) {
      dispatch(fetchCommentThreads(data.id))
    }
  }, [dispatch, data?.id]);

  useEffect(() => {
    if (!relatedVideo.length) {
      dispatch(getTrendingVideos());
    }
    if (!shorts.length) {
      dispatch(fetchShortVideos());
    }  
  }, [dispatch]);

  return (
    <section className='flex pl-[3%] pr-[3%]'>
      <div className='w-3/4'>
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            className="rounded-xl"
            src={`https://www.youtube.com/embed/${data?.id}?autoplay=1&rel=0`}
            title={data?.snippet?.title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="video-content pt-2">
          <div className="title">
            <h1 className='text-xl font-semibold pb-2'>{data?.snippet?.title}</h1>
          </div>
          <div className="channel-info flex justify-between items-center">
            <div className='flex items-center gap-x-3'>
              <img className='w-10 h-10 rounded-full' src={data?.channelIcon} alt="channel-logo" />
              <div>
                <p className="channel-name font-semibold">{data?.snippet?.channelTitle}</p>
                <p className="channel-subscriber text-xs text-slate-700">50.9K subscribers</p>
              </div>
              <button className='bg-black text-white text-sm rounded-3xl p-2 pl-4 pr-4 ml-4'>Subscribe</button>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className='flex'>
                <button className="like flex bg-gray-200 p-2 rounded-l-3xl pl-3 pr-2">
                  <img className='w-5' src={LikeIcon} alt="Likes" />
                  <span className='text-sm font-semibold ml-2'>{data?.statistics?.likeCount && formatNumber(data?.statistics?.likeCount)}</span>
                </button>
                <button className="dislike bg-gray-200 p-2 rounded-r-3xl pl-2 pr-3 border-l border-slate-300">
                  <img className='w-5' src={DisLikeIcon} alt="DisLike" />
                </button>
              </div>
              <button className="share flex bg-gray-200 p-2 rounded-3xl pl-3 pr-3">
                <img className='w-5' src={ShareIcon} alt="Share" />
                <span className='text-sm font-semibold ml-2'>Share</span>
              </button>
              <button className="download flex bg-gray-200 p-2 rounded-3xl pl-3 pr-3">
                <img className='w-5' src={DownloadIcon} alt="Download" />
                <span className='text-sm font-semibold ml-2'>Download</span>
              </button>
              <button className="clip flex bg-gray-200 p-2 rounded-3xl pl-3 pr-3">
                <img className='w-5' src={ClipIcon} alt="Clip" />
                <span className='text-sm font-semibold ml-2'>Clip</span>
              </button>
              <button className="save flex bg-gray-200 p-2 rounded-3xl pl-3 pr-3">
                <img className='w-5' src={SaveIcon} alt="save" />
                <span className='text-sm font-semibold ml-2'>Save</span>
              </button>
              <button className="more bg-gray-200 p-2 rounded-full">
                <img className='w-5' src={MoreIcon} alt="more" />
              </button>
            </div>
          </div>
        </div>
        <div className="description w-full bg-gray-200 my-3 mb-5 rounded-xl p-3">
          <div className="views flex">
            <p className='text-sm font-semibold'>{data?.statistics?.viewCount && formatNumber(data?.statistics?.viewCount)}</p>
            <p className='ml-2 text-sm font-semibold'>{data?.snippet?.publishedAt && formatPublishedTime(data?.snippet?.publishedAt)}</p>
          </div>
          <p className="desc text-sm">{data?.snippet?.description}</p>
          <button className='text-sm cursor-pointer'>...more</button>
        </div>

        <div className="comment-area">
          <div className="count flex items-center gap-x-8">
            <h1 className='text-xl font-bold'>{data?.statistics?.commentCount && formatNumber(data?.statistics?.commentCount)}</h1>
            <div className="filter flex cursor-pointer">
              <img className='w-5' src={SortingIcon} alt="filter" />
              <span className='text-sm ml-2'>Sort by</span>
            </div>
          </div>
          <div className="add-comment flex py-5">
            <img className='w-12 h-12' src={UserIcon} alt="User-icon" />
            <input className='border-b border-slate-300 p-0 m-0 w-full ml-2' type="text" placeholder='Add a comment...' />
          </div>

          {
            comments.map((com) => (
              <div className="comments flex gap-x-4 py-5" key={com?.id}>
                <img className='w-10 h-10 rounded-full' src={com?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="user" />
                <div>
                  <p className='text-sm font-semibold'>{com?.snippet?.topLevelComment?.snippet?.authorDisplayName} <span className='text-xs text-slate-700'>{com?.snippet?.topLevelComment?.snippet?.publishedAt}</span></p>
                  <p className='text-sm'>{com?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className='w-1/4 px-5 py-2'>
        <div className='categories flex gap-x-2 overflow-auto whitespace-nowrap hide-scrollbar'>
          {
            categories.map((cat) => (
              <button key={cat?.id} className='rounded-lg bg-gray-200 hover:bg-gray-300 pt-1 pb-1 pl-3 pr-3 text-sm font-semibold cursor-pointer'>{cat?.snippet?.title}</button>
            ))
          }
        </div>

        <div className="shorts border-t border-b border-slate-300 py-5 mt-7">
          <div className="heading flex items-center">
            <img className='w-6' src={ShortsIcon} alt="Shorts" />
            <span className='text-xl ml-2 font-bold'>Shorts</span>
          </div>
          <div className="content pt-5 flex items-center gap-x-1">
            {
              shorts.map((short) => (
                <div className="shorts-card cursor-pointer" key={short?.id?.videoId}>
                  <div className="shorts-thumbnail">
                    <img className='rounded-xl h-50' src={short?.snippet?.thumbnails?.high?.url} alt="thumbnail" />
                  </div>
                  <div className="shorts-details flex justify-between py-2">
                    <div className='w-3/4'>
                      <h1 className="title font-semibold">
                        {short?.snippet?.title?.length > 10 ? short?.snippet?.title?.slice(0,14) + '...' : short?.snippet?.title }
                      </h1>
                      <p className="views text-sm text-slate-700">2M views</p>
                    </div>
                    <button className="more hover:bg-gray-200 p-1 rounded-full h-10 w-10 cursor-pointer">
                      <img className='w-6 pl-1' src={MoreVerticalIcon} alt="more" />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {
          relatedVideo?.videos.map((data) => (
            <div className="relavent-video my-2 flex" key={data?.id}>
              <div className="video w-1/2 h-25">
                <img className='rounded-lg w-80 h-25' src={data?.snippet?.thumbnails?.high?.url} alt="thumbnail" />
              </div>
              <div className="content w-1/2 ml-2">
                <h1 className="title text-sm font-semibold">
                  {data?.snippet?.title.length > 40 ? data?.snippet?.title.slice(0,40) + '...' : data?.snippet?.title}
                </h1>
                <p className="channel-name text-xs text-slate-700 mt-2">{data?.snippet?.channelTitle}</p>
                <p className="views text-xs text-slate-700 mt-1">{data?.statistics?.viewCount && formatNumber(data?.statistics?.viewCount)} &#x2022; {data?.snippet?.publishedAt && formatPublishedTime(data?.snippet?.publishedAt)}</p>
              </div>
              <div className="more flex justify-end">
                <button className="more hover:bg-gray-200 rounded-full h-6 w-6 cursor-pointer">
                  <img className='w-4 ml-1' src={MoreVerticalIcon} alt="more" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Watch
