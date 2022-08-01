import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from 'react-google-button'
import { auth, provider } from "../../firebase"
import { signInWithPopup } from 'firebase/auth'
import { userAuth } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const token = useSelector((state) => state.Users.firebaseUser.accessToken)

    // console.log(token);
    useEffect(() => {
        if (!token) return;
        navigate("/home")
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
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="p-4 card-body">
                            <div className="p-4">
                                <h2 className="mb-3">HR Portal Login</h2>
                                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                                <div>
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