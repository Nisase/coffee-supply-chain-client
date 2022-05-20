import { getUserWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getUserWriterERC20();
  return erc20.updateUser(values.name, values.email, values.role, values.isActive, values.profileHash);
};

export default HandleSubmit;
