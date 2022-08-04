import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addRetailerData(
    values.batchNo,
    [String(values.warehouseArrivalDate), String(values.salepointArrivalDate)],
    values.warehouseRetailerName,
    values.salepointRetailerName,
    [String(values.warehouseRetailerAddress), String(values.warehouseRetailerLat), String(values.warehouseRetailerLng)],
    [String(values.salepointRetailerAddress), String(values.salepointRetailerLat), String(values.salepointRetailerLng)],
    values.toSalepointTransportType,
    values.toSalepointShippingPrice,
    values.retailerPricePerKilo
  );
};

export default HandleSubmit;
