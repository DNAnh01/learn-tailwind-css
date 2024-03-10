import { configureStore, createSlice } from '@reduxjs/toolkit';
import { InitialSate } from '~/Types';
import { getHomePageVideos } from './reducers/getHomePageVideos';

// Initialize the initial state of the application with the InitialSate type
const initialState: InitialSate = {
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
    },
    extraReducers: (builder) => {
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken;
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

export const { clearVideos } = YoutubeSlide.actions;
// Define a new type RootState based on the return type of store.getState
// RootState will be the type of the entire application state
export type RootState = ReturnType<typeof store.getState>;
// Define a new type AppDispatch based on the type of store.dispatch
// AppDispatch will be the type of the dispatch function, used to dispatch actions
export type AppDispatch = typeof store.dispatch;
