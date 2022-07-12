import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import UpdateUserForm from '../UpdateUser/UpdateUserForm';
import RetailerForm from '../AddRetailer/RetailerForm';

import AppWidgetCoffee from '../coffeeWidgets/AppWidgetCoffee';
import AppWidgetQR from '../coffeeWidgets/AppWidgetQR';
import TableUsers from '../Table/TableUsers';

const RetailerView = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);

  useEffect(() => {
    const getBatch = async () => {
      const erc = getCoffeERC20();
      const events = await erc.queryFilter(erc.filters.DoneRetailer(walletAddress, null));
      const batchTemp = events.map((event) => event.args.batchNo);
      const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });

      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
    };
    getBatch();
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ paddingTop: '0px', marginTop: '0px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetCoffee
              title="Perfil"
              image="/static/images/farmer2.jpg"
              buttonText="ACTUALIZAR PERFIL"
              dialogTitle="Editar Datos de Perfil"
              Form={UpdateUserForm}
              altImg="Catador de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetCoffee
              title="Lotes de Café"
              image="/static/images/lote1.jpg"
              buttonText="AGREGAR RETAILER"
              dialogTitle="Agregar Datos de Retailer"
              Form={RetailerForm}
              altImg="Lotes de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetQR
              title="Lotes de Café"
              innerButtonText="AGREGAR RETAILER"
              innerDialogText="Agregar Datos de Retailer"
              altImg="Lector QR"
              image="/static/images/lote1.jpg"
              buttonText="AGREGAR RETAILER CON CÓDIGO QR"
              dialogTitle="Agregar Retailer de Lote de Café con Código QR"
              Form={RetailerForm}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableUsers batchNo={batchNo} nextActions={nextActions} />
    </>
  );
};

export default RetailerView;
