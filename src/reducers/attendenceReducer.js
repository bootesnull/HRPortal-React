import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState =  {
    attendenceList : {},
    attendence:{
        message: "",
        statusCode: "",
    }
}


// attendence list API
export const attendencelist = async (callback) => {
    try {
        const response = await fetch (
            `${API_URL}/api/attendence/attendence-per-user?limit=5&filter=month`,
            {
                method: "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        let data = await response.json();
        callback(data.data);
    }catch (e) {
        console.log("error", e.response.data);
    }
}


const attendenceReducer = createSlice ({
    name : "Attendence",
    initialState,
    reducers : {

    },
    extraReducers: {

    }


});

export default attendenceReducer.reducer;