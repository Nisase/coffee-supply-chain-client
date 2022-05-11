import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addPackData(values.batchNo, values.packAddress, values.arrivalDateP, values.packDate, values.packPrice);
};

export default HandleSubmit;
