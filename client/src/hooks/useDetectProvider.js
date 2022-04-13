import { useState, useEffect, useCallback } from "react";

const useDetectProvider = () => {
	const [walletAddress, setWalletAddress] = useState("");

	const requestAccount = useCallback(async () => {
		console.log("Requesting account...");
		if (window.ethereum) {
			console.log("detected...");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setWalletAddress(accounts[0]);
				console.log(accounts);
			} catch (error) {
				console.log("Error connecting...", error);
			}
		} else {
			console.log("Metamask not detected");
			handleClickMetamask();
		}
	}, []);
	useEffect(() => {
		requestAccount();
		const chainChangedHandler = () => {
			// reload the page to avoid any errors with chain change mid use of application
			window.location.reload();
		};
		window.ethereum.on("accountsChanged", requestAccount);
		window.ethereum.on("chainChanged", chainChangedHandler);
		return () => {
			window.removeEventListener("accountsChanged", requestAccount);
			window.removeEventListener("chainChanged", chainChangedHandler);
		};
	}, []);

	const handleClickMetamask = () => {
		window.open("https://metamask.io/download/");
	};
	return [walletAddress, requestAccount, handleClickMetamask];
};

export default useDetectProvider;
