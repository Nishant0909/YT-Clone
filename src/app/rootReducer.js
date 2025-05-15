import { combineReducers } from "@reduxjs/toolkit";
import videoReducer from '../features/videos/videoSlice';
import categoryReducer from '../features/categories/categorySlice';
import searchReducer from '../features/search/searchSlice';
import watchReducer from '../features/watch/watchSlice';
import commentReducer from '../features/comments/commentSlice';
import relatedVideoReducer from '../features/videos/relatedVideoSlice';
import shortReducer from '../features/videos/shortSlice';

const rootReducer = combineReducers({
    videos: videoReducer,
    categories: categoryReducer,
    search: searchReducer,
    watch: watchReducer,
    comment: commentReducer,
    relatedVideo: relatedVideoReducer,
    short: shortReducer,
});

export default rootReducer;