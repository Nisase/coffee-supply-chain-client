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

import HandleSubmit from '../../logic/AddRetailer/HandleSubmit';

const initialValues = {
  batchNo: '',
  arrivalDateW: '',
  arrivalDateSP: '',
  warehouseName: '',
  warehouseAddress: '',
  salePointAddress: '',
  shipPriceSP: '',
  productPrice: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  arrivalDateW: Yup.date().required('Requerido'),
  arrivalDateSP: Yup.date().required('Requerido'),
  warehouseName: Yup.string().required('Requerido'),
  warehouseAddress: Yup.string().required('Requerido'),
  salePointAddress: Yup.string().required('Requerido'),
  shipPriceSP: Yup.number().typeError('Por favor ingrese un número').required('Requerido'),
  productPrice: Yup.number().typeError('Por favor ingrese un número').required('Requerido'),
});

const RetailerForm = () => {
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
      dispatch(addTx({ tx: trans.hash, type: 'DoneRetailer' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneRetailer' }));
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
                        <Typography>AÑADIR DATOS DE RETAILER</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="arrivalDateW" label="Arrival Date at Warehouse" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="arrivalDateSP" label="Arrival Date at Sale Point" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseName" label="Warehouse Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseAddress" label="Warehouse Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="salePointAddress" label="Sale Point Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="shipPriceSP" label="Shipment Price" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="productPrice" label="Product Price" />
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

export default RetailerForm;
