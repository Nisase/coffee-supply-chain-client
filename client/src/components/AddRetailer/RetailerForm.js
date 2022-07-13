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
                          DATOS DE RETAILER
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="No. Lote" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="warehouseArrivalDate" label="Fecha de Llegada al Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="salepointArrivalDate" label="Fecha de Llegada al Punto de Venta" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseRetailerName" label="Nombre del Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="salepointRetailerName" label="Nombre del Punto de Venta" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="warehouseRetailerAddress" label="Dirección del Almacén" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="salepointRetailerAddress" label="Dirección del Punto de Venta" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="toSalepointTransportType" label="Tipo de Transporte" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper
                          name="toSalepointShippingPrice"
                          label="Precio de Transporte del Almacén al Punto de Venta"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper
                          name="retailerPricePerKilo"
                          label="Precio por Kilo del Producto en el Retailer"
                        />
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
