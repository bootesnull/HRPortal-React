import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    reportsList : {},
    reports : {
        message : "",
        statusCode : "",
    }
}



// task list by admin API
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

//delete task by admin
export const deleteTask = createAsyncThunk(
    'reports/report-delete',
    async(id, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/reports/task/delete?id=${id}`,
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


const reportsReducer = createSlice ({
    name: "Report",
    initialState,
    reducers : {

    },
    extraReducers :{
        [reportslist.fullfilled] : (state, action) => {
            return {...action.payload }
        },
        [reportslist.pending] : (state, action) => {
            return {...action.payload }
        },
        [reportslist.rejected] : (state, action) => {
            return {...action.payload }
        },

        [deleteTask.fullfilled] : (state, action) => {
            return {...action.payload }
        },
        [deleteTask.pending] : (state, action) => {
            return {...action.payload }
        },
        [deleteTask.rejected] : (state, action) => {
            return {...action.payload }
        },

        // [reportslist.fullfilled] : (state, action) => {
        //     return {...action.payload }
        // },
        // [reportslist.pending] : (state, action) => {
        //     return {...action.payload }
        // },
        // [reportslist.rejected] : (state, action) => {
        //     return {...action.payload }
        // },

        // [reportslist.fullfilled] : (state, action) => {
        //     return {...action.payload }
        // },
        // [reportslist.pending] : (state, action) => {
        //     return {...action.payload }
        // },
        // [reportslist.rejected] : (state, action) => {
        //     return {...action.payload }
        // },
    },
});

export default reportsReducer.reducer