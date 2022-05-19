import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../API/ApiService';
import { endPoints } from '../config/config';
import { setPages } from './sortBarReducerSlice';

export const fetchFilms = createAsyncThunk(
    'movies_store/initialLoad',
    async function ({ sortBy, page }, { rejectWithValue, dispatch }) {
        try {
            const queryStringParams = {
                sort_by: sortBy,
                page: page,
                region: 'ru'
            }

            const response = await ApiService.get(endPoints.getFilms, {
                params: queryStringParams
            });
            
            dispatch(setPages(response.total_pages));
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const moviesReducerSlice = createSlice({
    name: 'movies_store',
    initialState: {
        movies: [],
        status: null,
        error: null
    },
    reducers: {
        removeFilm: (state, data) => {
            state.movies = state.movies.filter(item => item.id !== data.payload.id);
        },
    },
    extraReducers: {
        [fetchFilms.pending]: state => {
            if (state.status === false) return;
            state.status = true;
            state.error = null;
        },
        [fetchFilms.fulfilled]: (state, data) => {
            state.status = false;
            state.movies = data.payload.results;
            state.pages = data.payload.pages;
        },
        [fetchFilms.rejected]: (state, data) => {
            state.status = false;
            state.error = data.payload;
        }
    }
});

export const { removeFilm } = moviesReducerSlice.actions;
export const getMovies = state => state.moviesReducer.movies;
export const loadingStatus = state => state.moviesReducer.status;
export const errorStatus = state => state.moviesReducer.error;

export default moviesReducerSlice.reducer;