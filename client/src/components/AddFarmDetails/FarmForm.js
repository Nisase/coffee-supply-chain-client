import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
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
  // registrationNo: Yup.string().required('Requerido'),
  farmName: Yup.string().required('Requerido'),
  latitude: Yup.string().required('Requerido'),
  longitude: Yup.string().required('Requerido'),
  farmAddress: Yup.string().required('Requerido'),
});

const FarmForm = () => {
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
              {({ dirty, isValid }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>AÑADIR INFORMACIÓN DE LA GRANJA</Typography>
                      </Grid>
                      {/* <Grid item xs={6}>
                                    <TextfieldWrapper name="registrationNo" label="Registration No" />
                            </Grid> */}
                      <Grid item xs={6}>
                        <TextfieldWrapper name="farmName" label="Farm Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="latitude" label="Latitude" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="longitude" label="Longitude" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="farmAddress" label="Farm Address" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          SUBMIT
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

export default FarmForm;
