import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import supplychainUserABI from '../../contracts/SupplyChainUser.json';

const SupplyChainUserAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE';
const HandleSubmit = async (values) => {
  console.log(values);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const erc20 = new ethers.Contract(SupplyChainUserAddress, supplychainUserABI.abi, signer);
  await erc20.updateUser(values.name, values.email, values.role, values.isActive, values.profileHash);
};

export default HandleSubmit;
