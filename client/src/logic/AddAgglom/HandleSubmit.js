import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addAgglomData(values.batchNo, values.agglomAddress, values.agglomDate, values.storagePrice);
};

export default HandleSubmit;
