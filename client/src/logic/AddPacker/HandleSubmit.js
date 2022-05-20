import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addPackData(values.batchNo, values.packAddress, values.arrivalDateP, values.packDate, values.packPrice);
};

export default HandleSubmit;
