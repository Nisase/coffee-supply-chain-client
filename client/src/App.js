import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import useDetectProvider from './hooks/useDetectProvider';

//----
import UserAdminForm from './components/AddUserAdmin/UserAdminForm';
import UserAdminListener from './logic/AddUserAdmin/UserAdminListener';

import UpdateUserForm from './components/UpdateUser/UpdateUserForm';
import UpdateUserListener from './logic/UpdateUser/UpdateUserListener';

import FarmForm from './components/AddFarmDetails/FarmForm';
import FarmListener from './logic/AddFarmDetails/FarmListener';

import HarvestForm from './components/AddHarvest/HarvestForm';
import HarvestListener from './logic/AddHarvest/HarvestListener';

import ProcessForm from './components/AddProcess/ProcessForm';
import ProcessListener from './logic/AddProcess/ProcessListener';

import GrainInspectionForm from './components/AddGrainInspection/GrainInspectionForm';
import GrainInspectionListener from './logic/AddGrainInspection/GrainInspectionListener';

import AgglomForm from './components/AddAgglom/AgglomForm';
import AgglomListener from './logic/AddAgglom/AgglomListener';

import ShipPackerForm from './components/AddShipPacker/ShipPackerForm';
import ShipPackerListener from './logic/AddShipPacker/ShipPackerListener';

import PackerForm from './components/AddPacker/PackerForm';
import PackerListener from './logic/AddPacker/PackerListener';

import ShipRetailerForm from './components/AddShipRetailer/ShipRetailerForm';
import ShipRetailerListener from './logic/AddShipRetailer/ShipRetailerListener';

import RetailerForm from './components/AddRetailer/RetailerForm';
import RetailerListener from './logic/AddRetailer/RetailerListener';

import getUser from './logic/GetUser';
import getOwner from './logic/GetOwner';

import supplychainStorageABI from './contracts/SupplyChainStorage.json';
import supplychainUserABI from './contracts/SupplyChainUser.json';
import coffeeSupplychainABI from './contracts/CoffeeSupplyChain.json';

// https://rinkeby.etherscan.io/address/0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE#code
// https://rinkeby.etherscan.io/address/0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534#code
// https://rinkeby.etherscan.io/address/0xAc1EE96Db837cA6FB6447772B5Adb6B98BD479e0#code
const CoffeeSupplyChainAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534';
const SupplyChainUserAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE';

function App() {
  const [walletAddress, error] = useDetectProvider(true);
  const [userInfo, setUserInfo] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getUserLocal = async () => {
      setLoading(true);

      const user = await getUser();
      if (user && user.message == null) {
        setUserInfo(user);
      } else setMessage(user.message);

      const owner = await getOwner();
      setIsOwner(owner === walletAddress);
      setLoading(false);
    };
    getUserLocal();
  }, [walletAddress, isOwner]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {useRoutes(routes(loading, walletAddress, error, userInfo, isOwner, message))}
      <UserAdminListener />
      <UserAdminForm />
      <UpdateUserListener />
      <UpdateUserForm />
      <FarmListener />
      <FarmForm />
      <HarvestListener />
      <HarvestForm />
      <ProcessListener />
      <ProcessForm />
      <GrainInspectionListener />
      <GrainInspectionForm />
      <AgglomListener />
      <AgglomForm />
      <ShipPackerListener />
      <ShipPackerForm />
      <PackerListener />
      <PackerForm />
      <ShipRetailerListener />
      <ShipRetailerForm />
      <RetailerListener />
      <RetailerForm />
    </ThemeProvider>
  );
}

export default App;
