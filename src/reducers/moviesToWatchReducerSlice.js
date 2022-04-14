import { createSlice } from '@reduxjs/toolkit';

export const moviesToWatchReducerSlice = createSlice({
    name: 'chosen_films_store',
    initialState: {
        moviesToWatch: []
    },
    reducers: {
        addFilm: (state, data) => {
            state.moviesToWatch = [...state.moviesToWatch, data.payload];
        },
        deleteFilm: (state, data) => {
            state.moviesToWatch = state.moviesToWatch.filter(item => item.id !== data.payload.id);
        }
    }
});

export const { addFilm, deleteFilm } = moviesToWatchReducerSlice.actions;
export const getChosenFilms = state => state.moviesToWatchReducer.moviesToWatch;

export default moviesToWatchReducerSlice.reducer;