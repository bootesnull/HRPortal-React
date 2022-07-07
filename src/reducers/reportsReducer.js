import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    reportsList : {},
    reports : {
        message : "",
        statusCode : "",
    }
}



// reports list API

export const reportslist = async (callback) => {
    try{
        const response = await fetch(
            `${API_URL}/api/reports/task/list`,
            {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        let data = await response.json();
        callback(data.data);
        console.log(data);
    }catch (e) {
        console.log("error", e.response.data);
    }
};


const reportsReducer = createSlice ({
    name: "Report",
    initialState,
    reducers : {

    },
    extraReducers :{

    },
});

export default reportsReducer.reducer