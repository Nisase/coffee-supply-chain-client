import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import role from '../../data/roles.json';
import HandleSubmit from '../../logic/UpdateUser/HandleSubmit';
import { getUserByAddress } from '../../logic/GetUser';
import { createIpfs, addFileToIpfs } from '../../logic/ipfs';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];
const FILE_SIZE = 650 * 1024;

const initialValues = {
  name: '',
  email: '',
  role: '',
  isActive: true,
  profileHash: '',
};

const valSchema = Yup.object().shape({
  name: Yup.string().required('Obligatorio').min(2, 'Ingresa un nombre completo'),
  email: Yup.string().email('Email inválido').required('Obligatorio'),
  role: Yup.string().required('Obligatorio'),
  isActive: Yup.boolean().required('Obligatorio'),
  profileHash: Yup.string(),
  // profileHash: Yup.mixed()
  //   .test(
  //     'fileSize',
  //     `Solo se admite archivos menores a ${FILE_SIZE}`,
  //     (value) => value === null || (value && value?.size <= FILE_SIZE)
  //   )
  //   .test(
  //     'type',
  //     'Los archivos soportados son: jpg, jpeg y png',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
  //   ),
});

const UpdateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setfileUrl] = useState('');
  const [txHash, setTxHash] = useState('0x');

  const dispatch = useDispatch();

  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    setfileUrl('');

    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'UserUpdate' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'UserUpdate' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
    });
  };

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography className="mb-5 font-semibold underline underline-offset-2">
                          ACTUALIZAR DATOS DE USUARIO
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="name" label="Nombre" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="email" label="Email" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="role" label="Rol" options={role} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="profileHash" label="Imagen de Perfil" />
                      </Grid>
                      <Grid item xs={6}>
                        <CheckboxWrapper name="isActive" legend="Actividad" label="Usuario Activo" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          ACTUALIZAR USUARIO
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
