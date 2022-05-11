import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addAgglomData(values.batchNo, values.agglomAddress, values.agglomDate, values.storagePrice);
};

export default HandleSubmit;
