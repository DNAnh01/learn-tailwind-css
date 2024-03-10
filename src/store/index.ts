import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { InitialState } from '~/Types';
import { getHomePageVideos } from './reducers/getHomePageVideos';
import { getSearchPageVideos } from './reducers/getSearchPageVideos';
import { getVideoDetails } from './reducers/getVideoDetails';
import { getRecommendedVideos } from './reducers/getRecommendedVideos';

// Initialize the initial state of the application with the InitialSate type
const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: '',
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: [],
};
// Create a "slice" of the Redux store named 'youtubeApp', with the initial state being initialState
// and no reducers or extraReducers defined
const YoutubeSlide = createSlice({
    name: 'youtubeApp',
    initialState,
    reducers: {
        clearVideos: (state) => {
            state.videos = [];
            state.nextPageToken = null;
        },
        changeSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken;
        });
        builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken;
        });
        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
            state.currentPlaying = action.payload;
        });
        builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
            state.recommendedVideos = action.payload.parsedData;
        });
    },
});

// Create the Redux store using configureStore
// In the configuration object, reducer is an object where each key corresponds to a slice of state
// In this case, there is only one slice 'youtubeApp', with the corresponding reducer being YoutubeSlide.reducer
export const store = configureStore({
    reducer: {
        youtubeApp: YoutubeSlide.reducer,
    },
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } = YoutubeSlide.actions;
// Define a new type RootState based on the return type of store.getState
// RootState will be the type of the entire application state
export type RootState = ReturnType<typeof store.getState>;
// Define a new type AppDispatch based on the type of store.dispatch
// AppDispatch will be the type of the dispatch function, used to dispatch actions
export type AppDispatch = typeof store.dispatch;
