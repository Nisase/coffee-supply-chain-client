import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import useDetectProvider from './hooks/useDetectProvider';

import { setWalletAddress, setUserData, setMessage, setIsOwer } from './redux/appDataSlice';
import { setCoffeAddress, setUserAddress } from './redux/contractsAddressSlice';

import getUser from './logic/GetUser';
import getOwner from './logic/GetOwner';
import GetFarmForm from './components/GetFarmDetails/GetFarmForm';

function App() {

  const dispatch = useDispatch();

  const [walletAddress, error] = useDetectProvider(true);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);      
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
            
      setLoading(false);
    };
    getUserLocal();
    dispatch(setWalletAddress(walletAddress))

  }, [walletAddress, isOwner]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {useRoutes(routes(loading, (walletAddress !==null && error === null), isOwner))}
    </ThemeProvider>
  );
}

export default App;
