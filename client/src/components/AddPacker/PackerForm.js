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

import HandleSubmit from '../../logic/AddPacker/HandleSubmit';

const initialValues = {
  batchNo: '',
  packerAddress: '',
  packerArrivalDate: '',
  packingDate: '',
  packingPricePerKilo: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  packerAddress: Yup.string().required('Obligatorio'),
  packerArrivalDate: Yup.date().required('Obligatorio'),
  packingDate: Yup.date().required('Obligatorio'),
  packingPricePerKilo: Yup.string().required('Obligatorio'),
  // Yup.number().typeError('Por favor ingrese un número').required('Obligatorio'),
});

const PackerForm = () => {
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
      dispatch(addTx({ tx: trans.hash, type: 'DonePackaging' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DonePackaging' }));
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
                          DATOS DE EMPACADO
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="No. Lote" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="packerAddress" label="Dirección de Empacador" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="packerArrivalDate" label="Fecha de Llegada al Empacador" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="packingDate" label="Fecha de Empacado" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="packingPricePerKilo" label="Precio de Empacado por Kilo" />
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

export default PackerForm;
