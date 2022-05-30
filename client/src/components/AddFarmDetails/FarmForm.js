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
  farmName: Yup.string().required('Obligatorio'),
  latitude: Yup.string().required('Obligatorio'),
  longitude: Yup.string().required('Obligatorio'),
  farmAddress: Yup.string().required('Obligatorio'),
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
              {({ dirty, isValid }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className="mb-5 font-semibold underline underline-offset-2">
                        INFORMACIÓN DE LA GRANJA
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="farmName" label="Nombre de la Granja" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="latitude" label="Latitud" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="longitude" label="Longitud" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="farmAddress" label="Dirección de la Granja" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
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
