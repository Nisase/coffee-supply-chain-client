import { getCoffeWriter1ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter1ERC20();
  return erc20.addCoffeeSellData(values.batchNo, values.coffeeSellingBatchWeight, values.beanPricePerKilo);
};

export default HandleSubmit;
