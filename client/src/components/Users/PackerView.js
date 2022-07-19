import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffe2ERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import UpdateUserForm from '../UpdateUser/UpdateUserForm';
import PackerForm from '../AddPacker/PackerForm';

import AppWidgetCoffee from '../coffeeWidgets/AppWidgetCoffee';
import AppWidgetQR from '../coffeeWidgets/AppWidgetQR';
import TableUsers from '../Table/TableUsers';

const PackerView = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);

  useEffect(() => {
    const getBatch = async () => {
      const erc = getCoffe2ERC20();
      const events = await erc.queryFilter(erc.filters.DonePackaging(walletAddress, null));
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
              image="https://img.etimg.com/thumb/msid-90989042,width-1015,height-761,imgsize-100362,resizemode-8,quality-100/prime/economy-and-policy/indias-packaging-industry-is-unboxing-double-digit-growth-key-protagonists-e-commerce-and-you-.jpg"
              buttonText="ACTUALIZAR PERFIL"
              dialogTitle="Editar Datos de Perfil"
              Form={UpdateUserForm}
              altImg="Catador de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetCoffee
              title="Lotes de Café"
              image="https://www.moritaec.com/wp-content/uploads/2020/03/cafe-de-especialidad-0010-600x600.jpg"
              // image="/static/images/coffee-oack.webp"
              buttonText="AGREGAR EMPACADO"
              dialogTitle="Agregar Datos de Empacado"
              Form={PackerForm}
              altImg="Lotes de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetQR
              title="Lotes de Café"
              innerButtonText="AGREGAR EMPACADO"
              innerDialogText="Agregar Datos de Empacado"
              altImg="Lector QR"
              image="/static/images/qr-code.png"
              buttonText="AGREGAR EMPACADO CON CÓDIGO QR"
              dialogTitle="Agregar Empacado de Lote de Café con Código QR"
              Form={PackerForm}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableUsers batchNo={batchNo} nextActions={nextActions} />
    </>
  );
};

export default PackerView;
