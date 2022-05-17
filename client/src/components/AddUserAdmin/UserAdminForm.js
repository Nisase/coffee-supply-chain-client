import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
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
  const [stateSnackbar, setStateSnackbar] = useState({open:false, message:'Usuario no agregado', status: 'success', key: 'UserAdminForm', openLoading: false});
  
  const handleClose = () => {
    setStateSnackbar({...stateSnackbar, open:false});
  };

  const localHandleSubmit = async (values) => {    
    setStateSnackbar({...stateSnackbar, openLoading:true});
    try {
      await HandleSubmit(values)
    } catch (error) {
      console.log(error)
      setStateSnackbar({...stateSnackbar, open:true, openLoading:false, status: 'error',message: error.message});
    }
  };

  useEffect(() => {
    if(userRegistered.name !== undefined){
      setStateSnackbar({...stateSnackbar, open: true, message:`Usuario ${userRegistered.name} registrado correctamente`, status: 'success', openLoading: false});
    }
  }, [userRegistered]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
        <FeedBack stateProp={stateSnackbar} handleClose={handleClose}/>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => 
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography className='mb-5 font-semibold'>Añadir Usuario:</Typography>
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
                        <LoadingButton loading={stateSnackbar.openLoading} fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          SUBMIT
                        </LoadingButton>
                        <div className={`flex justify-center mt-3 ${stateSnackbar.openLoading ? '':'hidden'}`}><Button fullWidth variant="contained" color="secondary" onClick={()=>{setStateSnackbar({...stateSnackbar, openLoading:false});}}>Cancelar</Button></div>
                      </Grid>
                    </Grid>
                  </Form>
              }
            </Formik>
          </div>          
        </Container>
      </Grid>
    </Grid>
  );
};

export default UserAdminForm;
