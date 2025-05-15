import axios from "axios";
import { commentThread, getChannels, getVideoCateryList, getVideos, searchVideos } from "../_api_list";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getTrendingVideosList = async () => {
    const res = await axios.get(getVideos, {
        params: {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'US',
            maxResults: 20,
            key: API_KEY,
        },
    });
    return res;
};

export const getVideosByIds = async (id) => {
    const res = await axios.get(getVideos, {
        params: {
            part: 'statistics,snippet',
            id: id.join(','),
            key: API_KEY,
        },
    });
    return res;
};

export const getDetailedVideoById = async (id) => {
    const res = await axios.get(getVideos, {
        params: {
            part: 'snippet,contentDetails,Statistics',
            id: id,
            key: API_KEY,
        },
    });
    return res;
};

export const getChannelByIds = async (id) => {
    const res = await axios.get(getChannels, {
        params: {
            part: 'snippet',
            id: id.join(','),
            key: API_KEY,
        },
    });
    return res;
};

export const getChannelById = async (id) => {
    const res = await axios.get(getChannels, {
        params: {
            part: 'snippet',
            id: id,
            key: API_KEY,
        },
    });
    return res;
};

export const getVideoCategories = async () => {
    const res = await axios.get(getVideoCateryList, {
        params: {
            part: 'snippet',
            regionCode: 'US',
            key: API_KEY,
        },
    });
    return res;
};

export const getVideosBySearch = async (keyword) => {
    const res = await axios.get(searchVideos, {
        params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
        key: API_KEY,
        type: 'video',
        },
    });
    return res;
};

export const getCommentThread = async (id) => {
    const res = await axios.get(commentThread, {
        params: {
            part: 'snippet',
            videoId: id,
            maxResults: 20,
            key: API_KEY,
        },
    });
    return res;
};

export const getRelatedVideos = async (id) => {
    const res = await axios.get(searchVideos, {
        params: {
            part: 'snippet',
            relatedToVideoId: id,
            maxResults: 20,
            type: 'video',
            key: API_KEY,
        },
    });
    return res;
};

export const getShortsVideo = async () => {
    const res = await axios.get(searchVideos, {
        params: {
            part: 'snippet',
            type: 'video',
            videoDuration: 'short',
            q: 'cricket+shorts',
            maxResults: 3,
            key: API_KEY,
        },
    });
    return res;
};