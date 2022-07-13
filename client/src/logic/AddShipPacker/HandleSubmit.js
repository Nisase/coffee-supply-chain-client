import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addShipPackerData(
    values.batchNo,
    values.toPackerTransportType,
    values.warehousePickupDate,
    values.toPackerShippingPrice
  );
};

export default HandleSubmit;
