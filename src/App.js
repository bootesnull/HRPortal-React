import React from 'react'
import GoogleLoginBtn from './Component/GoogleLoginBtn/GoogleLoginBtn';
import './App.css';


// This is used when we made the google auth button with the help of login and logout
// import { useEffect } from 'react'
// import { gapi } from 'gapi-script'
// const clientId = '39221243254-ef0fio7fuc5g939rfq67a0cqu05q1lfm.apps.googleusercontent.com'

function App() {

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ''
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // })


  return (
    <div className="App container">
      <GoogleLoginBtn />
    </div>
  );
}

export default App;
