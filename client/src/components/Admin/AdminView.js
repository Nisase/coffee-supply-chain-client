import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';

import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffeERC20, getUserERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import UserAdminForm from '../AddUserAdmin/UserAdminForm';
import FarmForm from '../AddFarmDetails/FarmForm';
import AppWidgetCoffee from '../coffeeWidgets/AppWidgetCoffee';
import TableUsers from '../Table/TableUsers';

const AdminView = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const [users, setUsers] = useState([]);

  const walletAddress = useSelector(walletAddressSelector);

  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  useEffect(() => {
    const getBatch = async () => {
      const erc = getCoffeERC20();
      const ercUsers = getUserERC20();
      const events = await erc.queryFilter(erc.filters.SetFarmDetails(walletAddress, null));
      const batchTemp = events.map((event) => event.args.batchNo);
      const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });
      const eventsUsers = await ercUsers.queryFilter(ercUsers.filters.UserRoleUpdate(null));
      const usersTemp = eventsUsers.map((event) => event.args.user);
      const newUsers = removeDuplicates(usersTemp);

      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
      setUsers(newUsers);
    };
    getBatch();
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ paddingTop: '0px', marginTop: '0px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetCoffee
              title="Usuarios"
              image="/static/images/farmer2.jpg"
              // icon={'ant-design:android-filled'}
              buttonText="AGREGAR USUARIOS"
              dialogTitle="Agregar Datos de Usuario"
              Form={UserAdminForm}
              altImg="Agricultor de café"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetCoffee
              title="Lotes de Café"
              image="/static/images/lote1.jpg"
              // icon={'ant-design:android-filled'}
              buttonText="AGREGAR LOTE"
              dialogTitle="Agregar Información de la Granja"
              Form={FarmForm}
              altImg="Lotes de café"
            />
          </Grid>
        </Grid>
      </Grid>
      <TableUsers batchNo={batchNo} nextActions={nextActions} />
    </>
  );
};

export default AdminView;
