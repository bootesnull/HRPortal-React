import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";


const initialState = {
    login: {},
    loginUser : {
        message: "",
        statusCode : "",
        //token:"",
    },
    

}

// admin login 
export const loginAdmin = createAsyncThunk(
    "login/admin-login",
    async ({email, password}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/admin-login`,
                {
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
                console.log(data)
                if(data.token){
                  localStorage.setItem("token", data.token)
                  }
                 return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

// admin login out
export const logoutAdmin = createAsyncThunk(
    "login/admin-logout",
    async (token, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/logout`,
                {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization : `Bearer ${token}`, 
                    },
                });
                let data = await response.json();
                console.log(data);
                return data;
        }catch(e){
            console.log("error", e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);



const loginReducer = createSlice({
    name:"admin",
    initialState,
    reducers :{

    },
    extraReducers:{
        [loginAdmin.fulfilled] : (state, action) => {
            return { ...action.payload }
        },
        [loginAdmin.pending] : (state, action) => {
            return { ...action.payload }
        },
        [loginAdmin.rejected] : (state, action) => {
            return { ...action.payload }
        },

        [logoutAdmin.fulfilled] : (state, action) => {
            return { ...action.payload }
        },
        [logoutAdmin.pending] : (state, action) => {
            return { ...action.payload }
        },
        [logoutAdmin.rejected] : (state, action) => {
            return { ...action.payload }
        },
    }
});

//export const {} = loginReducer.actions;
export default loginReducer.reducer;
