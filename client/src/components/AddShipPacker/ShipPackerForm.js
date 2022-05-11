import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';

import HandleSubmit from '../../logic/AddShipPacker/HandleSubmit';
import ShipPackerListener from '../../logic/AddShipPacker/ShipPackerListener';
import transportTypeP from '../../data/transportTypeP.json';

const initialValues = {
  batchNo: '',
  transportTypeP: '',
  pickupDateP: '',
  shipPriceP: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
  transportTypeP: Yup.string().required('Requerido'),
  pickupDateP: Yup.date().required('Requerido'),
  shipPriceP: Yup.number().typeError('Por favor ingrese un precio correcto').required('Requerido'),
});

const ShipPackerForm = () => {
  const { shipPackerRegistered } = ShipPackerListener();

  useEffect(() => {
    console.log(shipPackerRegistered);
  }, [shipPackerRegistered]);

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
                        <Typography>Añadir Datos del Transporte hacia Empacadora</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="batchNo" label="Batch No" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="transportTypeP" label="Transportation Type" options={transportTypeP} />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="pickupDateP" label="Pick Up Date at Agglomerator" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="shipPriceP" label="Shipment Price" />
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

export default ShipPackerForm;
