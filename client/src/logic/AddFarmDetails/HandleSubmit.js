import { v4 as uuid } from 'uuid';
import { getCoffeWriterERC20 } from '../erc20';

const HandleSubmit = (values) => {
  const uniqueID = uuid();
  const erc20 = getCoffeWriterERC20();
  return erc20.addFarmDetails(uniqueID, values.farmName, values.latitude, values.longitude, values.farmAddress);
};

export default HandleSubmit;
