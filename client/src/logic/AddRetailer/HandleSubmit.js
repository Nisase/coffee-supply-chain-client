import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = async (values) => {
  const erc20 = await getCoffeWriterERC20();
  await erc20.addRetailerData(
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
