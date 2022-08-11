import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useDetectProvider from '../hooks/useDetectProvider';
import { setWalletAddress, loadingSelector } from '../redux/appDataSlice';

const LoginMetamask = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const [walletAddress, error, requestAccount] = useDetectProvider();

  const handleClickMetamask = () => {
    window.open('https://metamask.io/download/');
  };

  useEffect(() => {
    if (walletAddress !== null) dispatch(setWalletAddress(walletAddress));
  }, [walletAddress]);
  // Tx pending

  return (
    <div className="flex flex-col justify-center items-center">
      {!walletAddress && (
        <>
          <Typography align="center" variant="h4" gutterBottom>
            Ingrese con su cuenta de Metamask
          </Typography>
          <LoadingButton
            onClick={requestAccount}
            className="metamask-btn"
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            loading={false}
            color="secondary"
            // color="primary"
          >
            Conectar Billetera Metamask
          </LoadingButton>
          <div className="w-full h-1 my-3" />
          <LoadingButton
            onClick={handleClickMetamask}
            className="install-btn"
            // color="secondary"
            color="primary"
            variant="contained"
            type="submit"
            loading={false}
          >
            Instalar Metamask
          </LoadingButton>
        </>
      )}

      {walletAddress && !error && !loading && (
        <>
          <Typography variant="p" className="my-3">
            Dirección de Billetera MetaMask: {walletAddress}
          </Typography>
          <Alert severity="error">
            La dirección de billetera MetaMask con la que se ingresó desde el Metamask no tiene asignado ningun Rol
            hasta el momento.
          </Alert>
        </>
      )}

      {error && (
        <div className="mt-5 text-lg">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default LoginMetamask;
