import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  CardHeader,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { saveSvgAsPng } from 'save-svg-as-png';
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
import CloseIcon from '@mui/icons-material/Close';

import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { walletAddressSelector } from '../../redux/appDataSlice';
import { getCoffeERC20, getUserERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import UserAdminForm from '../AddUserAdmin/UserAdminForm';
import FarmForm from '../AddFarmDetails/FarmForm';

function ShareSocialMedia(batch) {
  return (
    <Stack direction="row" spacing={1}>
      {/* <div> */}
      <FacebookShareButton
        url={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
        quote={'Modifica el estado de tu café 🥔☕️ accediendo al link: '}
        hashtag={'#coffeeTrackingAppEC'}
      >
        <FacebookIcon size={20} round />
      </FacebookShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <WhatsappShareButton
        url={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾  accediendo al link: '}
        separator={''}
      >
        <WhatsappIcon size={20} round />
      </WhatsappShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <EmailShareButton
        url={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
        subject={'LINK COFFEE 🥔 ☕️ TRACKING APP EC 👩‍🌾 🧑‍🌾'}
        body={'Hola!, modifica el estado de tu café 🥔 ☕️ accediendo al link: '}
        separator={'  '}
      >
        <EmailIcon size={20} round />
      </EmailShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <TelegramShareButton
        url={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
        title={'Modifica el estado de tu café 🥔☕️👩‍🌾🧑‍🌾 accediendo al link'}
      >
        <TelegramIcon size={20} round />
      </TelegramShareButton>
      {/* </div>{' '} */}
      {/* <div> */}
      <TwitterShareButton
        url={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// const bull = (
//   <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// );

const TableAdmin = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const walletAddress = useSelector(walletAddressSelector);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

  const assignState = (action) => {
    let arr = [];
    if (action === 'AGRICULTOR/PRODUCTOR') {
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
    } else if (action === 'PROCESADOR') {
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
    } else if (action === 'INSPECTOR DE GRANO/AGRICULTOR') {
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
    } else if (action === 'AGLOMERADOR') {
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
    } else if (action === 'TRANSPORTISTA A EMPACADORA') {
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
    } else if (action === 'EMPACADORA') {
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
    } else if (action === 'TRANSPORTISTA A RETAILER') {
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

  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };
  const handleCloseUser = () => {
    setOpenUser(false);
  };
  const handleClickOpenBatch = () => {
    setOpenBatch(true);
  };
  const handleCloseBatch = () => {
    setOpenBatch(false);
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
      <Grid item xs={12} sx={{ paddingTop: '0px', marginTop: '0px' }}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 5, sm: 5, md: 35 }}
          // sx={{
          //   display: 'flex',
          //   justifyContent: 'center',
          // }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            // sx={{ margin: '0px 50px 0px 0px' }}
          >
            <Card
              sx={{
                minWidth: 275,
              }}
            >
              <CardHeader title="Usuarios" />
              <CardMedia component="img" height="194" alt="Agricultor de café" image="/static/images/farmer2.jpg" />

              <CardActions>
                <Button size="small" onClick={handleClickOpenUser}>
                  AGREGAR USUARIO
                </Button>
                <BootstrapDialog
                  // onClose={handleClose} // hace q si cliqueo en cualquier lugar cierre el popup
                  aria-labelledby="customized-dialog-title"
                  open={openUser}
                >
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUser}>
                    Agregar Datos de Usuario
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <UserAdminForm />
                  </DialogContent>
                </BootstrapDialog>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            // sx={{ margin: '0px 50px 0px 0px' }}
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              sx={{
                minWidth: 275,
              }}
            >
              <CardHeader title="Lotes de Café" />
              <CardMedia component="img" height="194" alt="Lotes de café" image="/static/images/lote1.jpg" />
              <CardActions>
                <Button size="small" onClick={handleClickOpenBatch}>
                  AGREGAR LOTE
                </Button>
                <BootstrapDialog
                  // onClose={handleClose} // hace q si cliqueo en cualquier lugar cierre el popup
                  aria-labelledby="customized-dialog-title"
                  open={openBatch}
                >
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseBatch}>
                    Agregar Información de la Granja
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <FarmForm />
                  </DialogContent>
                </BootstrapDialog>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            // sx={{ margin: '0px 50px 0px 0px' }}
            xs={12}
            sm={6}
            md={3}
          >
            <Card
              sx={{
                minWidth: 275,
              }}
            >
              <CardHeader title="Resumen" />

              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Usuarios agregados:
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {users.length}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography color="text.secondary" variant="subtitle2">
                    Lotes de café agregados:
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {batchNo.length}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '50px' }}>
        <TableContainer sx={{ maxHeight: '1000px', boxShadow: 8, borderRadius: 1 }} component={Paper}>
          <Table sx={{ minWidth: '2100px' }} aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO. LOTE</StyledTableCell>
                <StyledTableCell align="center">CÓDIGO QR</StyledTableCell>
                <StyledTableCell align="center">COSECHA</StyledTableCell>
                <StyledTableCell align="center">PROCESADO</StyledTableCell>
                <StyledTableCell align="center">INSPECCIÓN DEL GRANO</StyledTableCell>
                <StyledTableCell align="center">AGLOMERADO</StyledTableCell>
                <StyledTableCell align="center">TRANSPORTE A EMPACADORA</StyledTableCell>
                <StyledTableCell align="center">EMPACADO</StyledTableCell>
                <StyledTableCell align="center">TRANSPORTE A RETAILER</StyledTableCell>
                <StyledTableCell align="center">RETAILER</StyledTableCell>
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
                        <QRCode
                          bgColor="#FFFFFF"
                          id="miQR"
                          value={`https://192.168.100.4:3000/dashboard/?batch=${batch}`}
                          size="100"
                          includeMargin
                          renderAs="svg"
                        />

                        <div>
                          <Chip
                            onClick={() => {
                              saveSvgAsPng(document.getElementById('miQR'), `QR_lote_${batch}.png`, {
                                scale: 60,
                              });
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
                <StyledTableRow style={{ height: 166 * emptyRows }}>
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
