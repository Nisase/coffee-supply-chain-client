import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field } from 'formik';
// import { TextField } from 'material-ui-formik-components/TextField';
// import { Select } from 'material-ui-formik-components/Select';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  Typography,
  Button,
  FormLabel,
  //  TextField
} from '@mui/material';

import { TextField, Select } from '../MUI-formik/src';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import TextfieldWrapper from '../FormsUI/Textfield/index';

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
  // role: ['FARMER', 'COFFEE SELLER'],
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
  // Yup.array().length(2, 'Puede asignar máximo dos roles por persona'),
  // .of(Yup.string()).required('Obligatorio'),
  // Yup.string().required('Obligatorio'),
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

const AddUsersForm = () => {
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
    // ?
    // for (let i = 0; i < userTemp.role.length; i += 1) {
    if (userTemp.role !== '' && userTemp.message === null) {
      setLoading(false);
      enqueueSnackbar(`La dirección ya fue asignada al usuario ${userTemp.name}`, { variant: 'warning' });
      values.profileHash = null;
      return;
    }
    // }

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
      setfileUrl(result.url);
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
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors, values }) => (
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
                      <Field
                        name="userAddress"
                        label="Dirección de Metamask"
                        component={TextField}

                        // render={({ field }) => <TextField {...field} />}
                      />
                      <Field
                        name="role"
                        component={Select}
                        options={[
                          // { value: '', label: '-- Sin Selección --' },
                          { value: 'FARMER', label: 'Agricultor' },
                          { value: 'TASTER', label: 'Catador' },
                        ]}
                        label="Rol"
                        // required
                      />
                      {/* <Select
                        name="role"
                        options={[
                          { value: 'FARMER', label: 'Agricultor' },
                          { value: 'TASTER', label: 'Catador' },
                        ]}
                        label="Rol"
                      /> */}
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

export default AddUsersForm;






import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}