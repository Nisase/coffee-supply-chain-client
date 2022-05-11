import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addGrainData(values.batchNo, values.tasteScore, values.grainPrice);
};

export default HandleSubmit;
