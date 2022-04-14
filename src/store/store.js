import { configureStore } from '@reduxjs/toolkit';
import moviesToWatchReducerSlice from '../reducers/moviesToWatchReducerSlice';
import moviesReducerSlice from '../reducers/moviesReducerSlice';
import sortBarReducerSlice from '../reducers/sortBarReducerSlice';

export default configureStore({
    reducer: {
        moviesToWatchReducer: moviesToWatchReducerSlice,
        moviesReducer: moviesReducerSlice,
        sortBarReducer: sortBarReducerSlice
    }
});