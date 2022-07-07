import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    announcementList : [],
    announcement:{
        message: "",
        statusCode: "",
    }
}

// announcement list API
export const announceList = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/events/announcements/list`,
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

// announcement create API

export const announcementCreate = createAsyncThunk(
    'annoucement/announce-create',
    async({ title, description }, thunkAPI) => {
        try {
            const response = await fetch (
                `${API_URL}/api/events/announcements/create`,
                {
                    method: "POST",
                    headers:{
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        title: title,
                        description: description,
                    })
                }
            );
            let data = await response.json();
            console.log(data);
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

// Announcment delete API
export const announcementDelete = createAsyncThunk(
    'annoucement/announce-delete',
    async ( id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/events/announcements/delete?id=${id}`,
                {
                    method: "DELETE",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    //body: JSON.stringify(id)
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

// Announcment View by id API
export const announcementView = createAsyncThunk(
    'annoucement/announce-edit-view',
    async (id, thunkAPI) => {
        console.log(id)
        try {
            const response = await fetch(
                `${API_URL}/api/events/announcements/view?id=${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }

                }
            );
            let data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

// Announcment edit API
export const announcementEdit = createAsyncThunk(
    'annoucement/announce-edit',
    async({ id, title, description }, thunkAPI) => {
        console.log( title, description )
        try {
            const response = await fetch(
                `${API_URL}/api/events/announcements/edit`,    
                {
                    method: "PUT",
                    headers:{
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        id: id,
                        title: title,
                        description: description,
                    })
                }
            );
            let data = await response.json();
            console.log(data);
            return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);





const announcementReducer = createSlice({
    name: "Announcement",
    initialState,
    reducers :{

    },
    extraReducers:{
        
        [announceList.fulfilled] : (state, action) => {
            return {...action.payload };
        },
        [announceList.pending] : (state, action) => {
            return {...action.payload}
        },
        [announceList.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [announcementCreate.fulfilled] : (state, action) => {
            return {...action.payload };
        },
        [announcementCreate.pending] : (state, action) => {
            return {...action.payload}
        },
        [announcementCreate.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [announcementDelete.fulfilled] : (state, action) => {
            return {...action.payload };
        },
        [announcementDelete.pending] : (state, action) => {
            return {...action.payload}
        },
        [announcementDelete.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [announcementView.fulfilled] : (state, action) => {
            return {announcementList:{...action.payload} };
        },
        [announcementView.pending] : (state, action) => {
            return {...action.payload}
        },
        [announcementView.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [announcementEdit.fulfilled] : (state, action) => {
            return {...action.payload };
        },
        [announcementEdit.pending] : (state, action) => {
            return {...action.payload}
        },
        [announcementEdit.rejected] : (state, action) => {
            return { ...action.payload}
        },
    
        
    }

});

export default announcementReducer.reducer;