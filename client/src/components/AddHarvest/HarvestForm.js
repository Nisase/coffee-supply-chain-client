import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Typography, Button } from '@mui/material';
import TextfieldWrapper from '../FormsUI/Textfield';
import SelectWrapper from '../FormsUI/Select';
import DateTimePicker from '../FormsUI/DateTimePicker';
import PendingConfirmation from '../PendingConfirmation';

import { addTx, removeTx } from '../../redux/txSlice';

import HandleSubmit from '../../logic/AddHarvest/HandleSubmit';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import { getCoffeERC20 } from '../../logic/erc20';
import typeSeeds from '../../data/typeSeeds.json';

const initialValues = {
  batchNo: '',
  coffeeFamily: '',
  typeOfSeed: '',
  fertilizerUsed: '',
  harvestDate: '',
};

const valSchema = Yup.object().shape({
  batchNo: Yup.string()
    .required('Obligatorio')
    .max(42, 'La dirección debe tener 42 caracteres')
    .min(42, 'La dirección debe tener 42 caracteres'),
  coffeeFamily: Yup.string().required('Obligatorio'),
  typeOfSeed: Yup.string().required('Obligatorio'),
  fertilizerUsed: Yup.string().required('Obligatorio'),
  harvestDate: Yup.date().required('Obligatorio'),
});

const HarvestForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [ batchNo, setBatchNo ] = useState([]);
  const [ nextActions, setNextActions ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('0x');

  useEffect(()=>{
    const de = async () => {
      const erc = getCoffeERC20()
      const events = await erc.queryFilter(erc.filters.DoneHarvesting(null))
      const batchTemp = events.map((event)=> event.args.batchNo)
      const nextActionsTemp = batchTemp.map(async (item ) => {
        const res = await AskNextAction({batchNo:item})
        return res.data
      })
      // Now that all the asynchronous operations are running, here we wait until they all complete.
      // return baz(await Promise.all(results));
      setBatchNo(batchTemp)
      setNextActions(await Promise.all(nextActionsTemp))
    }
    de()
  }, [])

  const dispatch = useDispatch();

  const localHandleSubmit = async (values) => {
    setTxHash('0x');
    setLoading(true);
    const tx = HandleSubmit(values);
    tx.then((trans) => {
      setTxHash(trans.hash);
      dispatch(addTx({ tx: trans.hash, type: 'DoneHarvesting' }));
      setLoading(false);
      enqueueSnackbar('Transacción pendiente de confirmación de red Ethereum', { variant: 'info' });
    }).catch((error) => {
      dispatch(removeTx({ tx: txHash, type: 'DoneHarvesting' }));
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
              {({ dirty, isValid }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className="mb-5 font-semibold underline underline-offset-2">
                        DATOS DE COSECHA
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldWrapper name="batchNo" label="No. Lote" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="coffeeFamily" label="Familia del Café" />
                    </Grid>
                    <Grid item xs={6}>
                      <SelectWrapper name="typeOfSeed" label="Tipo de Semilla" options={typeSeeds} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextfieldWrapper name="fertilizerUsed" label="Fertilizante Utilizado" />
                    </Grid>
                    <Grid item xs={6}>
                      <DateTimePicker name="harvestDate" label="Fecha de Cosecha" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" disabled={!dirty || !isValid} type="submit">
                        {' '}
                        AGREGAR DATOS
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="md">
          {batchNo.length > 0 && batchNo.map((batch, index)=>
            <div key={index}>Bach: {batch} - NEXT ACTION: {nextActions[index]}</div>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default HarvestForm;
