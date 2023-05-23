import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from 'react-google-button'
import { auth, provider } from "../../Firebase"
import { signInWithPopup } from 'firebase/auth'
import { userAuth } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import './login.css';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const token = useSelector((state) => state?.Users?.firebaseUser?.accessToken)

    // console.log(token);
    useEffect(() => {
        if (token) {
            navigate("/home")
        }
        else {
            navigate("/")
        }
        
    }, [token])

    
    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const resultData = result.user;
                dispatch(userAuth(resultData))

            })
            .catch((error) => {
                console.log(error);
            })
    }




    return (
        <div className="container">
            <div className="row justify-content-center align-items-center height-100-vh">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="p-3 card-body text-center">
                            <div className="p-1">
                                <h2 className="mb-3">HR Portal Login</h2>
                                {/* {error && <Alert variant="danger">{error}</Alert>} */}
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
    );
};

export default Login;