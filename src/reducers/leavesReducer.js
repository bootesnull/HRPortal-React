import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    leaveList : [],
    leaves:{
        message:"",
        status:""
    }

}


// leave list type API
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




// leave add api
export const leaveTypeAdd = createAsyncThunk(
    'leaves/leave-type-add', 
    async({leaveTypeName, isPaid, allowNumberOfLeaves}, thunkAPI)=> {
        console.log(leaveTypeName, isPaid, allowNumberOfLeaves);
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
                        leave_type_name : leaveTypeName,
                        is_paid: isPaid,
                        allow_number_of_leaves: allowNumberOfLeaves,
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

// leave edit api

export const leaveTypeEdit = createAsyncThunk(
    'leaves/leave-type-edit',
    async({id, leaveTypeName, isPaid, allowNumberOfLeaves}, thunkAPI) => {
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
                        id: id,
                        leave_type_name: leaveTypeName,
                        is_paid: isPaid ,
                        allow_number_of_leaves : allowNumberOfLeaves ,
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
 

// leave status update api
export const leaveStatus = createAsyncThunk(
    'leaves/leave-status', 
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





// leave list user-by-leave
export const leaveListbyUser = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/leaves/leaves/user-by-leave`,
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


// delete leave by auth and leave id
export const leaveDelete = createAsyncThunk(
    'leaves/leave-delete',
    async ( id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/leaves/leaves/delete-leave?id=${id}}`,
                {
                    method: "DELETE",
                    headers : {
                        Accept : "application/json",
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


// Leave  - user list leaves by leave type id
export const leaveViewId = createAsyncThunk(
    'leaves/leave-view-id',
    async(id, thunkAPI) => {
        console.log(id)
        try{
            const response = await fetch(
                `${API_URL}/api/leaves/leaves/leave-list-by-leave-type?leave_type_id=${id}`,
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


export const leaveEdit = createAsyncThunk(
    'leaves/leave-edit',
    async( thunkAPI) => {
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

            [leaveStatus.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveStatus.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveStatus.rejected] : (state, action) => {
                return { ...action.payload}
            },

            [leaveTypeAdd.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveTypeAdd.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveStatus.rejected] : (state, action) => {
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

            [leaveDelete.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveDelete.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveDelete.rejected] : (state, action) => {
                return {...action.payload}
            },
            
            [leaveViewId.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveViewId.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveViewId.rejected] : (state, action) => {
                return {...action.payload}
            },

            [leaveEdit.fulfilled] : (state, action) => {
                return {...action.payload}
            },
            [leaveEdit.pending] : (state, action) => {
                return {...action.payload}
            },
            [leaveEdit.rejected] : (state, action) => {
                return {...action.payload}
            },
        }
    });


//export const {} = leavesReducer.actions;
export default leavesReducer.reducer;      
  