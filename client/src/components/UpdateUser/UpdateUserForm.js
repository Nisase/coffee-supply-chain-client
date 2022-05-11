import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';

import role from '../../data/roles.json';
import HandleSubmit from '../../logic/UpdateUser/HandleSubmit';
import UpdateUserListener from '../../logic/UpdateUser/UpdateUserListener';

const initialValues = {
  name: '',
  email: '',
  role: '',
  isActive: false,
  profileHash: '',
};

const valSchema = Yup.object().shape({
  name: Yup.string().required('Requerido').min(2, 'Ingresa el nombre completo'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  role: Yup.string().required('Requerido'),
  isActive: Yup.boolean().required('requerido'),
  profileHash: Yup.string(),
});

const UpdateUserForm = () => {
  const { userUpdated } = UpdateUserListener();

  useEffect(() => {
    console.log(userUpdated);
  }, [userUpdated]);

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
                        <Typography>Modificar Datos de Usuario</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="name" label="Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="email" label="Email" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="role" label="Role" options={role} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="profileHash" label="Profile Hash" />
                      </Grid>
                      <Grid item xs={6}>
                        <CheckboxWrapper name="isActive" legend="Activity" label="Active User" />
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

export default UpdateUserForm;
