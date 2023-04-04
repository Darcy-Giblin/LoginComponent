import React, { useState } from "react";
import MetaMask from "./metamask";
import AlgoSign from "./algoSign";
import AppleID from "./appleID";
import Google from "./google";
import { GoogleLogout } from "react-google-login";

function Login() {
  const clientId =
    "732774753387-7on67mrq0u93hddgn98adts0t15d7o58.apps.googleusercontent.com";

  const onSuccess = () => {
    alert("Logout made successfully");
    setlogin(null);
    setShowHome(!showHome);
  };

  const [showHome, setShowHome] = useState(false);
  const [login, setlogin] = useState(true);
  const [google, setGoogle] = useState(false);

  const hideHome = () => {
    setGoogle(false);
    setlogin(null);
    setShowHome(!showHome);
  };

  return (
    <div className="container m-3 ">
      {!showHome && (
        <div className="row justify-content-center  border">
          <h2 className="text-center">Login Component v1</h2>
          <div className="col-sm-6  m-3 btn btn-primary">
            <MetaMask
              className=""
              login={login}
              setlogin={setlogin}
              showHome={showHome}
              setShowHome={setShowHome}
            ></MetaMask>
          </div>
          <div className="col-sm-6 m-3 btn btn-primary">
            <AlgoSign
              className=""
              login={login}
              setlogin={setlogin}
              showHome={showHome}
              setShowHome={setShowHome}
            ></AlgoSign>
          </div>
          <div className="col-sm-6 m-3 btn btn-primary">
            <AppleID
              className=""
              login={login}
              setlogin={setlogin}
              showHome={showHome}
              setShowHome={setShowHome}
            ></AppleID>
          </div>
          <div className="col-sm-6 m-3 btn btn-primary">
            <Google
              className=""
              google={google}
              setGoogle={setGoogle}
              login={login}
              setlogin={setlogin}
              showHome={showHome}
              setShowHome={setShowHome}
            ></Google>
          </div>
        </div>
      )}
      {showHome && (
        <div className="row  text-center">
          {google && (
            <div className="pt-5  pb-5">
              <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
              ></GoogleLogout>
            </div>
          )}
          {!google && (
            <div className="pt-5  pb-5">
              <button onClick={() => hideHome()}>Logout</button>
            </div>
          )}

          <div className="">
            <div>WELCOME: {login}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
