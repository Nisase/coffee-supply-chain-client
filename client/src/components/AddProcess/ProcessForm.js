import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button, FormLabel } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddProcess/HandleSubmit';
import typeDrying from '../../data/typeDrying.json';
import typeRoasting from '../../data/typeRoasting.json';
import { createIpfs, addFileToIpfs } from '../../logic/ipfs';

const SUPPORTED_FORMATS = ['image/jpg', 'image/png', 'image/jpeg'];
const FILE_SIZE = 650 * 1024;

const initialValues = {
  batchNo: '',
  processorAddress: '',
  typeOfDrying: '',
  humidityAfterDrying: '',
  // roastImageHash: '',
  roastImageHash: undefined,
  roastTemp: '',
  typeOfRoast: '',
  roastDate: '',
  millDate: '',
  processorPricePerKilo: '',
  processBatchWeight: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  processorAddress: Yup.string().required('Obligatorio'),
  typeOfDrying: Yup.string().required('Obligatorio'),
  humidityAfterDrying: Yup.string().required('Obligatorio'),
  // roastImageHash: Yup.string().required('Obligatorio'),
  roastImageHash: Yup.mixed()
    .required('Obligatorio')
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
  roastTemp: Yup.string().required('Obligatorio'),
  typeOfRoast: Yup.string().required('Obligatorio'),
  roastDate: Yup.date().required('Obligatorio'),
  millDate: Yup.date().required('Obligatorio'),
  processorPricePerKilo: Yup.date().required('Obligatorio'),
  processBatchWeight: Yup.date().required('Obligatorio'),
  // processorPrice: Yup.number().typeError('Por favor ingrese un número').required('Requerido'),
});

const ProcessForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');
  const [fileUrl, setfileUrl] = useState('');
  const formikRef = useRef();

  const dispatch = useDispatch();

  const ipfs = createIpfs();
  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    setfileUrl('');

    console.log('roast Img value', values.roastImageHash);

    if (values.roastImageHash !== '') {
      enqueueSnackbar('Guardando Imagen del usuario en red IPFS', { variant: 'info' });
      const result = await addFileToIpfs(ipfs, values.roastImageHash);
      console.log('Result', result);
      if (result.error !== null) {
        enqueueSnackbar('Error al guardar imagen del usuario en red IPFS', { variant: 'error' });
        setLoading(false);
        return;
      }
      values.roastImageHash = result.url;
      setfileUrl(result.url);
    }

    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'DoneProcessing' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneProcessing' }));
      enqueueSnackbar(error.message, { variant: 'warning' });
      setLoading(false);
      setfileUrl('');
    });
  };

  useEffect(() => {
    if (props.batchValue) {
      formikRef.current.setFieldValue('batchNo', props.batchValue);
    }
  }, [props.batchValue]);

  return (
    <Grid container>
      <PendingConfirmation loading={loading} />
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values) => {
                localHandleSubmit(values);
              }}
            >
              {({ dirty, isValid, setTouched, setFieldValue, touched, errors, values }) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography className="mb-5 font-semibold underline underline-offset-2">
                          DATOS DE PROCESAMIENTO
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {props.batchNo ? (
                          <TextfieldWrapper name="batchNo" label="No. Lote" />
                        ) : (
                          <TextfieldWrapper name="batchNo" label="No. Lote" disabled />
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="processorAddress" label="Dirección del Procesador" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="typeOfDrying" label="Tipo de Secado" options={typeDrying} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="humidityAfterDrying" label="Humedad después del Secado" />
                      </Grid>
                      <Grid item xs={6} justifyContent="space-between" alignItems="center">
                        <div className="flex flex-col">
                          <FormLabel component="legend">Imagen de Tueste</FormLabel>
                          <input
                            className="mt-2 text-sm"
                            name="roastImageHash"
                            type="file"
                            onClick={(event) => {
                              console.log(event);
                              setFieldValue('roastImageHash', null);
                              event.target.value = '';
                            }}
                            onChange={(event) => {
                              setTouched({
                                ...touched,
                                roastImageHash: true,
                              });
                              setFieldValue('roastImageHash', event.target.files[0]);
                            }}
                          />
                          {touched.roastImageHash && errors.roastImageHash ? (
                            <small className="text-red-500 pt-0 MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled">
                              {errors.roastImageHash}
                            </small>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="roastTemp" label="Temperatura de Tueste" />
                      </Grid>
                      <Grid item xs={6}>
                        <SelectWrapper name="typeOfRoast" label="Tipo de Tueste" options={typeRoasting} />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="roastDate" label="Fecha de Tostado" />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker name="millDate" label="Fecha de Molienda" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="processorPricePerKilo" label="Precio del Procesado" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper name="processBatchWeight" label="Peso del Lote Procesado" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                          {' '}
                          AGREGAR DATOS
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

export default ProcessForm;
