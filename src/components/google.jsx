import{GoogleLogin} from 'react-google-login'
import React, { useState } from "react";
import { ethers } from "ethers";

function Google(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [showButton, setShowButton] = useState(true);
 

  const{login, setlogin, showHome, setShowHome, google, setGoogle}=props
const clientId = '732774753387-7on67mrq0u93hddgn98adts0t15d7o58.apps.googleusercontent.com'

const onSuccess = (res) => {
  console.log('[login success] currentUser:', res.profileObj)
  setGoogle(true)
  setShowHome(!showHome)
  setlogin(res.profileObj.givenName + " " + res.profileObj.familyName);
};
const onFailure = (res) => {
  console.log('[login failed] res:', res)
};

  const hideButton = () => {
    setShowButton(!showButton);
  };

  async function connect(onConnected) {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    hideButton();
    setShowHome(!showHome)
    accountChangedHandler(accounts[0]);
    // return(<h1>{accounts[0]}</h1>)
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    setlogin(address);
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  return (
    <div className="btn btn-primary">
<GoogleLogin clientId={clientId} 
buttonText="Login with Google"
onSuccess={onSuccess}
onFailure={onFailure}
cookiePolicy={'single_host_origin'}
style={{marginTop:'100px'}}
isSignedIn={true}/>
<div></div>
      {/* {showButton && (
        <button onClick={() => connect()}>Login with Metamask</button>
      )}
      {!showButton && (
        <div>
          <div className="accountDisplay">
            {" "}
            <p>Address: {defaultAccount}</p>
          </div>
          <div className="balanceDisplay">
            {" "}
            <p>Balance: {userBalance}</p>
          </div>
        </div>
      )} */}
      {errorMessage}
    </div>
  );
}

export default Google;
