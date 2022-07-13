import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffe2ERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import UpdateUserForm from '../UpdateUser/UpdateUserForm';
import ShipRetailerForm from '../AddShipRetailer/ShipRetailerForm';

import AppWidgetCoffee from '../coffeeWidgets/AppWidgetCoffee';
import AppWidgetQR from '../coffeeWidgets/AppWidgetQR';
import TableUsers from '../Table/TableUsers';

const ShipToRetailerView = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);

  useEffect(() => {
    const getBatch = async () => {
      const erc = getCoffe2ERC20();
      const events = await erc.queryFilter(erc.filters.DoneShippingRetailer(walletAddress, null));
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
              buttonText="AGREGAR TRANSPORTE"
              dialogTitle="Agregar Datos de Transporte"
              Form={ShipRetailerForm}
              altImg="Lotes de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetQR
              title="Lotes de Café"
              innerButtonText="AGREGAR TRANSPORTE"
              innerDialogText="Agregar Datos de Transporte"
              altImg="Lector QR"
              image="/static/images/lote1.jpg"
              buttonText="AGREGAR TRANSPORTE CON CÓDIGO QR"
              dialogTitle="Agregar Transporte de Lote de Café con Código QR"
              Form={ShipRetailerForm}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableUsers batchNo={batchNo} nextActions={nextActions} />
    </>
  );
};

export default ShipToRetailerView;
