import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    userList: [],
    user: {
        message: "",
        statusCode: '',
    },
    firebaseUser: {}
};


// User list API
export const usersList = async (callback) => {
    try {
        const response = await fetch(
            `${API_URL}/api/user/list`,
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

// user login 
export const userLogin = createAsyncThunk(
    "roles/roleAdd",
    async ({token, name, email}, thunkAPI) => {
     
      try {
        const response = await fetch(`${API_URL}/api/sign-up`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:name,
            email:email, 
            firebase_token:token,
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



const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        // userAuth(state = initialState, action) {
        //     // console.log(action.payload.accessToken);
        //     localStorage.setItem("token", action.payload.accessToken)
        //     return {
        //         firebaseUser: { ...action.payload }
        //     }
        // },
        userLogout(state = initialState, action) {
            localStorage.removeItem("token")
            state.firebaseUser = null;
            //console.log("akhsdfljs")
        },
    },
    extraReducers: {
        [usersList.fulfilled]: (state, action) => {
            return { ...action.payload }
        },
        [usersList.pending]: (state, action) => {
            return { ...action.payload }
        },
        [usersList.rejected]: (state, action) => {
            return { ...action.payload }
        },

        [userLogin.fulfilled]: (state, action) => {
            return { ...action.payload }
        },
        [userLogin.pending]: (state, action) => {
            return { ...action.payload }
        },
        [userLogin.rejected]: (state, action) => {
            return { ...action.payload }
        },

        
    }
});


export const {  userLogout } = userReducer.actions;
export default userReducer.reducer;
