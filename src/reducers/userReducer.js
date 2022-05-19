import { createSlice } from "@reduxjs/toolkit";

export const userReducerSlice = createSlice({
    name: "user_store",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, data) => {
            state.user = data.payload;
        },
    }
});
export const { setUser } = userReducerSlice.actions;

export const getUser = state => state.userReducer.user;

export default userReducerSlice.reducer;