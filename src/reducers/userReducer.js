import { createSlice } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    userList: [],
    user: {
        message: "",
        statusCode: '',
    },
};


// User list API
export const usersList = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/user/list`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }
        );
        let data = await response.json();
        //console.log(data.data);
        callback(data.data)
    } catch (e) {
        console.log("Error", e.response.data);
    }
}



const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [usersList.fulfilled]: (state, action) => {
            return { ...action.payload }
        },
        [usersList.pending]: (state, action) => {
            return { ...action.payload }
        },
        [usersList.rejected]: (state, action) => {
            return { ...action.payload }
        },
        
    }
});


//export const {   } = userReducer.actions;
export default userReducer.reducer;
