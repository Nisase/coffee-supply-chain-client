import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addShipRetailerData(values.batchNo, values.transportTypeR, values.pickupDateR, values.shipPriceR);
};

export default HandleSubmit;
