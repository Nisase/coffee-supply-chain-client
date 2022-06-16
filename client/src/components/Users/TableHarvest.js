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
  Card,
  CardActions,
  CardContent,
  Button,
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
      <StyledChip label={myState} color={color} icon={icon} />
    </Stack>
  );
};

const StyledChip = styled(Chip)(({ theme }) => ({
  [`&.${chipClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.fifth.dark,
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

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const TableHarvest = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const walletAddress = useSelector(walletAddressSelector);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

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
      const erc = getCoffeERC20(); // aqui posible error del listener
      const events = await erc.queryFilter(erc.filters.DoneHarvesting(walletAddress, null));
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
      {/* <Container maxWidth="md">
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
      </Container> */}

      <Grid item xs={12}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
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
                      </Stack>
                    </Grid>
                  </StyledTableCell>
                  {assignState(nextActions[index]).map((myState) => (
                    <StyledTableCell key={uuid()} align="center">
                      {defColor(myState)}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                      <RouterLink to={`https://localhost:3000/tracking?batch=${batch}`}>
                        <IconButton aria-label="tracking-batch" sx={{ color: 'grey[800]' }} size="small">
                          <RemoveRedEyeRoundedIcon />
                        </IconButton>
                      </RouterLink>
                    </Stack>
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
    </>
  );
};

export default TableHarvest;
