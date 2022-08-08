import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast  } from 'react-toastify';
import GoogleLoginBtn from 'react-google-button'
import { auth, provider } from "../../firebase"
import { signInWithPopup } from 'firebase/auth'
import { googleUserLogin } from "../../reducers/googleLoginReducer"; 
import { useDispatch, useSelector } from "react-redux";
import './login.css';

const GoogleLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const googleLoginDetails = useSelector((state) => state.authLogin)

    
   //const token = useSelector((state) => state?.googleUsers?.firebaseUser?.accessToken)
    
    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const resultData = result.user;
                let data = {
                    name:resultData.displayName,
                    token:resultData.accessToken,
                    email:resultData.email
                }
                //console.log(data);
            dispatch(googleUserLogin(data))
            navigate("/home")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(()=>{
        if (googleLoginDetails.statusCode===200) {
            toast.success(googleLoginDetails.message);
        }
        if (googleLoginDetails.statusCode===401) {
            toast.error(googleLoginDetails.message);
        }
    },[googleLoginDetails])

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
                            <div className="p-4 card-body text-center">
                                <div className="p-2">
                                    <h2 className="mb-4">HR Portal Login</h2>
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

export default GoogleLogin;