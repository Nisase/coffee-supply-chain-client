import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addGrainData(values.batchNo, values.tasteScore, values.grainPrice);
};

export default HandleSubmit;
