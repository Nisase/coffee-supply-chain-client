import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, FormLabel } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import CheckboxWrapper from '../FormsUI/Checkbox';
import MultipleSelectChip from '../FormsUI/Select/MultipleSelectChip';
import PendingConfirmation from '../PendingConfirmation';

import roleData from '../../data/roles.json';
import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddUserAdmin/HandleSubmit';
import { getUserByAddress } from '../../logic/GetUser';
import { createIpfs, addFileToIpfs } from '../../logic/ipfs';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];
const FILE_SIZE = 650 * 1024;

const initialValues = {
  userAddress: '0xce49E1834F30fD7572F87aCf2Af38C63B604Be69',
  name: 'FARMER 4',
  email: 'farmer4test@gmail.com',
  role: [],
  isActive: true,
  profileHash: null,
};

const valSchema = Yup.object().shape({
  userAddress: Yup.string()
    .required('Obligatorio')
    .max(42, 'Las direcciones de Metamask tienen 42 caracteres')
    .min(42, 'Las direcciones de Metamask tienen 42 caracteres'),
  name: Yup.string().required('Obligatorio').min(2, 'Ingresa un nombre completo'),
  email: Yup.string().email('Email inválido').required('Obligatorio'),

  role: Yup.array()
    .min(1, 'Se necesita asignar al menos un rol por persona')
    .max(2, 'Puede asignar máximo dos roles por persona')
    .of(Yup.string())
    .required('Obligatorio'),
  isActive: Yup.boolean().required('Obligatorio'),
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

const UserAdminForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');

  const dispatch = useDispatch();

  const ipfs = createIpfs();
  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);

    const userTemp = await getUserByAddress(values.userAddress);
    for (let i = 0; i < userTemp.role.length; i += 1) {
      if (userTemp.role[i] !== '' && userTemp.message === null) {
        setLoading(false);
        enqueueSnackbar(`La dirección ya fue asignada al usuario ${userTemp.name}`, { variant: 'warning' });
        values.profileHash = null;
        return;
      }
    }

    if (userTemp.message !== null) {
      setLoading(false);
      enqueueSnackbar(`Datos ingresados con error: ${userTemp.message}`, { variant: 'warning' });
      values.profileHash = null;
      return;
    }

    if (!values.profileHash || values.profileHash.length === 0) {
      values.profileHash = '';
    }

    if (values.profileHash !== '') {
      enqueueSnackbar('Guardando Imagen del usuario en red IPFS', { variant: 'info' });
      const result = await addFileToIpfs(ipfs, values.profileHash);
      if (result.error !== null) {
        enqueueSnackbar('Error al guardar imagen del usuario en red IPFS', { variant: 'error' });
        setLoading(false);
        return;
      }
      values.profileHash = result.url;
    }

    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'UserUpdate' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
      // const res = await trans.wait();
      // const args = getArgsEvent(res, 'UserUpdate')
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'UserUpdate' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
    });
  };

  const handleResetForm = (resetForm) => {
    // if (window.confirm('¿Está seguro que desea resetear las entradas de su formulario?')) {
    resetForm();

    // }
  };

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors, values, resetForm }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid item xs={6} className="bg-gray-200 max-w-fit p-2 rounded-xl mb-5">
                        <img
                          alt="Profile"
                          className="rounded-full w-40 h-40"
                          src={
                            values.profileHash
                              ? URL.createObjectURL(values.profileHash)
                              : '/static/mock-images/avatars/farmer2.png'
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldWrapper name="userAddress" label="Dirección de Metamask" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="name" label="Nombre" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="email" label="Email" />
                    </Grid>
                    <Grid item xs={6}>
                      <MultipleSelectChip name="role" label="Rol" options={roleData} />
                      {touched.role && errors.role ? (
                        <small className="text-red-500 pt-0 MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled">
                          {errors.role}
                        </small>
                      ) : null}
                    </Grid>
                    <Grid item xs={6}>
                      <CheckboxWrapper name="isActive" legend="Actividad" label="Usuario Activo" />
                    </Grid>
                    <Grid item xs={12} justifyContent="space-between" alignItems="center">
                      <div className="flex flex-col">
                        <FormLabel component="legend">Imagen de Perfil</FormLabel>
                        <input
                          className="mt-2 text-sm"
                          name="profileHash"
                          type="file"
                          onClick={(event) => {
                            console.log(event);
                            setFieldValue('profileHash', null);
                            event.target.value = '';
                          }}
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
                    <Grid item xs={6}>
                      <Button
                        // sx={{ backgroundColor: 'error.darker' }}
                        fullWidth
                        variant="contained"
                        disabled={!dirty || !isValid}
                        type="submit"
                      >
                        {' '}
                        REGISTRAR USUARIO
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        //  disabled={dirty || isValid}
                        type="reset"
                        onClick={() => {
                          handleResetForm(resetForm);
                        }}
                      >
                        {' '}
                        RESETEAR FORMULARIO
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

export default UserAdminForm;
