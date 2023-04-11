import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, token } from "../api";

const initialState = {
    organizationList : {},
    organization : {
        message : "",
        statusCode :"",
    }
}


// organization create API
export const organizationCreate = createAsyncThunk(
    'organization/organization-build',
    async(formData, thunkAPI) => {
        console.log( "ghi", formData)

        try{
            const response = await fetch(
                `${API_URL}/api/organization/build`,
                {
                    method: "POST",
                    headers: {
                        //"Accept": "application/json",
                        //"Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        //"Accept-Encoding": 'gzip, deflate',
                        //"Content-Type": "multipart/form-data",
                    },
                    body: formData
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


// organization List API
export const organizationList = async(callback) => {
    try{
        const response = await fetch(
            `${API_URL}/api/organization/get-organization-list`,
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
        //console.log(data)
    }catch(e){
        console.log("error", e.response.data);
    }
}



// organization status API
export const organizationStatusUpdate = createAsyncThunk(
    'organization/organization-status',
    async ( {id, status}, thunkAPI) => {
        try{
            const response = await fetch(
                `${API_URL}/api/organization/activate-deactivate-organization`,
                {
                    method: "PATCH",
                    headers : {
                        Accept : "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id:id,
                        status: status,
                    })
                }
            );
            let data = response.json();
           // console.log(data);
            return data;
        }catch(e) {
            console.log("error", e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
); 



const organizationReducer = createSlice ({
    name : "Organization",
    initialState,
    reducers : {
        
    },
    extraReducers : {
 
        [organizationCreate.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [organizationCreate.pending] : (state, action) => {
            return {...action.payload}
        },
        [organizationCreate.rejected] : (state, action) => {
            return {...action.payload}
        },
        [organizationList.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [organizationList.pending] : (state, action) => {
            return {...action.payload}
        },
        [organizationList.rejected] : (state, action) => {
            return {...action.payload}
        },
        

     
        // [organizationEdit.fulfilled] : (state, action) => {
        //     return {...action.payload}
        // },
        // [organizationEdit.pending] : (state, action) => {
        //     return {...action.payload}
        // },
        // [organizationEdit.rejected] : (state, action) => {
        //     return {...action.payload}
        // },


        [organizationStatusUpdate.fulfilled] : (state, action) => {
            return {...action.payload}
        },
        [organizationStatusUpdate.pending] : (state, action) => {
            return {...action.payload}
        },
        [organizationStatusUpdate.rejected] : (state, action) => {
            return {...action.payload}
        },
        
    },

});


export default organizationReducer.reducer;