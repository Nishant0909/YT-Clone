import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedVideos } from "../../services/youtubeService";

// Action
export const fetchRelatedVideos = createAsyncThunk("video/fetchRelatedVideos", async (id) => {
    const res = getRelatedVideos(id);
    return res.data;
});

const relatedVideoSlice = createSlice({
    name: "relatedVideo",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export default relatedVideoSlice.reducer;