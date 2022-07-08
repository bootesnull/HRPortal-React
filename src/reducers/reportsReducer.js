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
export const taskList = async (callback) => {
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
       // console.log(data);
    }catch (e) {
        console.log("error", e.response.data);
    }
};

//delete task by admin
export const deleteTask = createAsyncThunk(
    'reports/task-delete',
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

//add task by admin
export const createTask = createAsyncThunk(
    'reports/task-create',
    async({title, userId}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/reports/task/create`,
                {
                    method: "POST",
                    headers : {
                        Accepts: "application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    },
                    body : JSON.stringify({
                        title: title,
                        user_id : userId,
                    })
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


//task view by admin
export const viewTask = createAsyncThunk(
    'reports/task-view',
    async(id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/reports/task/view?id=${id}`,
                {
                    method: "GET",
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


//edit task by admin
export const editTask = createAsyncThunk(
    'reports/task-edit',
    async({id, title, user_id}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/reports/task/edit`,
                {
                    method: "PUT",
                    headers : {
                        Accepts: "application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    },
                    body : JSON.stringify({
                        id:id,
                        title: title,
                        user_id : user_id,
                    })
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
        [taskList.fulfilled] : (state, action) => {
            return {...action.payload }
        },
        [taskList.pending] : (state, action) => {
            return {...action.payload }
        },
        [taskList.rejected] : (state, action) => {
            return {...action.payload }
        },

        [deleteTask.fulfilled] : (state, action) => {
            return {...action.payload }
        },
        [deleteTask.pending] : (state, action) => {
            return {...action.payload }
        },
        [deleteTask.rejected] : (state, action) => {
            return {...action.payload }
        },

        [createTask.fulfilled] : (state, action) => {
            return {...action.payload }
        },
        [createTask.pending] : (state, action) => {
            return {...action.payload }
        },
        [createTask.rejected] : (state, action) => {
            return {...action.payload }
        },

        [viewTask.fulfilled] : (state, action) => {
            return {...action.payload }
        },
        [viewTask.pending] : (state, action) => {
            return {...action.payload }
        },
        [viewTask.rejected] : (state, action) => {
            return {...action.payload }
        },

        [editTask.fulfilled] : (state, action) => {
            return {...action.payload }
        },
        [editTask.pending] : (state, action) => {
            return {...action.payload }
        },
        [editTask.rejected] : (state, action) => {
            return {...action.payload }
        },



    },
});

export default reportsReducer.reducer