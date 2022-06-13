import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
  TelegramIcon,
} from 'react-share';
import { v4 as uuid } from 'uuid';

import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';

const TableAdmin = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);

  const shareUrl = 'https://translate.google.com/';

  const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

  const assignState = (action) => {
    let arr = [];
    if (action === 'FARMER') {
      arr = [
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'PROCESSOR') {
      arr = [
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'GRAIN_INSPECTOR') {
      arr = [
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'AGGLOMERATOR') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'SHIPPER_PACKER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'PACKER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'SHIPPER_RETAILER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
      ];
    } else if (action === 'RETAILER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
      ];
    } else if (action === 'DONE') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
      ];
    }
    return arr;
  };

  useEffect(() => {
    const getBatch = async () => {
      const erc = getCoffeERC20();
      const events = await erc.queryFilter(erc.filters.SetFarmDetails(walletAddress, null));
      const batchTemp = events.map((event) => event.args.batchNo);
      const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });

      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
      //   console.log(zip(batchTemp, nextActionsTemp));
    };
    getBatch();
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Container maxWidth="md">
          {batchNo.length > 0 &&
            batchNo.map((batch, index) => (
              <div key={index} className="my-10">
                <Tooltip title="Copiar" placement="top">
                  <div
                    className="mr-10 text-black hover:cursor-default"
                    onClick={() => {
                      navigator.clipboard.writeText(`https${batch}`);
                    }}
                    aria-hidden="true"
                  >
                    {batch}
                  </div>
                </Tooltip>
                NEXT ACTION: {nextActions[index]}
              </div>
            ))}
        </Container>
        <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No. Lote</TableCell>
                <TableCell align="center">Código QR</TableCell>
                <TableCell align="center">Cosecha</TableCell>
                <TableCell align="center">Procesado</TableCell>
                <TableCell align="center">Inspección del Grano</TableCell>
                <TableCell align="center">Aglomerado</TableCell>
                <TableCell align="center">Transporte a Empacadora</TableCell>
                <TableCell align="center">Empacado</TableCell>
                <TableCell align="center">Transporte a Retailer</TableCell>
                <TableCell align="center">Retailer</TableCell>
                <TableCell align="center">Tracking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batchNo.length > 0 &&
                batchNo.map((batch, index) => (
                  <TableRow
                    key={index}
                    // key={uuid()}
                  >
                    <TableCell>
                      {batch}{' '}
                      <div>
                        <FacebookShareButton
                          url={`https://www.youtube.com/`}
                          quote={'Modifica el estado de tu café 🥔☕️ accediendo al link: '}
                          hashtag={'#coffeeTrackingAppEC'}
                        >
                          <FacebookIcon size={20} round />
                        </FacebookShareButton>
                      </div>{' '}
                      <div>
                        <WhatsappShareButton
                          url={`https://www.youtube.com/watch?v=9WzIACv_mxs&ab_channel=frontendWala%28..%29`}
                          title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link: '}
                          separator={''}
                        >
                          <WhatsappIcon size={20} round />
                        </WhatsappShareButton>
                      </div>{' '}
                      <div>
                        <EmailShareButton
                          url={`https://coffee/dashboard/${batch}`}
                          subject={'LINK COFFEE 🥔 ☕️ TRACKING APP EC 👩‍🌾 🧑‍🌾'}
                          body={'Hola!, modifica el estado de tu café 🥔 ☕️ accediendo al link: '}
                          separator={'  '}
                        >
                          <EmailIcon size={20} round />
                        </EmailShareButton>
                      </div>{' '}
                      <div>
                        <TelegramShareButton
                          url={`https://coffee/dashboard/${batch}`}
                          title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾 accediendo al link'}
                        >
                          <TelegramIcon size={20} round />
                        </TelegramShareButton>
                      </div>{' '}
                      <div>
                        <TwitterShareButton
                          url={`https://coffee/dashboard/${batch}`}
                          title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link'}
                          hashtags={['#coffeeTrackingAppEC', '#EC', 'coffee']}
                        >
                          <TwitterIcon size={20} round />
                        </TwitterShareButton>
                      </div>{' '}
                    </TableCell>
                    <TableCell>{nextActions[index]}</TableCell>
                    {assignState(nextActions[index]).map((myState) => (
                      <TableCell key={uuid()}>{myState}</TableCell>
                    ))}
                    <TableCell>{nextActions[index]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default TableAdmin;
