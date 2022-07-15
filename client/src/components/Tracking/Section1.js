import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  useTheme,
  Paper,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import Wave from 'react-wavify';
import CloseIcon from '@mui/icons-material/Close';
import '../../App.css';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

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

const handleQR = () => {};

const Section1 = () => {
  const theme = useTheme();
  const [openBatch, setOpenBatch] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [stateLectorQR, setStateLectorQR] = useState(false);
  const [dataQR, setDataQR] = useState('');

  const [openLectorQR, setOpenLectorQR] = useState(false);

  const handleClickOpenLectorQR = () => {
    setOpenLectorQR(true);
  };

  const handleCloseLectorQR = () => {
    // setDataQR('');
    // setStateLectorQR(false);
    setOpenLectorQR(false);
  };

  return (
    <div id="section-1">
      <Box>
        <Wave
          className="wave-track"
          fill="#042A2B"
          paused={false}
          options={{
            height: 50,
            amplitude: 75,
            speed: 0.1,
            points: 5,
          }}
        />
        <Grid container className="intro-track">
          <Grid item xs={12}>
            <Typography
              className=" font-semibold title-track"
              sx={{
                textAlign: 'left',
                fontSize: '2rem',
                color: theme.palette.secondary.dark2,
              }}
            >
              Escanea el Código QR de tu Café
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box
              component="img"
              className="tracking-img"
              sx={{
                height: 105,
                width: 130,
                maxHeight: { xs: 55, md: 85 },
                maxWidth: { xs: 80, md: 100 },
                marginTop: 15,
                marginLeft: 68,
              }}
              alt="Scan the QR of your coffee product"
              src="/static/images/track4.svg"
            />
          </Grid>
        </Grid>

        <Grid container maxWidth="600px">
          <Grid item xs={12} sx={{ marginBottom: 2, marginLeft: 5, marginTop: 0 }}>
            <Card className="section-1-card">
              <CardContent>
                <Typography className="section-1-info">
                  Tu producto ha sido identificado a través de su lote de origen, el mismo que ha sido modificado
                  durante las siguientes etapas:
                  <br />
                  {bull} Cosecha
                  {bull} Procesado {bull} Catación {bull} Venta del Grano
                  {bull} Bodegaje {bull} Transporte a Empacador
                  {bull} Empacado {bull} Transporte a Retailer
                  {bull} Retailer
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: 5, marginLeft: 5 }}>
            <Button
              className="font-bold track-btn"
              variant="contained"
              size="medium"
              color="primary"
              sx={{ marginRigth: 2 }}
            >
              <a
                className="font-bold batch-track"
                href="http://localhost:3000/tracking?batch=0x6B4964E34816C7FF32EA3787c2C615E583715197"
                target="_blank"
                rel="noreferrer"
              >
                LOTE DE EJEMPLO
              </a>
            </Button>
            <Button
              className="font-bold track-btn"
              variant="contained"
              size="medium"
              color="primary"
              sx={{ marginLeft: 2 }}
              onClick={handleClickOpenLectorQR}
            >
              ESCANEAR QR
            </Button>
            <BootstrapDialog
              PaperProps={{ sx: { width: '40%' } }}
              aria-labelledby="customized-dialog-title"
              open={openLectorQR}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseLectorQR}>
                Lector QR
              </BootstrapDialogTitle>
              <DialogContent
                dividers
                // PaperProps={{ sx: { width: '80%' } }}
                sx={{
                  margin: 0,
                  padding: 0,
                  //   display: 'flex',
                  //   flexDirection: 'column',
                  //   alignContent: 'space-around',
                  //   flexWrap: 'wrap',
                  //   alignItems: 'flex-end',
                }}
              >
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item>
                    <QrReader
                      onResult={(result, error) => {
                        if (result) {
                          setDataQR(result?.text);
                          setStateLectorQR(true);
                        }
                      }}
                      containerStyle={{
                        marginTop: '0px',
                        paddingTop: '0px',
                        width: '450px',
                      }}
                    />
                  </Grid>
                  {stateLectorQR ? (
                    <Grid item>
                      <Typography
                        variant="body2"
                        sx={{ color: 'grey.700' }}
                        // color="text.secondary"
                      >
                        Puede consultar la trazabilidad de su café a través del siguiente enlace:{' '}
                        <a href={dataQR} className="my-batch">
                          {dataQR}
                        </a>
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item sx={{ paddingTop: '0px', marginTop: '0px' }}>
                      <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                        Coloque su código QR frente a la cámara.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
            </BootstrapDialog>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Section1;
