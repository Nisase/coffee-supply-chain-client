import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import routes from './routes';

import useDetectProvider from './hooks/useDetectProvider';
import UserAdminListener from './logic/AddUserAdmin/UserAdminListener';

import { setWalletAddress, setUserData, setMessage, setIsOwer } from './redux/appDataSlice';
import { setCoffeAddress, setUserAddress } from './redux/contractsAddressSlice';
import { txListSelector, removeTx} from './redux/txSlice';

import getUser from './logic/GetUser';
import getOwner from './logic/GetOwner';

function App() {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // UserInfo, Wallet and Ower //
  const [walletAddress, error] = useDetectProvider(true);
  const [isOwner, setIsOwner] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);

  useEffect(()=>{
    const userAddress = '0x8c3ADb90d52223eAf8C5BeD5a6D44da08d4b0BaE'
    const coffeAddress = '0xa108A7C2e0417aF523eadFA4Cf628126BEFB0534'
    dispatch(setUserAddress(userAddress))
    dispatch(setCoffeAddress(coffeAddress))
    
    window.userAddress = userAddress;
    window.coffeAddress = coffeAddress;
  })

  useEffect(() => {
    const getUserLocal = async () => {
      setLoadingLocal(true);      
      const user = await getUser();
      const owner = await getOwner();
      setIsOwner(owner === walletAddress);
      dispatch(setIsOwer(isOwner))

      if (user && user.message == null) {
        if(isOwner){
          user.name='Administrador'
          user.role='ADMIN'
          user.email='admincoffe@.epn.edu.ec'
        }
        dispatch(setUserData(user))
      } else dispatch(setMessage(user.message));
            
      setLoadingLocal(false);
    };
    getUserLocal();
    dispatch(setWalletAddress(walletAddress))

  }, [walletAddress, isOwner]);

  // END //


  // Transactions Listeners in APP //
  const txList = useSelector(txListSelector)
  const {userRegistered} = UserAdminListener()
  const txIsContain = (tx, type)=>{
    return txList.some((item )=> item.tx===tx && item.type===type)
  }  
  useEffect(()=>{
    if(userRegistered !== undefined && txIsContain(userRegistered.tx, 'UserUpdate')){
      enqueueSnackbar(`Usuario ${userRegistered.name} agregado correctamente`, { variant: 'success' })
      dispatch(removeTx({tx: userRegistered.tx, type: 'UserUpdate'}))
    }
  }, [userRegistered, txList])
  
  // END //


  return (
    <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        {useRoutes(routes(loadingLocal, (walletAddress !==null && error === null), isOwner))}
    </ThemeProvider>
  );
}

export default App;
