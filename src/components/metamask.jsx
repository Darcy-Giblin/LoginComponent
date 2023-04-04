import React, { useState } from "react";
import { ethers } from "ethers";

function MetaMask(props) {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [showButton, setShowButton] = useState(true);

  const { setlogin, showHome, setShowHome } = props;

  const hideButton = () => {
    setShowButton(!showButton);
  };

  async function connect() {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    hideButton();
    setShowHome(!showHome);
    accountChangedHandler(accounts[0]);
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
        <button className="btn btn-primary" onClick={() => connect()}>
          Login with Metamask
        </button>
      )}
      {!showButton && (
        <div>
          <div className="accountDisplay">
            <p>Address: {defaultAccount}</p>
          </div>
          <div className="balanceDisplay">
            <p>Balance: {userBalance}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MetaMask;
