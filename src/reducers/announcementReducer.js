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

export const announceCreate = createAsyncThunk(
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

const announcementReducer = createSlice({
    name: "Announcement",
    initialState,
    reducers :{

    },
    extraReducers:{

    }
    }
);

export default announcementReducer.reducer;