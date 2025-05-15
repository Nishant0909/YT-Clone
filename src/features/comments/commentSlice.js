import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentThread } from "../../services/youtubeService";

// Action
export const fetchCommentThreads = createAsyncThunk("video/fetchCommentThread", async (id) => {
    const res = await getCommentThread(id);
    return res.data.items;
});

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentThreads.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCommentThreads.fulfilled, (state,  action) => {
            state.loading = false;
            state.comments = action.payload;
        });
        builder.addCase(fetchCommentThreads.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export default commentSlice.reducer;