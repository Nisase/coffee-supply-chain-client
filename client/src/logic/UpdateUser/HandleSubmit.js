import { getUserWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getUserWriterERC20();
  await erc20.updateUser(values.name, values.email, values.role, values.isActive, values.profileHash);
};

export default HandleSubmit;
