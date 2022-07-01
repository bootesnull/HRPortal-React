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



// Event create API
export const eventCreate = createAsyncThunk(
    'events/event-create',
    async ( { name}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/event_type/create`,
                {
                    method: "POST",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: name,
                    })
                }
            );
            let data = response.json();
            console.log(data);
            return data;
        }catch(e) {
            console.log("error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);  



// Event delete API
export const eventDelete = createAsyncThunk(
    'events/event-delete',
    async ( id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/delete?id=${id}`,
                {
                    method: "DELETE",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(id)
                }
            );
            let data = response.json();
            console.log(data);
            return data;
        }catch(e) {
            console.log("error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);  




const eventsReducer = createSlice ({
    name : "Events",
    initialState,
    reducers : {
        
    },
    extraReducers : {

    },

});


export default eventsReducer.reducer;