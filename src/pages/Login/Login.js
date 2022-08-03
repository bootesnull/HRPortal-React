import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from 'react-google-button'
import { auth, provider } from "../../firebase"
import { signInWithPopup } from 'firebase/auth'
import { userLogin } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import './login.css';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName:"",
        password:"",
    });
    
    const token = useSelector((state) => state?.Users?.firebaseUser?.accessToken)

    // console.log(token);
    useEffect(() => {
        if (token) {
            navigate("/home")
        }
        else {
            navigate("/")
        }
    // eslint-disable-next-line    
    }, [token])

    
    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const resultData = result.user;
                //console.log(resultData.accessToken,resultData.displayName,resultData.email);
                let data = {
                    name:resultData.displayName,
                    token:resultData.accessToken,
                    email:resultData.email
                }
                //console.log(data);
            dispatch(userLogin(data))
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
    }
    const handleChange = (e) => {
        setUser((preState)=> {
           // console.log(e.target.name , e.target.value);
            return {...preState, [e.target.name] : e.target.value }
        })
    }

    return (
        <>
        <div className="loginBg"></div>
            <div className="container-fluid">
                <div className="row justify-content-end align-items-center form-row">
                    <div className="col-lg-4 form-col">
                        <div className="card">
                            <div className="p-4 card-body text-center">
                                <div className="p-2">
                                    <h2 className="mb-4">HR Portal Login</h2>
                                    
                                    <form className="row" onSubmit={handleLogin}>
                                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                                        <div className="col-lg-12 mb-3">
                                            <input type="text" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <button type="submit" className="btn btn-primary col-lg-12">Login</button>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="g-btn">
                                        <GoogleLoginBtn onClick={signWithGoogle} />
                                    </div>
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