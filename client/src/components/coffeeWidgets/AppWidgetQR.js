import React, { useState, useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import {
  Grid,
  Container,
  Typography,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Fab,
  IconButton,
  Box,
  Stack,
  Badge,
  Chip,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
} from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { chipClasses } from '@mui/material/Chip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
  TelegramIcon,
} from 'react-share';
import { v4 as uuid } from 'uuid';
import { saveSvgAsPng } from 'save-svg-as-png';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import { GetApp } from '@mui/icons-material';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import RunningWithErrorsRoundedIcon from '@mui/icons-material/RunningWithErrorsRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { walletAddressSelector, userDataSelector } from '../../redux/appDataSlice';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import HarvestForm from '../AddHarvest/HarvestForm';
import UpdateUserForm from '../UpdateUser/UpdateUserForm';
import {
  setUrlExternal,
  setBatchNoExternal,
  setNextActionExternal,
  setMessageExternal,
  setReadyToAddExternal,
  urlExternalSelector,
  batchNoExternalSelector,
  nextActionExternalSelector,
  readyToAddExternalSelector,
  messageExternalSelector,
} from '../../redux/batchExternalDataSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AppWidgetQR({
  title,
  innerButtonText,
  innerDialogText,
  altImg,
  image,
  buttonText,
  dialogTitle,
  Form,
  color = 'quaternary',
  sx,
  ...other
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [openLectorQR, setOpenLectorQR] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const [stateLectorQR, setStateLectorQR] = useState(false);
  const [dataQR, setDataQR] = useState('');
  const [batchNew, setBatchNew] = useState('');
  const [nextActionNew, setNextActionNew] = useState('');

  const walletAddress = useSelector(walletAddressSelector);
  const userData = useSelector(userDataSelector);
  const urlQR = useSelector(urlExternalSelector);
  const batchNoQR = useSelector(batchNoExternalSelector);
  const nextAction = useSelector(nextActionExternalSelector);
  const messageQR = useSelector(messageExternalSelector);
  const readyToAdd = useSelector(readyToAddExternalSelector);

  const handleClickOpenBatch = () => {
    setOpenBatch(true);
  };
  const handleCloseBatch = () => {
    setOpenBatch(false);
    dispatch(setUrlExternal(''));
    dispatch(setBatchNoExternal(''));
    dispatch(setNextActionExternal(''));
    dispatch(setMessageExternal(''));
    dispatch(setReadyToAddExternal(false));
  };
  const handleClickOpenLectorQR = () => {
    setOpenLectorQR(true);
  };
  const handleCloseLectorQR = () => {
    setDataQR('');
    setStateLectorQR(false);
    setOpenLectorQR(false);
    dispatch(setUrlExternal(''));
    dispatch(setBatchNoExternal(''));
    dispatch(setNextActionExternal(''));
    dispatch(setMessageExternal(''));
    dispatch(setReadyToAddExternal(false));
  };

  const handleAddQR = () => {
    console.log('redux 0:', urlQR);
    console.log('redux 1: ', batchNoQR);
    console.log('redux 2: ', nextAction);
    console.log('redux 3: ', messageQR);
    console.log('redux 4: ', readyToAdd);
    enqueueSnackbar(messageQR);
    if (readyToAdd) {
      setOpenBatch(true);
      setStateLectorQR(false);
      setDataQR('');
      setBatchNew('');
      setNextActionNew('');
    }
  };

  const getNextAction = async (batchNoUrl) => {
    let str;
    let res;

    dispatch(
      setMessageExternal(`La url ${batchNoUrl} no contiene un número de lote correcto. Ingrese un código QR válido.`)
    );

    if (batchNoUrl.includes('?batch=0x')) {
      str = batchNoUrl.split('?batch=');
      res = await AskNextAction({ batchNo: str[1] });
      if (str[1].length === 42) {
        console.log('42');
        console.log('res.data', res.data);
        console.log('usedata.role', userData.role);
        if (res.data === userData.role) {
          setBatchNew(str[1]);
          setNextActionNew(res.data);
          dispatch(setMessageExternal(`Código QR válido. Proceda a agregar información de cosecha.`));
          dispatch(setReadyToAddExternal(true));
          dispatch(setBatchNoExternal(str[1]));
          dispatch(setUrlExternal(batchNoUrl));
          dispatch(setNextActionExternal(res.data));
          // enqueueSnackbar(messageQR, { variant: 'success' });
          console.log('HOOA');
        }
      }
    }
    // enqueueSnackbar(messageQR,  { variant: 'error' });
    messageShow();
  };

  const messageShow = () => {
    if (readyToAdd) {
      enqueueSnackbar(messageQR, { variant: 'success' });
    } else {
      enqueueSnackbar(messageQR, { variant: 'error' });
    }
    // enqueueSnackbar(messageQR);
    console.log('redux 0:', urlQR);
    console.log('redux 1: ', batchNoQR);
    console.log('redux 2: ', nextAction);
    console.log('redux 3: ', messageQR);
    console.log('redux 4: ', readyToAdd);
  };

  return (
    <>
      <Card
        sx={{
          py: 0,
          boxShadow: 2,
          color: (theme) => theme.palette[color].darker,

          ...sx,
        }}
        {...other}
      >
        <CardMedia component="img" height="194" alt={altImg} image={image} />

        <CardActions>
          {' '}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            onClick={handleClickOpenLectorQR}
            sx={{
              color: (theme) => theme.palette.error.darker,
            }}
          >
            {buttonText}
          </Button>
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={openLectorQR}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseLectorQR}>
              {dialogTitle}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item>
                  <QrReader
                    onResult={(result, error) => {
                      if (result) {
                        setDataQR(result?.text);
                        setStateLectorQR(true);
                        getNextAction(result?.text);
                      }
                    }}
                    style={{ width: '100%' }}
                    containerStyle={{
                      marginTop: '0px',
                      paddingTop: '0px',
                      width: '500px',
                    }}
                  />
                </Grid>
                {stateLectorQR ? (
                  <Grid item>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: 14 }}
                      // color="text.secondary"
                    >
                      Su código es:{' '}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                      {dataQR}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                      {'hola'}
                      <br />
                      {urlQR}
                      <br />
                      {batchNoQR}
                      <br />
                      {nextAction}
                      <br />
                      {messageQR}
                      <br />
                      {readyToAdd ? 'true' : 'false'}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item sx={{ paddingTop: '0px', marginTop: '0px' }}>
                    <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                      Coloque su código QR frente a la cámara.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button disabled={!readyToAdd} autoFocus onClick={handleAddQR} startIcon={<AddCircleRoundedIcon />}>
                {innerButtonText}
              </Button>
              <BootstrapDialog aria-labelledby="customized-dialog-title" open={openBatch}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseBatch}>
                  {innerDialogText}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Form batchValue={batchNoQR} />
                </DialogContent>
              </BootstrapDialog>
            </DialogActions>
          </BootstrapDialog>
        </CardActions>
      </Card>
    </>
  );
}

// export default AppWidgetQR;
