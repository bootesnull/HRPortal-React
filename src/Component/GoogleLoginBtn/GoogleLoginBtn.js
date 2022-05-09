import React from 'react';
import { signWithGoogle } from '../../Firebase';

const GoogleLoginBtn = () => {
    // const handleSubmit = () => {
    //     const result = signWithGoogle();
    //     console.log(signWithGoogle());
    // }
    return (
        <div>
            <button className='login-with-google-btn' onClick={signWithGoogle}>Sign in with Google</button>
        </div>
    )
}

export default GoogleLoginBtn