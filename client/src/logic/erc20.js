import { ethers } from 'ethers';
import contractABI from '../contracts/CoffeeSupplyChain.json';

const contractAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';

const getCoffeERC20 = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return(new ethers.Contract(contractAddress, contractABI.abi, signer));
};

export default getCoffeERC20;
