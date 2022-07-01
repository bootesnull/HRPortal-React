import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    allowPermissionList : [],
    allowPermission: {
        messsage: "",
        statusCode:"",
    },
};

//list allow permission api
export const allowPermissionListing = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/rbac/allow-role-permission`,
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



//allow permission status change
export const allowPermissionStatus = createAsyncThunk(
    'allowPermission/allow-permission-status',
    async ({ value, id }, thunkAPI) => {
        //console.log(value,id);
        try {
        const statusResult = await fetch(
        `${API_URL}/api/rbac/allow-role-permission/update-status`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              id: id,
              value: value,
            })
          }
        );
  
        let data = await statusResult.json();
        console.log(data);
        return data;
      } catch (e) {
        console.log("error", e.statusResult.data)
        thunkAPI.rejectWithValue(e.statusResult.data)
      }
    });


    

const allowPermissionReducer = createSlice({
    name:"allowPermission",
    initialState,
    reducers:{

    },
    extraReducers:{
        [allowPermissionStatus.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionStatus.pending] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionStatus.fulfilled] : (state, action) => {
            return {...action.payload}
        },


    }
});

export const { } = allowPermissionReducer.actions;
export default allowPermissionReducer.reducer;


