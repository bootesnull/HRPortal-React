import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../templates/Layout";
const ProtectedRoute = () => {
    // const token = useSelector((state)=>state?.Users?.firebaseUser?.accessToken)
    // console.log(token);
     let token = localStorage.getItem("token");
        return  token ? <Layout />  : <Layout />
        
        // <Navigate to="/" />
}

export default ProtectedRoute;