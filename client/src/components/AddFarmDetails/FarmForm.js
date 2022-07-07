import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
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
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TextfieldWrapper from '../FormsUI/Textfield';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddFarmDetails/HandleSubmit';

const initialValues = {
  registrationNo: '',
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

  const dispatch = useDispatch();

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

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextfieldWrapper
                        sx={{
                          boxShadow: 0,
                          paddingBottom: 0,
                        }}
                        name="farmName"
                        label="Nombre de la Granja"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Card
                        sx={{
                          boxShadow: 3,
                        }}
                      >
                        <CardHeader
                          title="Información sobre Ubicación de la Granja"
                          sx={{
                            color: 'grey.700',
                          }}
                          // className="mb-3 font-semibold"
                        />
                        <CardContent>
                          <Grid item xs={12}>
                            <TextfieldWrapper
                              name="farmAddress"
                              label="Dirección de la Granja"
                              sx={{
                                boxShadow: 0,
                                paddingBottom: 2,
                                borderRadius: '0%',
                                borderBottom: 'none',
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
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
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Button size="small" color="quaternary" startIcon={<MyLocationIcon />} variant="contained">
                            Obtener mi ubicación actual
                          </Button>
                          <Button
                            size="small"
                            color="quaternary"
                            variant="contained"
                            startIcon={<AddLocationAltIcon />}
                          >
                            Buscar ubicación en el mapa
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={!dirty || !isValid}
                        type="submit"
                        color="secondary"
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
