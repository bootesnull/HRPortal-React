import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [],
};



const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsersList(state = initialState, action) {
            console.log(action.payload);
            return {
                ...state,
                userList: [...action.payload],
            };
        },
    },
});


export const { fetchUsersList } = userReducer.actions;
export default userReducer.reducer;
