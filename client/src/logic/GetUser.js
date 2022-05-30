import { getUserERC20 } from './erc20';

const getUser = async () => {
  const account = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return getUserByAddress(account[0])
};

export const getUserByAddress = async (address) => {
  try {
    const erc20 = getUserERC20();
    const userTemp = await erc20.callStatic.getUser(address);
    return {
      // userAddress: user["userAddress"],
      name: userTemp.name,
      email: userTemp.email,
      role: userTemp.role,
      isActive: userTemp.isActive,
      // profileHash: userTemp.profileHash,
      profileHash: '/static/mock-images/avatars/avatar_default.jpg',
      message: null,
    };
  } catch (error) {
    return { message: error };
  }
};

export default getUser;