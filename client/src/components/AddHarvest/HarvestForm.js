import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';

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
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  coffeeFamily: Yup.string().required('Requerido'),
  typeOfSeed: Yup.string().required('Requerido'),
  fertilizerUsed: Yup.string().required('Requerido'),
  harvestDate: Yup.date().required('Requerido'),
});

const HarvestForm = () => {
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
                        <Typography>Añadir Datos de Cosecha</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="coffeeFamily" label="Coffee Family" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="typeOfSeed" label="Type Of Seed" options={typeSeeds} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="fertilizerUsed" label="Fertilizer Used" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="harvestDate" label="Harvest Date" />
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

export default HarvestForm;
