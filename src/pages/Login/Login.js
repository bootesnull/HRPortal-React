import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginBtn from 'react-google-button'
import {signWithGoogle} from "../../Firebase"

const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError("");
//       try {
//         //await logIn(email, password);
//         navigate("/home");
//       } catch (err) {
//         setError(err.message);
//       }
//     };
  

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="p-4 card-body">
                            <div className="p-4">
                                <h2 className="mb-3">HR Portal Login</h2>
                                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                                {/* <form >
                                    <div className="col-lg-12 mb-3">
                                        <input className="form-control"
                                            type="email"
                                            placeholder="Email address"
                                            // onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <input className="form-control"
                                            type="password"
                                            placeholder="Password"
                                            // onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <button className="btn btn-primary" type="Submit">
                                            Log In
                                        </button>
                                    </div>
                                </form> */}
                                <hr />

                                <div>
                                <GoogleLoginBtn onClick={()=> {
                                    signWithGoogle()
                                    navigate ("/home")
                                    }} /> 
                                </div>
                            </div>
                            {/* <div className="p-4 mt-3 text-center">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
};

export default Login;