import { useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddCoffeeSell/HandleSubmit';

const initialValues = {
  batchNo: '',
  beanPricePerKilo: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  beanPricePerKilo: Yup.string().required('Obligatorio'),
});

const CoffeeSellForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');
  const formikRef = useRef();

  const dispatch = useDispatch();

  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'DoneCoffeeSelling' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneCoffeeSelling' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
    });
  };

  useEffect(() => {
    if (props.batchValue) {
      formikRef.current.setFieldValue('batchNo', props.batchValue);
    }
  }, [props.batchValue]);

  const handleResetForm = (resetForm) => {
    // if (window.confirm('¿Está seguro que desea resetear las entradas de su formulario?')) {
    resetForm();
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

                      <Grid item xs={12}>
                        <TextfieldWrapper name="beanPricePerKilo" label="Precio de Venta de Grano por Kilo [$]" />
                      </Grid>

                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          className="form-btn"
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
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          className="form-btn"
                          variant="contained"
                          disabled={!dirty || !isValid}
                          type="submit"
                        >
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

export default CoffeeSellForm;
