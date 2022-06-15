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
  Fab,
  IconButton,
  Box,
  Stack,
  Badge,
  Chip,
  Avatar,
} from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { chipClasses } from '@mui/material/Chip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
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
import QRCode from 'qrcode.react';
import { GetApp } from '@mui/icons-material';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import RunningWithErrorsRoundedIcon from '@mui/icons-material/RunningWithErrorsRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceIcon from '@mui/icons-material/Face';

import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';

function ShareSocialMedia(batch) {
  return (
    <Stack direction="row" spacing={1}>
      {/* <div> */}
      <FacebookShareButton
        url={`https://192.168.100.4:3000/dashboard/batch?${batch}`}
        quote={'Modifica el estado de tu café 🥔☕️ accediendo al link: '}
        hashtag={'#coffeeTrackingAppEC'}
      >
        <FacebookIcon size={20} round />
      </FacebookShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <WhatsappShareButton
        url={`https://192.168.100.4:3000/dashboard/batch?${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link: '}
        separator={''}
      >
        <WhatsappIcon size={20} round />
      </WhatsappShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <EmailShareButton
        url={`https://192.168.100.4:3000/dashboard/batch?${batch}`}
        subject={'LINK COFFEE 🥔 ☕️ TRACKING APP EC 👩‍🌾 🧑‍🌾'}
        body={'Hola!, modifica el estado de tu café 🥔 ☕️ accediendo al link: '}
        separator={'  '}
      >
        <EmailIcon size={20} round />
      </EmailShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <TelegramShareButton
        url={`https://192.168.100.4:3000/dashboard/batch?${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾 accediendo al link'}
      >
        <TelegramIcon size={20} round />
      </TelegramShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <TwitterShareButton
        url={`https://192.168.100.4:3000/dashboard/batch?${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link'}
        hashtags={['#coffeeTrackingAppEC', '#EC', 'coffee']}
      >
        <TwitterIcon size={20} round />
      </TwitterShareButton>
      {/* </div>{' '} */}
    </Stack>
  );
}

const defColor = (myState) => {
  let color = '';
  let icon = '';
  if (myState === 'En Proceso') {
    color = 'primary';
    icon = <RunningWithErrorsRoundedIcon />;
  } else if (myState === 'No Disponible') {
    color = 'warning';
    icon = <DoNotDisturbAltRoundedIcon />;
  } else if (myState === 'Completado') {
    color = 'secondary';
    icon = <CheckRoundedIcon />;
  }
  return (
    <Stack>
      <StyledChip
        label={myState}
        color={color}
        icon={icon}
        // sx={{ backgroundColor: { color } }}
      />
    </Stack>
  );
};

const StyledChip = styled(Chip)(({ theme }) => ({
  [`&.${chipClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.fifth.dark,
    // color: theme.palette.info.darker,
  },
  [`&.${chipClasses.colorSecondary}`]: {
    backgroundColor: theme.palette.success.dark,
    // color: theme.palette.info.darker,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[900],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[900],
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableAdmin = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [data, setData] = useState([]);

  // const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

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
      setData(batchTemp);
      //   console.log(zip(batchTemp, nextActionsTemp));
    };
    getBatch();
  }, []);

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, batchNo.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: '1000px', boxShadow: 8, borderRadius: 1 }} component={Paper}>
          <Table sx={{ minWidth: '2100px' }} aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">No. Lote</StyledTableCell>
                <StyledTableCell align="center">Código QR</StyledTableCell>
                <StyledTableCell align="center">Cosecha</StyledTableCell>
                <StyledTableCell align="center">Procesado</StyledTableCell>
                <StyledTableCell align="center">Inspección del Grano</StyledTableCell>
                <StyledTableCell align="center">Aglomerado</StyledTableCell>
                <StyledTableCell align="center">Transporte a Empacadora</StyledTableCell>
                <StyledTableCell align="center">Empacado</StyledTableCell>
                <StyledTableCell align="center">Transporte a Retailer</StyledTableCell>
                <StyledTableCell align="center">Retailer</StyledTableCell>
                <StyledTableCell align="center">Tracking</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(batchNo.length > 0 && rowsPerPage > 0
                ? batchNo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : batchNo
              ).map((batch, index) => (
                <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}>
                  <StyledTableCell
                    align="center"
                    sx={{
                      position: 'sticky',
                      left: 0,

                      backgroundColor: 'primary.lighter',
                    }}
                  >
                    <Stack direction="row" spacing={2} m={2}>
                      <BootstrapTooltip
                        title={ShareSocialMedia(batch)}
                        placement="top"
                        arrow
                        enterDelay={300}
                        leaveDelay={200}
                      >
                        <Typography variant="body2">{batch} </Typography>
                      </BootstrapTooltip>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center" spacing={2}>
                    <Grid item xs={2}>
                      <Stack direction="column" spacing={1}>
                        <QRCode id="miQR" value={`https://192.168.100.4:3000/dashboard/batch?${batch}`} size="50" />

                        {/* <Avatar
                          sx={{
                            bgcolor: 'primary.light',
                          }}
                        > */}
                        <div>
                          <Chip
                            onClick={() => {
                              const canvas = document.getElementById('miQR');
                              const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                              const downloadLink = document.createElement('a');
                              downloadLink.href = pngUrl;
                              downloadLink.download = `QR_lote_${batch}.png`;
                              document.body.appendChild(downloadLink);
                              downloadLink.click();
                              document.body.removeChild(downloadLink);
                            }}
                            style={{ marginLeft: 2 }}
                            color="primary"
                            size="small"
                            label="descargar"
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                            icon={<DownloadForOfflineRoundedIcon />}
                          />
                        </div>
                        {/* </Avatar> */}
                      </Stack>
                    </Grid>
                  </StyledTableCell>
                  {assignState(nextActions[index]).map((myState) => (
                    <StyledTableCell key={uuid()} align="center">
                      {/* {myState} */}
                      {defColor(myState)}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <RouterLink to={`https://localhost:3000/tracking?batch=${batch}`}>
                        <IconButton
                          aria-label="tracking-batch"
                          // color="fifth"
                          sx={{ color: 'grey[800]' }}
                          size="small"
                        >
                          <RemoveRedEyeRoundedIcon />
                        </IconButton>
                      </RouterLink>
                    </Stack>
                    {/* {nextActions[index]} */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 162 * emptyRows }}>
                  <StyledTableCell colSpan={3} />
                </StyledTableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                {/* <Box
                  // m="auto"
                  textAlign="center"
                  // sx={{
                  //   display: 'flex',
                  //   justifyContent: 'center',
                  //   // margin: 'auto',
                  //   // backgroundColor: 'divider',
                  // }}
                > */}
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  count={batchNo.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                  }}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page + 1}`;
                  }}
                  backIconButtonProps={{
                    color: 'quaternary',
                  }}
                  nextIconButtonProps={{ color: 'quaternary' }}
                  showFirstButton
                  showLastButton
                  labelRowsPerPage={<span>Rows:</span>}
                  sx={{
                    '.MuiTablePagination-toolbar': {
                      backgroundColor: 'divider',
                      // display: 'flex',
                    },
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-input': {
                      fontWeight: 'bold',
                      color: 'grey',
                    },
                    // '.MuiTablePagination-root': {
                    //   // backgroundColor: 'divider',
                    //   display: 'flex',
                    //   justifyContent: 'center',
                    //   margin: 'auto',
                    // },
                  }}
                  // component={Box}
                />
                {/* </Box> */}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default TableAdmin;
