import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useTheme, styled } from '@mui/material/styles';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CloseIcon from '@mui/icons-material/Close';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TextfieldWrapper from '../FormsUI/Textfield';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddFarmDetails/HandleSubmit';

import MapsLocation from '../Maps/MapsLocation';
import {
  directionDataSelector,
  latitudeDataSelector,
  longitudeDataSelector,
  locReadyToAddDataSelector,
} from '../../redux/locationDataSlice';

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

const initialValues = {
  farmName: '',
  latitude: '',
  longitude: '',
  farmAddress: '',
};

const valSchema = Yup.object().shape({
  farmName: Yup.string().required('Obligatorio'),
  latitude: Yup.string().required('Obligatorio'),
  longitude: Yup.string().required('Obligatorio'),
  farmAddress: Yup.string().required('Obligatorio'),
});

const FarmForm = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');

  const [openMap, setOpenMap] = useState(false);
  const formikRef = useRef();

  const dispatch = useDispatch();

  const directionData = String(useSelector(directionDataSelector));
  const latitudeData = String(useSelector(latitudeDataSelector));
  const longitudeData = String(useSelector(longitudeDataSelector));
  const locReadyToAddData = useSelector(locReadyToAddDataSelector);

  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'SetFarmDetails' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'SetFarmDetails' }));
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

  useEffect(() => {
    if (locReadyToAddData) {
      formikRef.current.setFieldValue('latitude', latitudeData);
      formikRef.current.setFieldValue('longitude', longitudeData);
      formikRef.current.setFieldValue('farmAddress', directionData);
      console.log('formik ref: ', formikRef.current);
      console.log('AQUI 1');
    } else {
      formikRef.current.setFieldValue('farmName', '');
      formikRef.current.setFieldValue('latitude', '');
      formikRef.current.setFieldValue('longitude', '');
      formikRef.current.setFieldValue('farmAddress', '');
      console.log('AQUI 2');
    }

    console.log('latitude: ', latitudeData);
    console.log('latitude type: ', typeof latitudeData);
    console.log('long:', longitudeData);
  }, [latitudeData, longitudeData, directionData]);

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                      <Container>
                        <Grid item xs={12} sx={{ marginBottom: 2 }}>
                          <TextfieldWrapper
                            sx={{
                              boxShadow: 0,
                              paddingBottom: 0,
                            }}
                            name="farmName"
                            label="Nombre de la Granja"
                          />
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
                            Ubicación de la Granja
                          </Typography>
                        </Grid>

                        <Grid item sx={{ marginBottom: 3 }}>
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
                            <TextfieldWrapper
                              name="farmAddress"
                              label="Dirección de la Granja"
                              disabled
                              sx={{
                                boxShadow: 0,
                                borderRadius: '0%',
                                borderBottom: 'none',
                                marginBottom: 2,
                              }}
                            />
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <TextfieldWrapper
                              name="farmAddress"
                              label="Dirección de la Granja"
                              sx={{
                                boxShadow: 0,
                                borderRadius: '0%',
                                borderBottom: 'none',
                                marginBottom: 2,
                              }}
                            />
                          </Grid>
                        )}

                        {locReadyToAddData ? (
                          <Grid item xs={12} sx={{ marginBottom: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextfieldWrapper
                                  name="latitude"
                                  label="Latitud"
                                  disabled
                                  sx={{
                                    boxShadow: 0,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                {' '}
                                <TextfieldWrapper
                                  name="longitude"
                                  label="Longitud"
                                  disabled
                                  sx={{
                                    boxShadow: 0,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid item xs={12} sx={{ marginBottom: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextfieldWrapper
                                  name="latitude"
                                  label="Latitud"
                                  sx={{
                                    boxShadow: 0,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                {' '}
                                <TextfieldWrapper
                                  name="longitude"
                                  label="Longitud"
                                  sx={{
                                    boxShadow: 0,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Container>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Typography>dirty: {dirty}</Typography>
                      <Typography>dirty: {isValid}</Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={!dirty || !isValid}
                        type="submit"
                        color="secondary"
                        sx={{ marginBottom: 2, boxShadow: 2 }}
                      >
                        {' '}
                        REGISTRAR GRANJA
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default FarmForm;
