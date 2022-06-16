import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from '../api'

const initialState = {
  roleList: [],
  roles: {
    message: "",
    statusCode: '',
  },


};



 // Role ADD 
export const createRoleList = createAsyncThunk(
  "roles/roleAdd",
  async (name, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/api/rbac/role/store`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name
        }),
      });

      let data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
);

 // Role Status Update
export const roleStatus = createAsyncThunk(
  'roles/roleStatus',
  async ({value,id}, thunkAPI) => {
   
    try {
      const statusResult = await fetch(
        `${API_URL}/api/rbac/role/update-status`,
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


 // Role Name Edit 
  export const roleEdit = createAsyncThunk(
    'roles/editRole', 
    async({id, name}, thunkAPI) => {
      try {
        const editResponse = await fetch(
          `${API_URL}/api/rbac/role/edit`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: id,
              name: name,
            })
          }
        );

        let data = await editResponse.json();
        console.log(data);
        return data;
      } catch (e) {
        console.log("error", e.editResponse.data)
        thunkAPI.rejectWithValue(e.editResponse.data)
      }
    }
    );






const rolesReducer = createSlice({
  name: "roles",
  initialState,
  reducers: {

  },

  extraReducers: {
    [createRoleList.fulfilled]: (state, action) => {
      return { ...action.payload }
    },
    [createRoleList.pending]: (state, action) => {
      return { ...action.payload }
    },
    [createRoleList.rejected]: (state, action) => {
      return { ...action.payload }
    },

    [roleEdit.fulfilled]: (state, action) => {
      return { ...action.payload }
    },
    [roleEdit.pending]: (state, action) => {
      return { ...action.payload }
    },
    [roleEdit.rejected]: (state, action) => {
      return { ...action.payload }
    },

    [roleStatus.fulfilled]: (state, action) => {
      return { ...action.payload }
    },
    [roleStatus.pending]: (state, action) => {
      return { ...action.payload }
    },
    [roleStatus.rejected]: (state, action) => {
      return { ...action.payload }
    },
  }

});


export const { fetchRoleList } = rolesReducer.actions;
export default rolesReducer.reducer;
