import { GoogleLogin } from 'react-google-login'

const clientId = '39221243254-ef0fio7fuc5g939rfq67a0cqu05q1lfm.apps.googleusercontent.com'

function Login() {

    const onSuccess = (res) => {
        console.log("Login Success! Current user:", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login Failed! res:", res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                // cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;