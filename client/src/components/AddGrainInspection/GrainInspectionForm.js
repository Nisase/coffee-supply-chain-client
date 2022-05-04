import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';

import HandleSubmit from '../../logic/AddGrainInspection/HandleSubmit';

const initialValues = {
  batchNo: '',
  tasteScore: '',
  grainPrice: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La direccion debe tener maximo 42 caracteres').min(42),
  tasteScore: Yup.number().typeError('Por favor ingrese una nota de catación correcta').required('Requerido'),
  grainPrice: Yup.number().typeError('Por favor ingrese un precio correcto').required('Requerido'),
});

const GrainInspectionForm = () => {
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
                        <Typography>Añadir Datos de la Inspección del Grano</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="tasteScore" label="Tasting Score" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="grainPrice" label="Grain Price" />
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

export default GrainInspectionForm;
