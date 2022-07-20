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
    'events/event-type-create',
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



// Event List API
export const eventsList = async(callback) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/list`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let data = await response.json();
            callback(data.data)
            //console.log(data)
        }catch(e){
            console.log("error", e.response.data);
        }
    }



    
// Event Create API
export const eventsCreate = createAsyncThunk(
    'events/event-create',
    async(formData, thunkAPI) => {
        console.log( "ghi", formData)

        try{
            const response = await fetch(
                `${API_URL}/api/events/events/create`,
                {
                    method: "POST",
                    headers: {
                        //"Accept": "application/json",
                        //"Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        //"Accept-Encoding": 'gzip, deflate',
                        //"Content-Type": "multipart/form-data",
                    },
                    body: formData
                }
            );
            let data = await response.json();
            console.log(data)
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

// Event  - view event by event id  API
export const eventsViewId = createAsyncThunk(
    'events/event-view-id',
    async(id, thunkAPI) => {
       // console.log('edit event',id)
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/view?id=${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let data = await response.json();
            console.log(data)
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


// Event Edit API
export const eventsEdit = createAsyncThunk(
    'events/event-edit',
    async(formData, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/edit`,
                {
                    method: "PUT",
                    headers: {
                        //Accept: "application/json",
                       // "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                }
            );
            let data = await response.json();
            console.log(data)
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

// Event delete API
export const eventsDelete = createAsyncThunk(
    'events/event-delete',
    async(id, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/events/events/delete?id=${id}`,
                {
                    method: "DELETE",
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




        [eventsList.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventsList.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventsList.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventsCreate.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventsCreate.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventsCreate.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventsViewId.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventsViewId.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventsViewId.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventsEdit.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventsEdit.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventsEdit.rejected] : (state, action) => {
            return {...action.payload}
        },

        [eventsDelete.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [eventsDelete.pending] : (state, action) => {
            return {...action.payload}
        },
        [eventsDelete.rejected] : (state, action) => {
            return {...action.payload}
        },
        
    },

});


export default eventsReducer.reducer;