import { useState, useEffect } from "react";

const DetectMetamask = () => {
	const [walletAddress, setWalletAddress] = useState("");
	async function requestAccount() {
		console.log("Requesting account...");

		//check if metamask exists
		if (window.ethereum) {
			console.log("detected");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				console.log(accounts);
				// setWalletAddress(accounts[0]);
				accountChangedHandler(accounts[0]);
			} catch (error) {
				console.log("Error connecting...", error);
			}
		} else {
			console.log("Meta Mask was not detected!");
		}
	}

	const accountChangedHandler = (newAccount) => {
		setWalletAddress(newAccount);
		//updateEthers();
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	};

	window.ethereum.on("accountsChanged", accountChangedHandler);

	window.ethereum.on("chainChanged", chainChangedHandler);

	return (
		<div className="">
			{/* <p>Connected Account: {account}</p> */}
			{/* <DetectProvider /> */}
			<header>
				<button onClick={requestAccount}>Connect Wallet</button>
				<h3>Wallet Address: {walletAddress}</h3>
			</header>
		</div>
	);
};

export default DetectMetamask;
