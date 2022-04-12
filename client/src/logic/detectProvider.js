import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const Provider = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");

	const detectProvider = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((result) => {
					accountChangedHandler(result[0]);
					console.log("wallet connected");
					setConnButtonText("Wallet Connected");
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
		} else {
			console.log("Need to install MetaMask");
			setErrorMessage("Please install MetaMask browser extension to interact");
		}
	};

	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		//updateEthers();
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	// listen for account changes
	window.ethereum.on("accountsChanged", accountChangedHandler);

	window.ethereum.on("chainChanged", chainChangedHandler);

	useEffect(() => {
		detectProvider();
	}, [defaultAccount]);

	return (
		<div>
			<p>Connected Account: {defaultAccount}</p>
		</div>
	);
};

export default Provider;
