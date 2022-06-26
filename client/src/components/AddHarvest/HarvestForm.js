import { useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddHarvest/HandleSubmit';
import typeSeeds from '../../data/typeSeeds.json';

const initialValues = {
  batchNo: '',
  coffeeFamily: '',
  typeOfSeed: '',
  fertilizerUsed: '',
  harvestDate: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  coffeeFamily: Yup.string().required('Obligatorio'),
  typeOfSeed: Yup.string().required('Obligatorio'),
  fertilizerUsed: Yup.string().required('Obligatorio'),
  harvestDate: Yup.date().required('Obligatorio'),
});

const HarvestForm = (props) => {
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
      dispatch(addTx({ tx: trans.hash, type: 'DoneHarvesting' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneHarvesting' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
    });
  };

  useEffect(() => {
    if (props.batchValue) {
      formikRef.current.setFieldValue('batchNo', props.batchValue);
    }
  }, [props.batchValue]);

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              innerRef={formikRef}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid, errors, handleChange, values, setFieldValue }) => (
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
                    <Grid item xs={6}>
                      <TextfieldWrapper name="coffeeFamily" label="Familia del Café" />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectWrapper name="typeOfSeed" label="Tipo de Semilla" options={typeSeeds} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="fertilizerUsed" label="Fertilizante Utilizado" />
                    </Grid>
                    <Grid item xs={6}>
                      <DateTimePicker name="harvestDate" label="Fecha de Cosecha" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" disabled={!isValid || !dirty} type="submit">
                        {' '}
                        AGREGAR DATOS
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

export default HarvestForm;
