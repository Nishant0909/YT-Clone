import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannelByIds, getVideosByIds, getVideosBySearch } from "../../services/youtubeService";

// Action
export const getSearchVideo = createAsyncThunk("video/getSearchVideo", async (keyword) => {
    const res = await getVideosBySearch(keyword);
    const searchRes = res.data.items;

    const videoIds = searchRes.filter(item => item.id.kind === "youtube#video").map(item => item.id.videoId);
    const detailRes = await getVideosByIds(videoIds);
    const detailVideoMap = {};
    detailRes.data.items.forEach(video => {
        detailVideoMap[video.id] = video.statistics;
    });

    const channelIds = [...new Set(searchRes.map(item => item.snippet.channelId))];
    const channelRes = await getChannelByIds(channelIds);
    const channelIconMap = {};
    channelRes.data.items.forEach(channel => {
        channelIconMap[channel.id] = channel.snippet.thumbnails.default.url;
    })

    const finalVideoList = searchRes.filter(item => item.id.kind === "youtube#video").map(video => ({
        ...video,
        statistics: detailVideoMap[video.id.videoId],
        channelIcon: channelIconMap[video.snippet.channelId],
    }));

    return finalVideoList;
});

const searchSlice = createSlice({
    name: "search",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSearch: (state) => {
            state.data = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSearchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getSearchVideo.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;