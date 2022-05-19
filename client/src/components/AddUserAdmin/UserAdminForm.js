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
import {createIpfs, addFileToIpfs} from '../../logic/ipfs';


const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];
const FILE_SIZE = 650 * 1024;

const initialValues = {
  userAddress: '0x2c592B3A35A86d009587478eF61A656F45510F56',
  name: 'RETAILER2',
  email: 'thema@gmail.com',
  role: 'RETAILER',
  isActive: true,
  profileHash: '',
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
  profileHash: Yup.mixed()
    .test('fileSize', `Solo adminte archivos menores a ${FILE_SIZE}`, (value) => value === null || (value && value?.size <= FILE_SIZE))
    .test(
      'type',
      'Archivos soportados son jpg, jpeg y png',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    )
});

const UserAdminForm = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false) 
  const [fileUrl, setfileUrl] = useState('') 
  const [txHash, setTxHash] = useState('0x') 

  const dispatch = useDispatch()
  
  const ipfs = createIpfs();
  const localHandleSubmit = async (values) => {
    /*
    console.log(values.profileHash)
    if (!values.profileHash || values.profileHash.length === 0) {
      console.log('hola')
      values.profileHash = '';
    }
    console.log('hola2')
    console.log(ipfs)
    const url = await addFileToIpfs(ipfs, values.profileHash)
    console.log('hola3')
    console.log(url)
    setfileUrl(url)
    */   


    setTxHash('0x')
    setLoading(true)
    const tx = HandleSubmit(values)
    tx.then((trans)=>{
      setTxHash(trans.hash)
      dispatch(addTx({tx: trans.hash, type: 'UserUpdate'}))
      setLoading(false)
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' })
      // const res = await trans.wait();
      // const args = getArgsEvent(res, 'UserUpdate')
    })
    .catch((error)=>{
      dispatch(removeTx({tx: txHash, type: 'UserUpdate' }))
      enqueueSnackbar(error.message, { variant: 'warning' })
      setLoading(false)
    })
  }

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
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors }) => 
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography className='mb-10 font-semibold text-center'>AÑADIR USUARIO CON ROL</Typography>
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
                        <CheckboxWrapper name="isActive" legend="Activity" label="Active User" />
                      </Grid>                      
                      <Grid item xs={6} justifyContent="space-between" alignItems="center">
                        <div className='flex flex-col'>
                          <FormLabel component="legend">Profile Hash</FormLabel>
                          <input
                            className='mt-2 text-sm'
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
                          {touched.profileHash && errors.profileHash ? <small className='text-red-500 pt-0 MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled'>{errors.profileHash}</small> : null}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          SUBMIT
                        </Button>
                      </Grid>
                      {fileUrl && (
                            <img src={fileUrl} alt='File in IFPS' width="600px" />
                        )}
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
