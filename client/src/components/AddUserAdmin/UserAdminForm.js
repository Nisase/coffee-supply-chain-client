import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button, FormLabel } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';
import PendingConfirmation from '../PendingConfirmation';

import role from '../../data/roles.json';
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
  role: 'FARMER',
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
  role: Yup.string().required('Obligatorio'),
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
  const [fileUrl, setfileUrl] = useState('');
  const [txHash, setTxHash] = useState('0x');

  const dispatch = useDispatch();

  const ipfs = createIpfs();
  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    setfileUrl('');

    const userTemp = await getUserByAddress(values.userAddress);
    if (userTemp.role !== '' && userTemp.message === null) {
      setLoading(false);
      enqueueSnackbar(`La dirección ya fue asignada al usuario ${userTemp.name}`, { variant: 'warning' });
      values.profileHash = null;
      return;
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
    if(values.profileHash !== ''){
      enqueueSnackbar('Guardando Imagen del usuario en red IPFS', { variant: 'info' });
      const result = await addFileToIpfs(ipfs, values.profileHash)
      if(result.error !== null ){
        enqueueSnackbar('Error al guardar imagen del usuario en red IPFS', { variant: 'error' });
        setLoading(false);
        return 
      }
      values.profileHash = result.url
      setfileUrl(result.url)
    }
    
    if (!values.profileHash || values.profileHash.length === 0) {
      values.profileHash = '';
    }
    if(values.profileHash !== ''){
      enqueueSnackbar('Guardando Imagen del usuario en red IPFS', { variant: 'info' });
      const result = await addFileToIpfs(ipfs, values.profileHash)
      if(result.error !== null ){
        enqueueSnackbar('Error al guardar imagen del usuario en red IPFS', { variant: 'error' });
        setLoading(false);
        return 
      }
      values.profileHash = result.url
      setfileUrl(result.url)
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
      setfileUrl('');
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
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className="mb-5 font-semibold underline underline-offset-2">
                        DATOS DE USUARIO
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="userAddress" label="Dirección de Metamask" />
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
                      <CheckboxWrapper name="isActive" legend="Actividad" label="Usuario Activo" />
                    </Grid>
                    <Grid item xs={6} justifyContent="space-between" alignItems="center">
                      <div className="flex flex-col">
                        <FormLabel component="legend">Imagen de Perfil</FormLabel>
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
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                        {' '}
                        REGISTRAR USUARIO
                      </Button>
                    </Grid>
                    {fileUrl && <img src={fileUrl} alt="File in IFPS" width="600px" />}
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
