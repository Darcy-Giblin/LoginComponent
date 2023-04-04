import { GoogleLogin } from "react-google-login";
import React from "react";

function Google(props) {
  const { setlogin, showHome, setShowHome, setGoogle } = props;
  const clientId =
    "732774753387-7on67mrq0u93hddgn98adts0t15d7o58.apps.googleusercontent.com";

  const onSuccess = (res) => {
    setGoogle(true);
    setShowHome(!showHome);
    setlogin(res.profileObj.givenName + " " + res.profileObj.familyName);
  };
  const onFailure = (res) => {
    console.error("[login failed] res:", res);
  };

  return (
    <div className="btn btn-primary">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Google;
