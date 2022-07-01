import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    permissionListing: {},
    permission: {
        message: "",
        statusCode: '',
    },
};


// permission list api
export const permissionList = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/rbac/permission/list`,
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

// permission Status change api
export const permissionStatus = createAsyncThunk(
    'permission/permission-status',
    async ({ value, id }, thunkAPI) => {
        //console.log(value,id);
        try {
            const statusResult = await fetch(
                `${API_URL}/api/rbac/permission/update-status`,
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


// permission create api
export const createPermission = createAsyncThunk(
    'permission/permission-create',
    async ({ parent, permissionName }, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/api/rbac/permission/store`,
                {
                    method: "POST",
                    headers: {
                        Accept: "applcation/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        permission_name: permissionName,
                        parent: +parent,
                    })
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


//permission edit fetch api


export const editFetchPermission = createAsyncThunk(
    'permission/permission-fetch',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/api/rbac/permission/get-by-id?id=${id}`,
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
//permission edit  api
export const editPermission = createAsyncThunk(
    'permission/permission-edit',
    async ({ id, permissionName, parent }, thunkAPI) => {
        try {
            const response = await fetch(
                `${API_URL}/api/rbac/permission/edit`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: id,
                        permission_name: permissionName,
                        parent: +parent,
                    })
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


// // permission delete api
// export const permissionDelete = createAsyncThunk(
//     'permission/permission-delete',
//     async ( id, thunkAPI) => {
//         console.log(id)
//         try{
//             const response = await fetch(
//                 `${API_URL}/api/admin/permission/delete?id=${id}`,
//                 {
//                     method: "DELETE",
//                     headers : {
//                         Accept : "application/json",
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                    // body: JSON.stringify(id)
//                 }
//             );
//             let data = response.json();
//             console.log(data);
//             return data;
//         }catch(e) {
//             console.log("error", e.response.data)
//             thunkAPI.rejectWithValue(e.response.data)
//         }
//     }
// );    



const permissionReducer = createSlice({
    name: "permissions",
    initialState,
    reducers: {

    },

    extraReducers: {
        [permissionList.fullfilled]: (state, action) => {
            return { ...action.payload }
        },
        [permissionList.pending]: (state, aciton) => {
            return { ...aciton.payload }
        },
        [permissionList.rejected]: (state, action) => {
            return { ...action.payload }
        },

        [permissionStatus.fulfilled]: (state, action) => {
            return { ...action.payload }
        },
        [permissionStatus.pending]: (state, action) => {
            return { ...action.payload }
        },
        [permissionStatus.rejected]: (state, action) => {
            return { ...action.payload }
        },

        [editFetchPermission.fulfilled] : (state, action) => {
            return {permissionListing:{...action.payload}}
        },
        [editFetchPermission.pending] : (state, action) => {
            return {...action.payload}
        },
        [editFetchPermission.rejected] : (state, action) => {
            return {...action.payload}
        },

        [createPermission.fulfilled]: (state, aciton) => {
            return { ...aciton.payload }
        },
        [createPermission.pending]: (state, action) => {
            return { ...action.payload }
        },
        [createPermission.rejected]: (state, action) => {
            return { ...action.payload }
        }


    }
});


export const { fetchPermissionList } = permissionReducer.actions;
export default permissionReducer.reducer;
