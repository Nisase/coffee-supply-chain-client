import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';

import HandleSubmit from '../../logic/AddShipRetailer/HandleSubmit';
import transportTypeR from '../../data/transportTypeR.json';

const initialValues = {
  batchNo: '',
  transportTypeR: '',
  pickupDateR: '',
  shipPriceR: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  transportTypeR: Yup.string().required('Requerido'),
  pickupDateR: Yup.date().required('Requerido'),
  shipPriceR: Yup.number().typeError('Por favor ingrese un precio correcto').required('Requerido'),
});

const ShipRetailerForm = () => {
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
                        <Typography>Añadir Datos de Transporte hacia el Retailer</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="transportTypeR" label="Transportation Type" options={transportTypeR} />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="pickupDateR" label="Pick Up Date at Packer" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="shipPriceR" label="Shipment Price" />
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

export default ShipRetailerForm;
