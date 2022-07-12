import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addRetailerData(
    values.batchNo,
    [values.warehouseArrivalDate, values.salepointArrivalDate],
    values.warehouseRetailerName,
    values.salepointRetailerName,
    values.warehouseRetailerAddress,
    values.salepointRetailerAddress,
    values.toSalepointTransportType,
    values.toSalepointShippingPrice,
    values.retailerPricePerKilo
  );
};

export default HandleSubmit;
