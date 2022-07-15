import React, { useState } from 'react';
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
import { styled, useTheme } from '@mui/material/styles';
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
import { saveSvgAsPng } from 'save-svg-as-png';
import QRCode from 'qrcode.react';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import RunningWithErrorsRoundedIcon from '@mui/icons-material/RunningWithErrorsRounded';

import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

function ShareSocialMedia(batch) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        aria-label="copy"
        // color="comp5"
        color="quaternary"
        sixe="small"
        sx={{ p: 0, m: 0 }}
        onClick={() => {
          navigator.clipboard.writeText(batch);
        }}
      >
        {/* <Tooltip arrow size="small" placement="top" title="Copiar" sx={{ m: 0, p: 0, fontSize: '1.3875rem' }}> */}
        <ContentCopyRoundedIcon sx={{ m: 0, p: 0, fontSize: '1.3875rem' }} />
        {/* </Tooltip> */}
      </IconButton>
      {/* `https://192.168.100.4:3000/tracking?batch=${batch}` */}
      <FacebookShareButton
        url={`http://localhost:3000/tracking?batch=${batch}`}
        quote={'Modifica el estado de tu café 🥔☕️ accediendo al link: '}
        hashtag={'#coffeeTrackingAppEC'}
      >
        <FacebookIcon size={20} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={`http://localhost:3000/tracking?batch=${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link: '}
        separator={''}
      >
        <WhatsappIcon size={20} round />
      </WhatsappShareButton>
      <EmailShareButton
        url={`http://localhost:3000/tracking?batch=${batch}`}
        subject={'LINK COFFEE 🥔 ☕️ TRACKING APP EC 👩‍🌾 🧑‍🌾'}
        body={'Hola!, modifica el estado de tu café 🥔 ☕️ accediendo al link: '}
        separator={'  '}
      >
        <EmailIcon size={20} round />
      </EmailShareButton>
      <TelegramShareButton
        url={`http://localhost:3000/tracking?batch=${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾 accediendo al link'}
      >
        <TelegramIcon size={20} round />
      </TelegramShareButton>
      <TwitterShareButton
        url={`http://localhost:3000/tracking?batch=${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link'}
        hashtags={['#coffeeTrackingAppEC', '#EC', 'coffee']}
      >
        <TwitterIcon size={20} round />
      </TwitterShareButton>
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
    backgroundColor: theme.palette.primary.dark,
  },
  [`&.${chipClasses.colorSecondary}`]: {
    backgroundColor: theme.palette.success.dark,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[900],
    // .grey[900],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[900],
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
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

const TableUsers = ({ batchNo, nextActions }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const assignState = (action) => {
    let arr = [];
    // if (action === 'AGRICULTOR/PRODUCTOR') {
    //   arr = [
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'PROCESADOR') {
    //   arr = [
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'INSPECTOR DE GRANO/AGRICULTOR') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'AGLOMERADOR') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'TRANSPORTISTA A EMPACADORA') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'EMPACADORA') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //     'No Disponible',
    //   ];
    // } else if (action === 'TRANSPORTISTA A RETAILER') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //     'No Disponible',
    //   ];
    // } else if (action === 'RETAILER') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'En Proceso',
    //   ];
    // } else if (action === 'DONE') {
    //   arr = [
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //     'Completado',
    //   ];
    // }
    if (action === 'FARMER') {
      arr = ['GRANJA AGREGADA', 'COSECHA', 'PROCESADO'];
    } else if (action === 'PROCESSOR') {
      arr = ['COSECHA', 'PROCESADO', 'CATACIÓN'];
    } else if (action === 'TASTER') {
      arr = ['PROCESADO', 'CATACIÓN', 'VENTA DE CAFÉ'];
    } else if (action === 'COFFEE SELLER') {
      arr = ['CATACIÓN', 'VENTA DE CAFÉ', 'BODEGAJE'];
    } else if (action === 'WAREHOUSE') {
      arr = ['VENTA DE CAFÉ', 'BODEGAJE', 'TRANSPORTE A EMPACADOR'];
    } else if (action === 'SHIPPER TO PACKER') {
      arr = ['BODEGAJE', 'TRANSPORTE A EMPACADOR', 'EMPACADO'];
    } else if (action === 'PACKER') {
      arr = ['TRANSPORTE A EMPACADOR', 'EMPACADO', 'TRANSPORTE A RETAILER'];
    } else if (action === 'SHIPPER TO RETAILER') {
      arr = ['EMPACADO', 'TRANSPORTE A RETAILER', 'RETAILER'];
    } else if (action === 'RETAILER') {
      arr = ['TRANSPORTE A RETAILER', 'RETAILER', 'TERMINADO'];
    } else if (action === 'DONE') {
      arr = ['RETAILER', 'TERMINADO', 'TERMINADO'];
    }
    return arr;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, batchNo.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Grid item xs={12} sx={{ marginTop: '50px' }}>
      <TableContainer sx={{ maxHeight: '1000px', boxShadow: 2, borderRadius: 1 }} component={Paper}>
        <Table sx={{ minWidth: '1000px' }} aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NO. LOTE</StyledTableCell>
              <StyledTableCell align="center">CÓDIGO QR</StyledTableCell>
              <StyledTableCell align="center">PROCESO ANTERIOR</StyledTableCell>
              <StyledTableCell align="center">PROCESO ACTUAL</StyledTableCell>
              <StyledTableCell align="center">PROCESO SIGUIENTE</StyledTableCell>
              {/* <StyledTableCell align="center">COSECHA</StyledTableCell>
              <StyledTableCell align="center">PROCESADO</StyledTableCell>
              <StyledTableCell align="center">INSPECCIÓN DEL GRANO</StyledTableCell>
              <StyledTableCell align="center">AGLOMERADO</StyledTableCell>
              <StyledTableCell align="center">TRANSPORTE A EMPACADORA</StyledTableCell>
              <StyledTableCell align="center">EMPACADO</StyledTableCell>
              <StyledTableCell align="center">TRANSPORTE A RETAILER</StyledTableCell>
              <StyledTableCell align="center">RETAILER</StyledTableCell> */}
              <StyledTableCell align="center">TRACKING</StyledTableCell>
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
                    // position: 'sticky',
                    left: 0,
                    zIndex: 100,
                    // backgroundColor: 'grey.200',
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
                      {/* <Tooltip title="Copiar" placement="bottom">
                        <div
                          className="mr-10 text-black hover:cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(batch);
                          }}
                          aria-hidden="true"
                        > */}
                      <Typography variant="body2">
                        {batch.slice(0, 8).concat('...').concat(batch.slice(-8))}{' '}
                      </Typography>
                      {/* </div>
                      </Tooltip> */}
                    </BootstrapTooltip>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center" spacing={2}>
                  <Grid item xs={2}>
                    <Stack direction="column" spacing={1}>
                      <QRCode
                        bgColor="#FFFFFF"
                        id={batch}
                        value={`http://localhost:3000/tracking?batch=${batch}`}
                        size="40"
                        includeMargin
                        renderAs="svg"
                      />
                      <div>
                        <Chip
                          onClick={() => {
                            saveSvgAsPng(document.getElementById(`${batch}`), `QR_lote_${batch}.png`, {
                              scale: 60,
                            });
                          }}
                          style={{ marginLeft: 2 }}
                          color="comp7"
                          size="small"
                          label="descargar"
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            // color: (theme) => theme.palette.primary,
                            // bgcolor: theme.palete.warning.darker,
                          }}
                          icon={<DownloadForOfflineRoundedIcon />}
                        />
                      </div>
                    </Stack>
                  </Grid>
                </StyledTableCell>
                {assignState(nextActions[index]).map((myState) => (
                  <StyledTableCell key={uuid()} align="center">
                    {/* {defColor(myState)} */}
                    {myState}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RouterLink to={`http://localhost:3000/tracking?batch=${batch}`}>
                      <IconButton aria-label="tracking-batch" sx={{ color: 'grey[800]' }} size="small">
                        <RemoveRedEyeRoundedIcon />
                      </IconButton>
                    </RouterLink>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 200 * emptyRows }}>
                <StyledTableCell colSpan={3} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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
                  color: 'secondary',
                }}
                nextIconButtonProps={{ color: 'secondary' }}
                showFirstButton
                showLastButton
                labelRowsPerPage={<span>Rows:</span>}
                sx={{
                  '.MuiTablePagination-toolbar': {
                    backgroundColor: 'divider',
                  },
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-input': {
                    fontWeight: 'bold',
                    color: 'grey',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default TableUsers;
