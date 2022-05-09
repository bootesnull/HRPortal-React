import { GoogleLogout } from 'react-google-login'

const clientId = '39221243254-ef0fio7fuc5g939rfq67a0cqu05q1lfm.apps.googleusercontent.com'


function Logout() {

    const onSuccess = () => {
        console.log('Logout Successfull');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;