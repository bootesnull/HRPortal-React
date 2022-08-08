import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api";


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
    }
});

//export const {} = loginReducer.actions;
export default loginReducer.reducer;
