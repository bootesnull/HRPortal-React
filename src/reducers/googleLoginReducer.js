import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api";


const initialState = {
    googleLogin: {},
    googleLoginUser : {
        message: "",
        statusCode : "",
    },
    firebaseUser: {}
    

}

// google user login 
export const googleUserLogin = createAsyncThunk(
    "login/google-user-login",
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



const googleLoginReducer = createSlice({
    name:"googleUser",
    initialState,
    reducers :{
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
    
    extraReducers:{
        [googleUserLogin.fulfilled] : (state, action) => {
            return { ...action.payload }
        },
        [googleUserLogin.pending] : (state, action) => {
            return { ...action.payload }
        },
        [googleUserLogin.rejected] : (state, action) => {
            return { ...action.payload }
        },
    }
});

export default googleLoginReducer.reducer;
