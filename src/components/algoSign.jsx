import React, { useState } from "react";
import { ethers } from "ethers";

function AlgoSign(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [showButton, setShowButton] = useState(true);
  // this.state = {
  //   showButton: true
  // }
  // const showButton = this.state.showButton;
  const{login, setlogin, showHome, setShowHome}=props

  const hideButton = () => {
    setShowHome(!showHome)
    setShowButton(!showButton);
  };

  async function connect(onConnected) {
    if (!window.AlgoSigner) {
      alert("Get AlgoSigner!");
      return;
    } else {
      window.AlgoSigner.connect();
      hideButton();
      window.AlgoSigner.accounts({
        ledger: "TestNet",
      }).then((response) =>
        response.forEach((element) => {
          accountChangedHandler(element.address);
        })
      );
    }
  }
  // accountChangedHandler(accounts[0]);

  // return(<h1>{accounts[0]}</h1>)

  const accountChangedHandler = (newAccount) => {
    setlogin(newAccount);
    setDefaultAccount(newAccount);
    // getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
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
        <button className="btn btn-primary" onClick={() => connect()}>Login with AlgoSign</button>
      )}
      {!showButton && (
        <div>
          <div className="accountDisplay">
            {" "}
            <p>Address: {defaultAccount}</p>
          </div>
        </div>
      )}
      {errorMessage}
    </div>
  );
}

export default AlgoSign;
