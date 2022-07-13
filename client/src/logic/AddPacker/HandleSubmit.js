import { getCoffeWriter2ERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const erc20 = getCoffeWriter2ERC20();
  return erc20.addPackData(
    values.batchNo,
    values.packerAddress,
    values.packerArrivalDate,
    values.packingDate,
    values.packingPricePerKilo
  );
};

export default HandleSubmit;
