import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannelByIds, getTrendingVideosList } from "../../services/youtubeService";

// Action
export const getTrendingVideos = createAsyncThunk("videos/getTrendingVideos", async () => {
    const res = await getTrendingVideosList();    // Fetch trending videos
    const videos = res.data.items;  // Extract videos
    const channelIds = [...new Set(videos.map(video => video.snippet.channelId))];   // Extract videos channel id

    const channelRes = await getChannelByIds(channelIds);   // Fetch channel data by id's
    const channelIconMap = {};   // Empty object for channelIconUrl
    channelRes.data.items.forEach(channel => {  // Stores the channel icon url in channelIconMap using the channel id as a key.
        channelIconMap[channel.id] = channel.snippet.thumbnails.default.url;
    });

    const videosWithIcon = videos.map(video => ({   // Add channel icons as channelIcon using channelId with spreading the original videos
        ...video,
        channelIcon: channelIconMap[video.snippet.channelId],
    }))

    return videosWithIcon;
});

const videoSlice = createSlice({
    name: "videos",
    initialState: {
        videos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTrendingVideos.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTrendingVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
        });
        builder.addCase(getTrendingVideos.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export default videoSlice.reducer;