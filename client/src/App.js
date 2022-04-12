import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import supplychainStorageABI from "./contracts/SupplyChainStorage.json";
import supplychainUserABI from "./contracts/SupplyChainUser.json";
import coffeeSupplychainABI from "./contracts/CoffeeSupplyChain.json";
import DetectProvider from "./logic/detectProvider";
import DetectMetamask from "./logic/detectMetamask";

const CoffeeSupplyChainAddress = "0xB103004b86BC26dCB6eB0e87C5B9877929d68298";
const SupplyChainUserAddress = "0x9719E9dC77A7eDD3825844c77a68c896d4a7BB2b";

function App() {
	// const [account, setAccount] = useState("");

	// const initializeProviderCoffee = async () => {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const signer = provider.getSigner();
	// 	return new ethers.Contract(
	// 		CoffeeSupplyChainAddress,
	// 		coffeeSupplychainABI.abi,
	// 		signer
	// 	);
	// };

	// const initializeProviderUser = async () => {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const signer = provider.getSigner();
	// 	return new ethers.Contract(
	// 		SupplyChainUserAddress,
	// 		supplychainUserABI.abi,
	// 		signer
	// 	);
	// };

	// const requestAccount = async () => {
	// 	const acc = await window.ethereum.request({
	// 		method: "eth_requestAccounts",
	// 	});
	// 	console.log(acc);
	// 	// return acc;
	// 	setAccount(acc);
	// };

	// useEffect(() => {
	// 	requestAccount();
	// 	// setAccount(account);
	// 	console.log("me re renderice!!!");
	// }, []);

	return (
		<div>
			<DetectMetamask />
		</div>
	);
}

export default App;
