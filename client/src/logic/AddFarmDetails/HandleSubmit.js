import { getCoffeWriterERC20 } from '../erc20'
import { v4 as uuid } from 'uuid';

const HandleSubmit = async (values) => {
  const uniqueID = uuid();
  const erc20 = await getCoffeWriterERC20();
  await erc20.addFarmDetails(
    uniqueID,
    values.farmName,
    values.latitude,
    values.longitude,
    values.farmAddress
  );
};

export default HandleSubmit;
