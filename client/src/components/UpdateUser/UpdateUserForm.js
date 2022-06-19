import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button, FormLabel } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';
import { userDataSelector } from '../../redux/appDataSlice';

import role from '../../data/roles.json';
import HandleSubmit from '../../logic/UpdateUser/HandleSubmit';
import { createIpfs, addFileToIpfs } from '../../logic/ipfs';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];
const FILE_SIZE = 650 * 1024;

const valSchema = Yup.object().shape({
  name: Yup.string().required('Obligatorio').min(2, 'Ingresa un nombre completo'),
  email: Yup.string().email('Email inválido').required('Obligatorio'),
  // role: Yup.string().required('Obligatorio'),
  isActive: Yup.boolean().required('Obligatorio'),
  // profileHash: Yup.string(),
  profileHash: Yup.mixed()
    .test(
      'fileSize',
      `Solo se admite archivos menores a ${FILE_SIZE}`,
      (value) => value === null || (value && value?.size <= FILE_SIZE)
    )
    .test(
      'type',
      'Los archivos soportados son: jpg, jpeg y png',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

const UpdateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');

  const dispatch = useDispatch();
  const userData = useSelector(userDataSelector);

  const initialValues = {
    name: userData.name,
    email: userData.email,
    // role: userData.role,
    isActive: userData.isActive,
    profileHash: null,
  };

  const ipfs = createIpfs();
  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    let result = null;

    if (!values.profileHash || values.profileHash.length === 0) {
      values.profileHash = null;
    }
    if (values.profileHash) {
      enqueueSnackbar('Guardando imagen del usuario en red IPFS', { variant: 'info' });
      result = await addFileToIpfs(ipfs, values.profileHash);
      if (result.error !== null) {
        enqueueSnackbar('Error al guardar imagen del usuario en red IPFS', { variant: 'error' });
        setLoading(false);
        return;
      }
    }

    const tx = HandleSubmit({ ...values, profileHash: result.url });
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
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12}>
                      <Typography className="mb-5 font-semibold underline underline-offset-2">
                        DATOS DE USUARIO
                      </Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Grid item xs={6} className="bg-gray-200 max-w-fit p-2 rounded-xl mb-5">
                        <img
                          alt="Profile"
                          className="rounded-full w-40 h-40"
                          src={values.profileHash ? URL.createObjectURL(values.profileHash) : userData.profileHash}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="name" label="Nombre" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="email" label="Email" />
                    </Grid>
                    {/* <Grid item xs={6}>
                        <SelectWrapper name="role" label="Rol" options={role} />
                      </Grid> */}
                    <Grid item xs={12} justifyContent="space-between" alignItems="center">
                      <div className="flex flex-col">
                        <FormLabel component="legend">Cargar imagen de perfil</FormLabel>
                        <input
                          className="mt-2 text-sm"
                          name="profileHash"
                          type="file"
                          onChange={(event) => {
                            setTouched({
                              ...touched,
                              profileHash: true,
                            });
                            setFieldValue('profileHash', event.target.files[0]);
                          }}
                        />
                        {touched.profileHash && errors.profileHash ? (
                          <small className="text-red-500 pt-0 MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled">
                            {errors.profileHash}
                          </small>
                        ) : null}
                      </div>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <TextfieldWrapper name="profileHash" label="Imagen de Perfil" />
                      </Grid> */}
                    <Grid item xs={6}>
                      <CheckboxWrapper name="isActive" legend="Estado" label="Usuario Activo" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                        {' '}
                        ACTUALIZAR USUARIO
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default UpdateUserForm;
