import { ethers } from "ethers";
import supplychainUserABI from "../contracts/SupplyChainUser.json";

const SupplyChainUserAddress = "0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE";

const getUser = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const account = await window.ethereum.request({
		method: "eth_requestAccounts",
	});
	const signer = provider.getSigner();
	const erc20 = new ethers.Contract(
		SupplyChainUserAddress,
		supplychainUserABI.abi,
		signer
	);

	try {
		const userTemp = await erc20.callStatic.getUser(account[0]);
		return({
			// userAddress: user["userAddress"],
			name: userTemp.name,
			email: userTemp.email,
			role: userTemp.role,
			isActive: userTemp.isActive,
			// profileHash: userTemp.profileHash,
			profileHash: "/static/mock-images/avatars/avatar_default.jpg",
			message: null
		})
	} catch (error) {
		return({message: error})
	}
};

export default getUser;