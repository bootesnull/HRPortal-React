import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api";


const initialState = {
    login: [],
    loginUser : {
        message: "",
        statusCode : "",
    },

}

// admin login 
export const adminLogin = createAsyncThunk(
    "login/admin-login",
    async ({email, password}, thunkAPI) => {
    //  console.log(callback);
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:email, 
            password:password,
          }),
        });
  
        let data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token)
        // callback()
        return data;
      } catch (e) {
        console.log("Error", e.response.data);
        thunkAPI.rejectWithValue(e.response.data)
      }
    }
  );

const loginReducer = createSlice({
    name:"admin",
    initialState,
    reducers :{

    },
    extraReducers:{
        [adminLogin.fulfilled] : (state, action) => {
            return { loginUser:{...action.payload} }
        },
        [adminLogin.pending] : (state, action) => {
            return { ...action.payload }
        },
        [adminLogin.rejected] : (state, action) => {
            return { ...action.payload }
        },
    }
});

export const {} = loginReducer.actions;
export default loginReducer.reducer;
