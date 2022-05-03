import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import supplychainUserABI from '../../contracts/SupplyChainUser.json';

const SupplyChainUserAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE';

const HandleSubmit = async (values) => {
  // const [userInfo, setUserInfo] = useState({
  //   userAddress: '-',
  //   name: '-',
  //   email: '-',
  //   role: '-',
  //   isActive: false,
  //   profileHash: '-',
  // });

  console.log(values.userAddress);
  console.log(values.name);
  console.log(values.role);
  console.log(values.email);
  console.log(values.isActive);
  console.log(values.profileHash);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const erc20 = new ethers.Contract(SupplyChainUserAddress, supplychainUserABI.abi, signer);

  // setUserInfo({
  //   userAddress: values.userAddress,
  //   name: values.name,
  //   email: values.email,
  //   role: values.role,
  //   isActive: values.isActive,
  //   profileHash: values.profileHash,
  // });

  await erc20.updateUserForAdmin(
    values.userAddress,
    values.name,
    values.email,
    values.role,
    values.isActive,
    values.profileHash
  );
};

export default HandleSubmit;
