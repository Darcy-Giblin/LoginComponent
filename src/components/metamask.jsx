import React, { useState } from "react";
import { ethers } from "ethers";

function MetaMask(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [showButton, setShowButton] = useState(true);
 
  const{login, setlogin, showHome, setShowHome}=props
  // this.state = {
  //   showButton: true
  // }
  // const showButton = this.state.showButton;

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
    <div>
      {showButton && (
        <button className="btn btn-primary" onClick={() => connect()}>Login with Metamask</button>
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
      )}
      {errorMessage}
    </div>
  );
}

export default MetaMask;
