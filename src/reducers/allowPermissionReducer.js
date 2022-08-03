import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL,token } from "../api";



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
    async ({ id, value }, thunkAPI) => {
      //  console.log(value,id);
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

// Assign Role by role_id, permission_id
export const assignRolePermission = createAsyncThunk(
    'allowPermission/allow-permission-assign',
    async({roleId, permissionId}, thunkAPI) => {
        // console.log(roleId, permissionId);
        try{
            const response = await fetch(
                `${API_URL}/api/rbac/allow-role-permission/store`,
                {
                    method : "POST",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        role_id:roleId,
                        permission_id:permissionId,
                    })
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



// Edit Prefetch data API - Allow Permission View
export const allowPermissionView = createAsyncThunk(
    'allowPermission/allow-permission-view',
    async (id, thunkAPI) => {
        console.log(id)
        try {
            const response = await fetch(
                `${API_URL}/api/rbac/allow-role-permission/view?id=${id}`,
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


// Edit allow permission API - Allow permission edit
export const allowPermissionEdit = createAsyncThunk(
    'allowPermission/allow-permission-edit',
    async({id, role_id, permission_id}, thunkAPI) => {
        //console.log("==================================",id, role_id, permission_id);
        try{
            const response = await fetch(
                `${API_URL}/api/rbac/allow-role-permission/edit`,
                {
                    method : "POST",
                    headers : {
                        Accept:"application/json",
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`,
                    },
                    body : JSON.stringify({
                        id: id,
                        role_id,
                        permission_id
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





const allowPermissionReducer = createSlice({
    name:"allowPermission",
    initialState,
    reducers:{

    },
    extraReducers:{

        [allowPermissionListing.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionListing.pending] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionListing.fulfilled] : (state, action) => {
            return {...action.payload}
        },

        [allowPermissionStatus.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionStatus.pending] : (state, action) => {
            return {...action.payload}
        },
        [allowPermissionStatus.fulfilled] : (state, action) => {
            return {...action.payload}
        },

        [assignRolePermission.fulfilled] : (state, action) => {
            return { ...action.payload}
        },
        [assignRolePermission.pending] : (state, action) => {
            return {...action.payload }
        },
        [assignRolePermission.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [allowPermissionView.fulfilled] : (state, action) => {
            return { ...action.payload}
        },
        [allowPermissionView.pending] : (state, action) => {
            return {...action.payload }
        },
        [allowPermissionView.rejected] : (state, action) => {
            return { ...action.payload}
        },

        [allowPermissionEdit.fulfilled] : (state, action) => {
            return { ...action.payload}
        },
        [allowPermissionEdit.pending] : (state, action) => {
            return {...action.payload }
        },
        [allowPermissionEdit.rejected] : (state, action) => {
            return { ...action.payload}
        },


    }
});

// export const { } = allowPermissionReducer.actions;
export default allowPermissionReducer.reducer;


