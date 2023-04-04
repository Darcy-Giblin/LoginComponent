import React, { useState } from "react";

function AlgoSign(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const{setlogin, showHome, setShowHome}=props

  const hideButton = () => {
    setShowHome(!showHome)
    setShowButton(!showButton);
  };

  async function connect() {
    if (!window.AlgoSigner) {
      alert("Get AlgoSigner!");
    } else {
      window.AlgoSigner.connect();
      hideButton();
      window.AlgoSigner.accounts({
        ledger: "TestNet",
      }).then((response) =>
        response.forEach((element) => {
          accountChangedHandler(element.address);
        })
      ).catch((error) => {
        setErrorMessage(error);
      })
    }
  }

  const accountChangedHandler = (newAccount) => {
    setlogin(newAccount);
    setDefaultAccount(newAccount);
  };

  return (
    <div>
      {showButton && (
        <button className="btn btn-primary" onClick={() => connect()}>Login with AlgoSign</button>
      )}
      {!showButton && (
        <div>
          <div className="accountDisplay">
            <p>Address: {defaultAccount}</p>
          </div>
        </div>
      )}
      {errorMessage}
    </div>
  );
}

export default AlgoSign;
