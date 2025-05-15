import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShortsVideo } from "../../services/youtubeService";

// Action
export const fetchShortVideos = createAsyncThunk("videos/fetchShortVideos", async () => {
    const res = await getShortsVideo();
    return res.data.items;
});

const shortSlice = createSlice({
    name: "short",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShortVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchShortVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchShortVideos.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export default shortSlice.reducer;