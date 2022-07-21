import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    leaveList : [],
    leaves:{
        message:"",
        status:""
    }

}


// leave type list API
export const leaveTypeList = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/leaves/leave-type/list`,
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
    } catch (e) {
        console.log("Error", e.response.data);
    }
}




// leave type create api
export const leaveTypeAdd = createAsyncThunk(
    'leaves/leave-type-create', 
    async({leave_type_name, is_paid, allow_number_of_leaves}, thunkAPI)=> {
        //console.log(leave_type_name, is_paid, allow_number_of_leaves);
        try{
            const response = await fetch(
                `${API_URL}/api/leaves/leave-type/store`,{
                    method : "POST",
                    headers : {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body : JSON.stringify({
                        leave_type_name,
                        is_paid,
                        allow_number_of_leaves,
                    })
                }
            );

            let data = await response.json();
            console.log(data)
            return data;

        }catch (e){
            console.log(e.response.data);
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);



// leave type status update api
export const leaveTypeStatus = createAsyncThunk(
    'leaves/leave-type-status', 
    async({value, id}, thunkAPI) =>{
        try{
            const statusResult = await fetch(
                `${API_URL}/api/leaves/leave-type/status-change`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: id,
                        value: value,    
                    })
                }
            );
            let data = statusResult.json();
            console.log(data);
            return data;
        } catch(e) {
            console.log("error", e.statusResult.data);
            thunkAPI.rejectWithValue(e.statusResult.data)
        }
    }
);


// Leave-type  leave type view id
export const leaveTypeViewId = createAsyncThunk(
    'leaves/leave-type-view-id',
    async(id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/leaves/leave-type/view?id=${id}`,
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


// leave edit api
export const leaveTypeEdit = createAsyncThunk(
    'leaves/leave-type-edit',
    async({id, leave_type_name, is_paid, allow_number_of_leaves}, thunkAPI) => {
        try{
            const response = await fetch(
            `${API_URL}/api/leaves/leave-type/edit`, {
                    method : "PUT",
                    headers : {
                        Accept : "application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,    
                    },
                    body : JSON.stringify({
                        id,
                        leave_type_name,
                        is_paid,
                        allow_number_of_leaves  ,
                    })
                }
            );
            let data = response.json();
            console.log(data);
            return data;

        }catch(e){
            console.log(e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
 






// leave list user-by-leave
export const leaveListbyUser = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/leaves/leaves/list`,
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
    } catch (e) {
        console.log("Error", e.response.data);
    }
}


// leave edit api
export const leaveApprove = createAsyncThunk(
    'leaves/leave-approve',
    async(id, value, thunkAPI) => {
        try{
            const response = await fetch(
            `${API_URL}/api/leaves/leaves/leave-approve?id=${id}&value=${value}`, {
                    method : "PUT",
                    headers : {
                        Accept : "application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,    
                    },
                    body : JSON.stringify({
                        id,
                        value,
                    })
                }
            );
            let data = response.json();
            console.log(data);
            return data;

        }catch(e){
            console.log(e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
)









    const leavesReducer = createSlice({
        name:"leaves",
        initialState,
        reducers:{

        },

        extraReducers:{
            [leaveTypeList.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeList.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeList.rejected] : (state, action) => {
                return { ...action.payload}
            },

            [leaveTypeAdd.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeAdd.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeAdd.rejected] : (state, action) => {
                return {...action.payload}
            },

            [leaveTypeStatus.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeStatus.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeStatus.rejected] : (state, action) => {
                return { ...action.payload}
            },

            [leaveTypeViewId.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeViewId.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeViewId.rejected] : (state, action) => {
                return {...action.payload}
            },

            [leaveTypeEdit.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeEdit.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeEdit.rejected] : (state, action) => {
                return {...action.payload}
            },

            [leaveListbyUser.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveListbyUser.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveListbyUser.rejected] : (state, action) => {
                return {...action.payload}
            },

            [leaveApprove.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveApprove.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveApprove.rejected] : (state, action) => {
                return {...action.payload}
            },

            
            
        }
    });


//export const {} = leavesReducer.actions;
export default leavesReducer.reducer;      
  