import { useState, useEffect } from "react";
import { utils } from "ethers";

const useDetectProvider = (callRequestAccount=false) => {
	const [walletAddress, setWalletAddress] = useState(null);
	const [error, setError] = useState(null);

	const requestAccount = async () => {
		console.log("Requesting account...");
		setError(null);
		if (typeof window.ethereum !== "undefined") {
			// console.log("detected...");
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				setWalletAddress(utils.getAddress(accounts[0]));
			} catch (error) {
				setError(error.message);
				setWalletAddress(null);
			}
		} else {
			setError("Metamask no detectado");
		}
	};
	useEffect(() => {
		if(callRequestAccount) requestAccount();
		const chainChangedHandler = () => {
			window.location.reload();
		};
		if (typeof window.ethereum !== "undefined") {
			window.ethereum.on("accountsChanged", requestAccount);
			window.ethereum.on("chainChanged", chainChangedHandler);
		}
		
		return () => {
			if (typeof window.ethereum !== "undefined") {
				window.removeEventListener("accountsChanged", requestAccount);
				window.removeEventListener("chainChanged", chainChangedHandler);
			}
		};
	}, []);
	return [walletAddress, error, requestAccount];
};

export default useDetectProvider;
