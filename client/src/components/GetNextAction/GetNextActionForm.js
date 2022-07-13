import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';

import AskNextAction from '../../logic/GetNextAction/AskNextAction';

const initialValues = {
  batchNo: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string().required('Requerido').max(42, 'La dirección debe tener máximo 42 caracteres').min(42),
});

const GetNextActionForm = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={valSchema}
                onSubmit={(values) => {
                  AskNextAction(values);
                }}
              >
                {({ dirty, isValid }) => {
                  return (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextfieldWrapper name="batchNo" label="Batch No" />
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                            {' '}
                            OBTENER EL PROXIMO PROCESO
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
    </div>
  );
};

export default GetNextActionForm;
