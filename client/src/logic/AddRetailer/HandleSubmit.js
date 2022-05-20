import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriterERC20();
  return erc20.addRetailerData(
    values.batchNo,
    values.arrivalDateW,
    values.arrivalDateSP,
    values.warehouseName,
    values.warehouseAddress,
    values.salePointAddress,
    values.shipPriceSP,
    values.productPrice
  );
};

export default HandleSubmit;
