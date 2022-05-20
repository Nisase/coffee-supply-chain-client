import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddProcess/HandleSubmit';
import typeDrying from '../../data/typeDrying.json';
import typeRoasting from '../../data/typeRoasting.json';

const initialValues = {
  batchNo: '',
  procAddress: '',
  typeOfDrying: '',
  roastImageHash: '',
  roastTemp: '',
  typeOfRoast: '',
  roastDate: '',
  millDate: '',
  processorPrice: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  procAddress: Yup.string().required('Requerido'),
  typeOfDrying: Yup.string().required('Requerido'),
  roastImageHash: Yup.string().required('Requerido'),
  roastTemp: Yup.string().required('Requerido'),
  typeOfRoast: Yup.string().required('Requerido'),
  roastDate: Yup.date().required('Requerido'),
  millDate: Yup.date().required('Requerido'),
  processorPrice: Yup.number().typeError('Por favor ingrese un número').required('Requerido'),
});

const ProcessForm = () => {
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
      dispatch(addTx({ tx: trans.hash, type: 'DoneProcessing' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneProcessing' }));
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
                loadHandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>AÑADIR DATOS DE PROCESAMIENTO</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="procAddress" label="Processor Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="typeOfDrying" label="Type Of Drying" options={typeDrying} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="roastImageHash" label="Roasting Image Hash" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="roastTemp" label="Roasting Temperature" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="typeOfRoast" label="Type Of Roasting" options={typeRoasting} />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="roastDate" label="Roast Date" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="millDate" label="Mill Date" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="processorPrice" label="Processor Price" />
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

export default ProcessForm;
