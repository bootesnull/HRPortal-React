import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    roleList: [],
};

const rolesReducer = createSlice({
    name: "roles",
    initialState,
    reducers: {
        fetchRoleList(state = initialState, action) {
            return {
                ...state,
                roleList: [...action.payload],
            };
        },
    },
});


export const { fetchRoleList } = rolesReducer.actions;
export default rolesReducer.reducer;
