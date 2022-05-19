import { configureStore } from '@reduxjs/toolkit';
import moviesToWatchReducerSlice from '../reducers/moviesToWatchReducerSlice';
import moviesReducerSlice from '../reducers/moviesReducerSlice';
import sortBarReducerSlice from '../reducers/sortBarReducerSlice';
import userReducerSlice from '../reducers/userReducer';

export default configureStore({
    reducer: {
        moviesToWatchReducer: moviesToWatchReducerSlice,
        moviesReducer: moviesReducerSlice,
        sortBarReducer: sortBarReducerSlice,
        userReducer: userReducerSlice
    }
});