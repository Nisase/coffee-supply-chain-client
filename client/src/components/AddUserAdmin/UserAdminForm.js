import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';

import role from '../../data/roles.json';
import HandleSubmit from '../../logic/AddUserAdmin/HandleSubmit';
import UserAdminListener from '../../logic/AddUserAdmin/UserAdminListener';
import FeedBack from '../FeedBack';

const initialValues = {
  userAddress: '0x2c592B3A35A86d009587478eF61A656F45510F56',
  name: 'Retailer Test 2',
  email: 'test@gmail.com',
  role: 'RETAILER',
  isActive: true,
  profileHash: '0x5373hdvshs673gw',
};

const valSchema = Yup.object().shape({
  userAddress: Yup.string()
    .required('Requerido')
    .max(42, 'Las direcciones de Metamask tienen un máximo de 42 caracteres')
    .min(42),

  name: Yup.string().required('Requerido').min(2, 'Ingresa el nombre completo'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  role: Yup.string().required('Requerido'),
  isActive: Yup.boolean().required('requerido'),
  profileHash: Yup.string(),
});

const UserAdminForm = () => {
  const { userRegistered }  = UserAdminListener();
  const [stateSnackbar, setStateSnackbar] = useState({open:false, message:'Usuario no agregado', status: 'error', key: '', openLoading: true, messageLoading: '' });

  const handleClose = () => {
    setStateSnackbar({...stateSnackbar, open:false});
  };

  useEffect(() => {
    console.log('Test')
    console.log(userRegistered)
    if(userRegistered.name !== undefined){
      setStateSnackbar({open: true, message:`Usuario ${userRegistered.name} registrado correctamente`, status: 'success'});
    }
  }, [userRegistered]);

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
                        <Typography>Añadir Usuario</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="userAddress" label="User Address" />
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
        <FeedBack feedBack={stateSnackbar}/>     
      </Grid>
    </Grid>
  );
};

export default UserAdminForm;
