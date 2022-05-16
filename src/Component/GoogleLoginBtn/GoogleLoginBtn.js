import React from 'react';
import { signWithGoogle } from '../../Firebase';
import "./googleLoginBtn.css"

const GoogleLoginBtn = () => {

    return (
        <div>
            <button
                className='login-with-google-btn'
                onClick={signWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default GoogleLoginBtn