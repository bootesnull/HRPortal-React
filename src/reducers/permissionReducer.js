import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    permissionList: [],
};



const permissionReducer = createSlice({
    name: "permissions",
    initialState,
    reducers: {
        fetchPermissionList(state = initialState, action) {
           // console.log(action.payload);
            return {
                ...state,
                permissionList: [...action.payload],
            };
        },
    },
});


export const { fetchPermissionList } = permissionReducer.actions;
export default permissionReducer.reducer;
