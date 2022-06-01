import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function AppleID(props) {
  const [showButton, setShowButton] = useState(true);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const { login, setlogin, showHome, setShowHome } = props;

  const hideButton = () => {
    setShowHome(!showHome);
    setShowButton(!showButton);
  };

  const responseFacebook = (response) => {
    console.log(response);
    setlogin(response.name);
    setDefaultAccount(response.name);
    hideButton();
  };

  return (
    <div>
      {/* <button className='btn btn-primary'>Login with AppleID</button>
    <script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script> */}
      {showButton && (
        <FacebookLogin
          appId="1067771197168652"
          autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <button className="btn btn-primary" onClick={renderProps.onClick}>
              Login with Facebook
            </button>
          )}
        />
      )}
      {!showButton && (
        <div>
          <div className="accountDisplay">
            {" "}
            <p>Name: {defaultAccount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppleID;
