import { createSlice } from '@reduxjs/toolkit';

export const sortBarReducerSlice = createSlice({
    name: "sort_store",
    initialState: {
        sortBy: localStorage.getItem("sort") ? localStorage.getItem("sort") : 'popularity.desc',
        page: localStorage.getItem("page") ? +localStorage.getItem("page") : 1,
        pages: 0
    },
    reducers: {
        nextPage: (state) => {
            if (state.page + 1 > state.pages) return;
            state.page += 1;
        },
        prevPage: state => {
            if (state.page - 1 < 1) return;
            state.page -= 1;
        },
        firstPage: state => {
            state.page = 1;
        },
        setSortBy: (state, data) => {
            state.sortBy = data.payload;
        },
        setPages: (state, data) => {
            state.pages = data.payload;
        }
    }
});


export const { nextPage, prevPage, firstPage, setSortBy, setPages } = sortBarReducerSlice.actions;

export const getSortBy = state => state.sortBarReducer.sortBy;
export const getPage = state => state.sortBarReducer.page;
export const getPages = state => state.sortBarReducer.pages;

export default sortBarReducerSlice.reducer;