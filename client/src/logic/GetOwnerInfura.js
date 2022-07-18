import React from 'react';
import { infuraGetUserERC20 } from './erc20';

const getOwnerInfura = async () => {
  const erc20User = await infuraGetUserERC20();
  const ownerAddress = await erc20User.owner();
  return ownerAddress;
};

export default getOwnerInfura;
