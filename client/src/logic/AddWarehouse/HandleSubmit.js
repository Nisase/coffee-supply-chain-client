import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addWarehousingData(
    values.batchNo,
    values.warehouseAddress,
    [String(values.warehouseLat), String(values.warehouseLng)],
    String(values.warehouseArrivalDate),
    values.storagePricePerKiloPerTime
  );
};

export default HandleSubmit;
