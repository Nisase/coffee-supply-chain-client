import { ethers } from "ethers";
import supplychainUserABI from "../contracts/SupplyChainUser.json";

const SupplyChainUserAddress = "0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE";

const getOwner = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const erc20User = new ethers.Contract(
		SupplyChainUserAddress,
		supplychainUserABI.abi,
		provider
	);
	const ownerAddress = await erc20User.owner();
	return ownerAddress
};

export default getOwner;
