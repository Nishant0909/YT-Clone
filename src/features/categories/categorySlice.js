import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideoCategories } from "../../services/youtubeService";

// Action
export const getCategories = createAsyncThunk("videos/getCategories", async () => {
    const res = await getVideoCategories();
    return res.data.items;
});

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export default categorySlice.reducer;