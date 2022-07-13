import {getUserERC20} from './erc20'

const getOwner = async () => {
	const erc20User = await getUserERC20()
	const ownerAddress = await erc20User.owner();
	return ownerAddress
};

export default getOwner;
