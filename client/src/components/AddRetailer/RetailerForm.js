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
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  arrivalDateW: Yup.date().required('Obligatorio'),
  arrivalDateSP: Yup.date().required('Obligatorio'),
  warehouseName: Yup.string().required('Obligatorio'),
  warehouseAddress: Yup.string().required('Obligatorio'),
  salePointAddress: Yup.string().required('Obligatorio'),
  shipPriceSP: Yup.number().typeError('Por favor ingrese un número').required('Obligatorio'),
  productPrice: Yup.number().typeError('Por favor ingrese un número').required('Obligatorio'),
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
                        <Typography className="mb-5 font-semibold underline underline-offset-2">
                          DATOS DEL RETAILER
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="No. Lote" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="arrivalDateW" label="Fecha de Llegada al Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="arrivalDateSP" label="Fecha de Llegada al Punto de Venta" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseName" label="Nombre del Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseAddress" label="Dirección Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="salePointAddress" label="Dirección Punto de Venta" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="shipPriceSP" label="Precio de Transporte" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="productPrice" label="Precio del Producto Final" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          AGREGAR DATOS
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
