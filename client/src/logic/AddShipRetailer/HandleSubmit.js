import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addShipRetailerData(values.batchNo, values.transportTypeR, values.pickupDateR, values.shipPriceR);
};

export default HandleSubmit;
