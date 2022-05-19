import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield/index';
import SelectWrapper from '../FormsUI/Select';
import CheckboxWrapper from '../FormsUI/Checkbox';
import PendingConfirmation from '../PendingConfirmation';

import role from '../../data/roles.json';
import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddUserAdmin/HandleSubmit';

const initialValues = {
  userAddress: '',
  name: '',
  email: '',
  role: '',
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
  profileHash: Yup.string(),
});

const UserAdminForm = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false) 
  const [txHash, setTxHash] = useState('0x') 

  const dispatch = useDispatch()

  const localHandleSubmit = (values) => {
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
              {({ dirty, isValid }) => 
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
              }
            </Formik>
          </div>          
        </Container>
      </Grid>
    </Grid>
  );
};

export default UserAdminForm;
