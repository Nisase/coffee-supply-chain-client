import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePickerMobile from '../FormsUI/MobileDateTimePicker.js';
import DateTimePicker from '../FormsUI/DateTimePicker';
import PendingConfirmation from '../PendingConfirmation';
import MapsLocation from '../Maps/MapsLocation';
import MapsLocationSec from '../Maps/MapsLocationSec';
import {
  directionDataSelector,
  latitudeDataSelector,
  longitudeDataSelector,
  locReadyToAddDataSelector,
  setDirectionData,
  setLatitudeData,
  setLongitudeData,
  setLocReadyToAddData,
} from '../../redux/locationDataSlice';

import {
  directionDataSecSelector,
  latitudeDataSecSelector,
  longitudeDataSecSelector,
  locReadyToAddDataSecSelector,
  setDirectionDataSec,
  setLatitudeDataSec,
  setLongitudeDataSec,
  setLocReadyToAddDataSec,
} from '../../redux/locationDataSecSlice';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddRetailer/HandleSubmit';
import transportTypeP from '../../data/transportTypeP.json';

const initialValues = {
  batchNo: '',
  warehouseArrivalDate: '',
  salepointArrivalDate: '',
  warehouseRetailerName: '',
  salepointRetailerName: '',
  warehouseRetailerAddress: '',
  salepointRetailerAddress: '',
  toSalepointTransportType: '',
  toSalepointShippingPrice: '',
  retailerPricePerKilo: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  warehouseArrivalDate: Yup.date().required('Obligatorio'),
  salepointArrivalDate: Yup.date().required('Obligatorio'),
  warehouseRetailerName: Yup.string().required('Obligatorio'),
  salepointRetailerName: Yup.string().required('Obligatorio'),
  warehouseRetailerAddress: Yup.string().required('Obligatorio'),
  salepointRetailerAddress: Yup.string().required('Obligatorio'),
  toSalepointTransportType: Yup.string().required('Obligatorio'),
  toSalepointShippingPrice: Yup.string().required('Obligatorio'),
  // Yup.number().typeError('Por favor ingrese un número').required('Obligatorio'),
  retailerPricePerKilo: Yup.string().required('Obligatorio'),
  // Yup.number().typeError('Por favor ingrese un número').required('Obligatorio'),
});

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

const RetailerForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');
  const [openMap, setOpenMap] = useState(false);
  const [openMapSec, setOpenMapSec] = useState(false);
  const formikRef = useRef();

  const dispatch = useDispatch();

  const directionData = String(useSelector(directionDataSelector));
  const latitudeData = String(useSelector(latitudeDataSelector));
  const longitudeData = String(useSelector(longitudeDataSelector));
  const locReadyToAddData = useSelector(locReadyToAddDataSelector);

  const directionDataSec = String(useSelector(directionDataSecSelector));
  const latitudeDataSec = String(useSelector(latitudeDataSecSelector));
  const longitudeDataSec = String(useSelector(longitudeDataSecSelector));
  const locReadyToAddDataSec = useSelector(locReadyToAddDataSecSelector);

  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'DoneRetailer' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneRetailer' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
    });
  };

  const handleClickOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleClickOpenMapSec = () => {
    setOpenMapSec(true);
  };
  const handleCloseMapSec = () => {
    setOpenMapSec(false);
  };

  useEffect(() => {
    if (props.batchValue) {
      formikRef.current.setFieldValue('batchNo', props.batchValue);
    }

    if (locReadyToAddData) {
      formikRef.current.setFieldValue('warehouseRetailerAddress', directionData);
    } else {
      formikRef.current.setFieldValue('warehouseRetailerAddress', '');
    }

    if (locReadyToAddDataSec) {
      formikRef.current.setFieldValue('salepointRetailerAddress', directionDataSec);
    } else {
      formikRef.current.setFieldValue('salepointRetailerAddress', '');
    }
  }, [
    props.batchValue,
    latitudeData,
    longitudeData,
    directionData,
    latitudeDataSec,
    longitudeDataSec,
    directionDataSec,
  ]);

  const handleResetForm = (resetForm) => {
    // if (window.confirm('¿Está seguro que desea resetear las entradas de su formulario?')) {
    resetForm();
    dispatch(setDirectionData(''));
    dispatch(setLatitudeData(''));
    dispatch(setLongitudeData(''));
    dispatch(setLocReadyToAddData(false));
    dispatch(setDirectionDataSec(''));
    dispatch(setLatitudeDataSec(''));
    dispatch(setLongitudeDataSec(''));
    dispatch(setLocReadyToAddDataSec(false));
    // }
  };

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              enableReinitialize
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid, resetForm }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      {props.batchValue ? (
                        <Grid item xs={12}>
                          <TextfieldWrapper name="batchNo" label="No. Lote" disabled />
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <TextfieldWrapper name="batchNo" label="No. Lote" />
                        </Grid>
                      )}

                      <Grid item xs={6}>
                        <DateTimePickerMobile name="warehouseArrivalDate" label="Fecha de Llegada al Almacén" />
                        {/* <DateTimePicker name="warehouseArrivalDate" label="Fecha de Llegada al Almacén" /> */}
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePickerMobile name="salepointArrivalDate" label="Fecha de Llegada al Punto de Venta" />
                        {/* <DateTimePicker name="salepointArrivalDate" label="Fecha de Llegada al Punto de Venta" /> */}
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseRetailerName" label="Nombre del Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="salepointRetailerName" label="Nombre del Punto de Venta" />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{
                          marginBottom: 2,
                          marginLeft: 0,
                          paddingLeft: 0,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'grey.600',
                          }}
                        >
                          Ubicación del Almacén y del Punto de Venta
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sx={{ marginBottom: 3 }}>
                        <Button
                          size="small"
                          color="secondary"
                          // color="comp5"
                          variant="contained"
                          startIcon={<AddLocationAltIcon />}
                          onClick={handleClickOpenMap}
                          sx={{ boxShadow: 2 }}
                        >
                          Buscar en Mapa
                        </Button>
                        <BootstrapDialog
                          aria-labelledby="customized-dialog-title"
                          open={openMap}
                          PaperProps={{ sx: { width: '100%', height: '100%' } }}
                        >
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseMap}>
                            Ubica el marcador en la dirección deseada
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <MapsLocation svg="/static/illustrations/Farm.svg" />
                          </DialogContent>
                        </BootstrapDialog>
                      </Grid>

                      {locReadyToAddData ? (
                        <Grid item xs={12}>
                          <TextfieldWrapper name="warehouseRetailerAddress" label="Dirección del Almacén" disabled />
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <TextfieldWrapper name="warehouseRetailerAddress" label="Dirección del Almacén" />
                        </Grid>
                      )}

                      <Grid item xs={6} sx={{ marginBottom: 3 }}>
                        <Button
                          size="small"
                          color="secondary"
                          // color="comp5"
                          variant="contained"
                          startIcon={<AddLocationAltIcon />}
                          onClick={handleClickOpenMapSec}
                          sx={{ boxShadow: 2 }}
                        >
                          Buscar en Mapa
                        </Button>
                        <BootstrapDialog
                          aria-labelledby="customized-dialog-title"
                          open={openMapSec}
                          PaperProps={{ sx: { width: '100%', height: '100%' } }}
                        >
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseMapSec}>
                            Ubica el marcador en la dirección deseada
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <MapsLocationSec svg="/static/illustrations/Farm.svg" />
                          </DialogContent>
                        </BootstrapDialog>
                      </Grid>

                      {locReadyToAddDataSec ? (
                        <Grid item xs={12}>
                          <TextfieldWrapper
                            name="salepointRetailerAddress"
                            label="Dirección del Punto de Venta"
                            disabled
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <TextfieldWrapper name="salepointRetailerAddress" label="Dirección del Punto de Venta" />
                        </Grid>
                      )}

                      <Grid item xs={6}>
                        <SelectWrapper
                          name="toSalepointTransportType"
                          label="Tipo de Transporte"
                          options={transportTypeP}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper
                          name="toSalepointShippingPrice"
                          label="Precio de Transporte del Almacén al Punto de Venta [$]"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper
                          name="retailerPricePerKilo"
                          label="Precio por Kilo del Producto en el Retailer [$]"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          AGREGAR DATOS
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          //  disabled={dirty || isValid}
                          type="reset"
                          onClick={() => {
                            handleResetForm(resetForm);
                          }}
                        >
                          {' '}
                          RESETEAR FORMULARIO
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default RetailerForm;
