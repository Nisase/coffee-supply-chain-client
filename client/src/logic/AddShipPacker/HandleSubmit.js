import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addShipPackerData(values.batchNo, values.transportTypeP, values.pickupDateP, values.shipPriceP);
};

export default HandleSubmit;
