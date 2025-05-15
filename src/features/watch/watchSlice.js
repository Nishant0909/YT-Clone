import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannelById, getDetailedVideoById } from "../../services/youtubeService";

// Action
export const fetchDetailedVideoById = createAsyncThunk("videos/fetchDetailedVideoById", async (id) => {
    const res = await getDetailedVideoById(id);
    const videoRes = res.data.items;

    const channelRes = await getChannelById(videoRes[0].snippet.channelId);
    const channelIcon = channelRes.data.items[0].snippet.thumbnails.default.url;

    const detailRes = videoRes.map((video) => ({
        ...video,
        channelIcon,
    }))

    return detailRes;
});

const watchSlice = createSlice({
    name: "watch",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailedVideoById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDetailedVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchDetailedVideoById.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export default watchSlice.reducer;