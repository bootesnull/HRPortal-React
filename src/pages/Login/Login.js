import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast  } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../reducers/loginReducer";
import './login.css';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const loginDetails = useSelector((state) => state.authLogin)
    const [adminLogin, setAdminLogin] = useState({
        userName:"",
        password:"",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(adminLogin)).then(()=>{
            //navigate("/home") 
            if(localStorage.getItem("token")) {
               navigate("/home") 
            }
        }).catch(()=>{
            navigate("/")
        })
    }


    const handleChange = (e) => {
        setAdminLogin((preState)=> {
           // console.log(e.target.name , e.target.value);
            return {...preState, [e.target.name] : e.target.value }
        })
    }

    useEffect(()=>{
        // if (loginDetails.statusCode===200) {
        //     toast.success(loginDetails.message);
        // }
        if (loginDetails.statusCode===401) {
            toast.error(loginDetails.message);
        }
    },[loginDetails])

    return (
        <>
        <div className="loginBg"></div>
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center form-row">
                    <div className="col-lg-5 offset-lg-1 text-light  ">
                        <h1>JOIN OUR <br />COMMUNITY</h1>
                        <p className="font-weight-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida faucibus. Suspendisse viverra pharetra purus.
                            Proin fringilla ac lorem at sagittis. Proin tincidunt dui et nunc ultricies dignissim.
                        </p>
                    </div>
                    <div className="col-lg-4 form-col">
                        <div className="card">
                            <div className="p-4 card-body ">
                                <div className="p-2">
                                    <h2 className="mb-4 text-center">HR Portal Login</h2>
                                    <hr style={{opacity: "0.1"}}/>
                                    
                                    <form className="row" onSubmit={handleLogin}>
                                        <div className="col-lg-12 mb-3">
                                            <label className="form-label">Email<span className="text-danger">*</span></label>
                                            <input type="text" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <label className="form-label">Password<span className="text-danger">*</span></label>
                                            <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <button type="submit" className="btn btn-primary col-lg-12">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;