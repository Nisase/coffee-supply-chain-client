import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addShipRetailerData(
    values.batchNo,
    values.toRetailerTransportType,
    String(values.packerPickupDateTime),
    values.toReatilerShippingPrice
  );
};

export default HandleSubmit;
