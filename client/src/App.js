import { useEffect, useState, useLayoutEffect } from 'react';
import { useRoutes, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import routes from './routes';

import useDetectProvider from './hooks/useDetectProvider';

import UserAdminListener from './logic/AddUserAdmin/UserAdminListener';
import UpdateUserListener from './logic/UpdateUser/UpdateUserListener';
import FarmListener from './logic/AddFarmDetails/FarmListener';
import HarvestListener from './logic/AddHarvest/HarvestListener';
import ProcessListener from './logic/AddProcess/ProcessListener';
import TastingListener from './logic/AddTaster/TasterListener';
import CoffeeSellListener from './logic/AddCoffeeSell/CoffeeSellListener';
import WarehouseListener from './logic/AddWarehouse/WarehouseListener';
import ShipPackerListener from './logic/AddShipPacker/ShipPackerListener';
import PackerListener from './logic/AddPacker/PackerListener';
import ShipRetailerListener from './logic/AddShipRetailer/ShipRetailerListener';
import RetailerListener from './logic/AddRetailer/RetailerListener';

import {
  setWalletAddress,
  setLoading,
  setUserData,
  setMessage,
  setIsOwer,
  userDataSelector,
  walletAddressSelector,
  loadingSelector,
} from './redux/appDataSlice';
import { setDirectionData, setLatitudeData, setLongitudeData, setLocReadyToAddData } from './redux/locationDataSlice';
import { setCoffeAddress1, setCoffeAddress2, setUserAddress } from './redux/contractsAddressSlice';
import { txListSelector, removeTx } from './redux/txSlice';

import getUserByAddress from './logic/GetUser';
import getOwner from './logic/GetOwner';

function App() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // UserInfo, Wallet and Owner

  const [walletAddress, error] = useDetectProvider(true);
  const [isOwner, setIsOwner] = useState(false);
  const userData = useSelector(userDataSelector);
  const loading = useSelector(loadingSelector);
  const walletAddressApp = useSelector(walletAddressSelector);
  const [searchParams] = useSearchParams();
  const batch = searchParams.get('batch');

  const getUserLocal = async (walletAddress) => {
    dispatch(setLoading(true));
    const user = await getUserByAddress(walletAddress);
    const owner = await getOwner();
    setIsOwner(owner === walletAddress);
    dispatch(setIsOwer(isOwner));

    if (user && user.message === null) {
      if (isOwner) {
        user.name = 'Administrador';
        user.role = [{ key: 'ADMIN', value: 'Admin User' }];
        user.email = 'admincoffe@.epn.edu.ec';
      }
      if (user.role.length < 1 || user.name === '') {
        dispatch(setUserData(null));
        dispatch(setLoading(false));
        return;
      }
      dispatch(setUserData(user));
      dispatch(setMessage(''));
    } else dispatch(setMessage(user.message));

    dispatch(setLoading(false));
  };

  const setNullUserLocal = () => {
    dispatch(setIsOwer(false));
    dispatch(setUserData(null));
    dispatch(setMessage(''));
  };

  useLayoutEffect(() => {
    // dispatch(setLoading(true));
    // const userAddress = '0xfd6407812e082583E4B9A00A917fae8D0F8D709B';
    // const coffeAddress = '0x5F87cD4E112beb3AF8918Be2Eb232DdEF032f69d';

    // const userAddress = '0x2c1a164D9A0F227f0A752b5F3a9bf852D42f49A5';
    // const coffeAddress1 = '0x1f0c8351e0A36F666d33837Bc1a40370Cde84DeD';
    // const coffeAddress2 = '0x50f5f7623AFB6CA2D04CF9f14B96BE606a0A06Ae';

    const userAddress = '0xe6c3FD72B4d06594772064fEd7eE7320A2a31dFe';
    const coffeAddress1 = '0xd70640453b1746fE938E8a707D2285F690C69FF1';
    const coffeAddress2 = '0xC36350f7F566948CDB016093c77E093267DC0d3F';

    window.userAddress = userAddress;
    window.coffeAddress1 = coffeAddress1;
    window.coffeAddress2 = coffeAddress2;

    // console.log("DISPACH SMART CONTRACT ADDRESS")
    dispatch(setUserAddress(userAddress));
    dispatch(setCoffeAddress1(coffeAddress1));
    dispatch(setCoffeAddress2(coffeAddress2));
  }, []);

  useEffect(() => {
    console.log('DISPACH ERROR ADDRESS');
    console.log(error);
    if (error) {
      // enqueueSnackbar(error, { variant: 'error' });
      // setNullUserLocal();
      dispatch(setLoading(false));
    }
  }, [error]);

  useEffect(() => {
    // console.log("DISPACH USER ADDRESS")
    dispatch(setWalletAddress(walletAddress));
  }, [walletAddress]);

  useLayoutEffect(() => {
    console.log('Wallet Address');
    console.log(walletAddressApp);
    if (walletAddressApp) getUserLocal(walletAddressApp);
    else setNullUserLocal();
  }, [walletAddressApp, isOwner]);

  // END //

  // Transactions Listeners in APP //
  const txList = useSelector(txListSelector);
  const txIsContain = (tx, type) => txList.some((item) => item.tx === tx && item.type === type);

  const { userRegistered } = UserAdminListener();
  useEffect(() => {
    if (userRegistered !== undefined && txIsContain(userRegistered.tx, 'UserUpdate')) {
      enqueueSnackbar(`Usuario ${userRegistered.name} agregado correctamente`, { variant: 'success' });
      dispatch(removeTx({ tx: userRegistered.tx, type: 'UserUpdate' }));
    }
  }, [userRegistered, txList]);

  const { userUpdated } = UpdateUserListener();
  useEffect(() => {
    if (userUpdated !== undefined && txIsContain(userUpdated.tx, 'UserUpdate')) {
      enqueueSnackbar(`Usuario ${userUpdated.name} agregado correctamente`, { variant: 'success' });
      dispatch(removeTx({ tx: userUpdated.tx, type: 'UserUpdate' }));
    }
  }, [userUpdated, txList]);

  const { farmRegistered } = FarmListener();
  useEffect(() => {
    if (farmRegistered !== undefined && txIsContain(farmRegistered.tx, 'SetFarmDetails')) {
      enqueueSnackbar(`Granja agregada y lote de café ${farmRegistered.batchNo} creado correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: farmRegistered.tx, type: 'SetFarmDetails' }));
      dispatch(setDirectionData(''));
      dispatch(setLatitudeData(''));
      dispatch(setLongitudeData(''));
      dispatch(setLocReadyToAddData(false));
    }
  }, [farmRegistered, txList]);

  const { harvestRegistered } = HarvestListener();
  useEffect(() => {
    if (harvestRegistered !== undefined && txIsContain(harvestRegistered.tx, 'DoneHarvesting')) {
      enqueueSnackbar(`Datos de cosecha del lote de café ${harvestRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: harvestRegistered.tx, type: 'DoneHarvesting' }));
    }
  }, [harvestRegistered, txList]);

  const { processRegistered } = ProcessListener();
  useEffect(() => {
    if (processRegistered !== undefined && txIsContain(processRegistered.tx, 'DoneProcessing')) {
      enqueueSnackbar(`Datos de procesamiento del lote de café ${processRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: processRegistered.tx, type: 'DoneProcessing' }));
    }
  }, [processRegistered, txList]);

  const { tastingRegistered } = TastingListener();
  useEffect(() => {
    if (tastingRegistered !== undefined && txIsContain(tastingRegistered.tx, 'DoneTasting')) {
      enqueueSnackbar(
        `Datos de catación correspondientes al lote de café ${tastingRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: tastingRegistered.tx, type: 'DoneTasting' }));
    }
  }, [tastingRegistered, txList]);

  const { coffeeSellerRegistered } = CoffeeSellListener();
  useEffect(() => {
    if (coffeeSellerRegistered !== undefined && txIsContain(coffeeSellerRegistered.tx, 'DoneCoffeeSelling')) {
      enqueueSnackbar(
        `Datos de venta del grano correspondientes al lote de café ${coffeeSellerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: coffeeSellerRegistered.tx, type: 'DoneCoffeeSelling' }));
    }
  }, [coffeeSellerRegistered, txList]);

  const { warehouseRegistered } = WarehouseListener();
  useEffect(() => {
    if (warehouseRegistered !== undefined && txIsContain(warehouseRegistered.tx, 'DoneWarehousing')) {
      enqueueSnackbar(`Datos de bodegaje del lote de café ${warehouseRegistered.batchNo} agregados correctamente`, {
        variant: 'success',
      });
      dispatch(removeTx({ tx: warehouseRegistered.tx, type: 'DoneWarehousing' }));
    }
  }, [warehouseRegistered, txList]);

  const { shipPackerRegistered } = ShipPackerListener();
  useEffect(() => {
    if (shipPackerRegistered !== undefined && txIsContain(shipPackerRegistered.tx, 'DoneShippingPacker')) {
      enqueueSnackbar(
        `Datos de transporte hacia empacador correspondientes al lote de café ${shipPackerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: shipPackerRegistered.tx, type: 'DoneShippingPacker' }));
    }
  }, [shipPackerRegistered, txList]);

  const { packRegistered } = PackerListener();
  useEffect(() => {
    if (packRegistered !== undefined && txIsContain(packRegistered.tx, 'DonePackaging')) {
      enqueueSnackbar(
        `Datos de empacado correspondientes al lote de café ${packRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: packRegistered.tx, type: 'DonePackaging' }));
    }
  }, [packRegistered, txList]);

  const { shipRetailerRegistered } = ShipRetailerListener();
  useEffect(() => {
    if (shipRetailerRegistered !== undefined && txIsContain(shipRetailerRegistered.tx, 'DoneShippingRetailer')) {
      enqueueSnackbar(
        `Datos de transporte hacia el retailer correspondientes al lote de café ${shipRetailerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: shipRetailerRegistered.tx, type: 'DoneShippingRetailer' }));
    }
  }, [shipRetailerRegistered, txList]);

  const { retailerRegistered } = RetailerListener();
  useEffect(() => {
    if (retailerRegistered !== undefined && txIsContain(retailerRegistered.tx, 'DoneRetailer')) {
      enqueueSnackbar(
        `Datos de retailer correspondientes al lote de café ${retailerRegistered.batchNo} agregados correctamente`,
        {
          variant: 'success',
        }
      );
      dispatch(removeTx({ tx: retailerRegistered.tx, type: 'DoneRetailer' }));
    }
  }, [retailerRegistered, txList]);

  const getValidUserss = (userData) => {
    if (!userData || userData.role.length < 1) return null;
    return userData;
  };

  // END //

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {useRoutes(routes(loading, userData, isOwner, batch))}
    </ThemeProvider>
  );
}

export default App;
