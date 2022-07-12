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
export const eventTypelist = async (callback) => {
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
       // console.log(data);
    }catch (e) {
        console.log("error", e.response.data);
    }
}



// Event Type create API
export const eventTypeCreate = createAsyncThunk(
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

//Event Type view by id 
export const eventTypeView = createAsyncThunk(
    'events/event-type-view',
    async ( id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/events/event_type/view?id=${id}`,
                {
                    method: "GET",
                    headers : {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
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


// Event Type Edit API
export const eventTypeEdit = createAsyncThunk(
    'events/event-type-edit',
    async ( {id, name}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/event_type/edit`,
                {
                    method: "PUT",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id:id,
                        name: name,
                    })
                }
            );
            let data = response.json();
           // console.log(data);
            return data;
        }catch(e) {
            console.log("error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);  


// Event Type Edit API
export const eventCreate = createAsyncThunk(
    'events/event-type-edit',
    async ( {id, name}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/event_type/edit`,
                {
                    method: "PUT",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id:id,
                        name: name,
                    })
                }
            );
            let data = response.json();
           // console.log(data);
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
    async(id, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/delete?id=${id}`,
                {
                    method: "PUT",
                    headers : {
                        Accepts: "application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    },

                }
            )
            let data = await response.json();
            console.log(data)
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);




const eventsReducer = createSlice ({
    name : "Events",
    initialState,
    reducers : {
        
    },
    extraReducers : {
        [eventTypelist.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventTypelist.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventTypelist.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventTypeCreate.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeCreate.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeCreate.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventTypeView.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeView.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeView.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventTypeEdit.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeEdit.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventTypeEdit.rejected] : (state, action) => {
            return {...action.payload}
        },

        
    },

});


export default eventsReducer.reducer;