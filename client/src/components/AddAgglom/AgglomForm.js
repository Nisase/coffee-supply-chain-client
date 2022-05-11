import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';

import HandleSubmit from '../../logic/AddAgglom/HandleSubmit';
import AgglomListener from '../../logic/AddAgglom/AgglomListener';

const initialValues = {
  batchNo: '',
  agglomAddress: '',
  agglomDate: '',
  storagePrice: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  agglomAddress: Yup.string().required('Requerido'),
  agglomDate: Yup.date().required('Requerido'),
  storagePrice: Yup.number().typeError('Por favor ingrese un precio correcto').required('Requerido'),
});

const AgglomForm = () => {
  const { agglomRegistered } = AgglomListener();

  useEffect(() => {
    console.log(agglomRegistered);
  }, [agglomRegistered]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                HandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Añadir Datos de la Aglomeración</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="agglomAddress" label="Agglomertor Address" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="agglomDate" label="Agglomeration Date" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="storagePrice" label="Storage Price" />
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

export default AgglomForm;
