import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    eventsList : {},
    events : {
        message : "",
        statusCode :"",
    }
}



//events type List API
export const eventslist = async (callback) => {
    try {
        const response = await fetch (
            `${API_URL}/api/events/event_type/list`,
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
}


const eventsReducer = createSlice ({
    name : "Events",
    initialState,
    reducers : {
        
    },
    extraReducers : {

    },

});


export default eventsReducer.reducer;