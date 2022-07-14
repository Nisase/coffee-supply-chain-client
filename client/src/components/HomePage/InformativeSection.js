import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
} from '@mui/material';
import '../../App.css';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const InformativeSection = () => {
  const theme = useTheme();
  return (
    <div id="about">
      <Grid container>
        <Grid
          item
          xs={12}

          // sx={{ marginTop: 5 }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, display: 'flex', justifyContent: 'center' }}
          >
            Nuestro <span className="spanInfo">Sistema de Tracking </span> está construido sobre la tecnología{' '}
            <span className="spanInfo">Blockchain</span>
          </Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 3 }} className="about-card">
            <CardMedia
              component="img"
              height="194"
              image="https://cdn.techwireasia.com/wp-content/uploads/2021/01/shutterstock_1079935373-897x500.png"
              alt="blockchain technology"
            />
            <CardHeader title="¿Qué es la tecnología blockchain?" />

            <CardContent>
              <Typography variant="body2" className="about-info">
                La cadena de bloques o blockchain es un libro mayor digital replicado, distribuido, compartido e
                inmutable que permite realizar transacciones seguras entre dos participantes sin autoridad central,
                registrar el proceso de transacciones y el seguimiento de activos en una red de negocios. Blockchain
                utiliza contratos inteligentes para codificar la lógica de negocio relacionada con el intercambio de
                bienes o servicios, permitiendo la verificación y liquidación de promesas contractuales sin intervención
                humana.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 3 }} className="about-card">
            <CardMedia
              component="img"
              height="218"
              image="/static/images/supplychain.png"
              // image="https://ifssportal.nutritionconnect.org/sites/default/files/styles/teaser/public/images/S96.png?itok=s-35oeBz"
              alt="blockchain in traceability on supply chains"
            />
            <CardHeader title="Blockchain en la trazabilidad de cadenas de suministro" />

            <CardContent>
              <Typography variant="body2" className="about-info">
                A lo largo de la cadena de suministro, blockchain facilita:
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1.5 }}>
                {bull} Obtener y entregar datos de manera inmediata, compartida y transparente.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1.5 }}>
                {bull} Almacenar los datos en un libro mayor distribuido e inalterable.{' '}
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1.5 }}>
                {bull} Tener una fuente de consulta única para todos los partícipes de la cadena de suministro.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1.5 }}>
                {bull}La confianza entre las partes de una cadena de suministro y del cliente final con el proceso.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} />

        <Grid
          item
          xs={12}

          // sx={{ marginTop: 5 }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, display: 'flex', justifyContent: 'center' }}
          >
            ¿Cómo funciona <span className="spanInfo">CoffeeTrack</span>?
          </Typography>
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 3 }} className="about-card">
            <CardMedia
              component="img"
              height="194"
              image="https://www.godfatherstyle.com/wp-content/uploads/2022/01/Blockchain-3.png"
              // image="/static/images/smart-contract1.jpg"
            />
            <CardHeader title="1. Contratos inteligentes desplegados en la blockchain" />

            <CardContent>
              <Typography variant="body2" className="about-info">
                Los contratos inteligentes que permiten realizar el seguimiento del café de especialidad por su cadena
                de suministro fueron desplegados en la blockchain de prueba de Rinkeby.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1 }}>
                {bull}Puedes consultarlos accediendo a los siguientes enlaces.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 3 }} className="about-card">
            <CardMedia
              component="img"
              height="194"
              image="https://images.ctfassets.net/9sy2a0egs6zh/6ngCUoU36ABPjs6cDNnuoK/a4b9e978595248dbb685aa2c53e3f4dc/download-extension.png"
              // image="/static/images/metamask.png"
              alt="blockchain technology"
            />
            <CardHeader title="2. Usa la billetera digital de Metamask para interactuar con los contratos inteligentes" />

            <CardContent>
              <Typography variant="body2" className="about-info">
                La billetera digital de Metamask permite interactuar con los contratos inteligentes a través de nuestra
                aplicación. Todos los usuarios que interactúan con los contratos inteligentes deben ser previamente
                habilitados para hacerlo.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1 }}>
                {bull}Si ya eres usuario de nuestra aplicación, asegúrate de instalar la extensión de Metamask en tu
                navegador.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1 }}>
                {bull}Si eres productor de café de especialidad y deseas dar seguimiento a tu producto, contáctanos al
                siguiente correo, nos gustaría ayudarte.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 3 }} className="about-card">
            <CardMedia
              component="img"
              height="194"
              // image="https://cdn.techwireasia.com/wp-content/uploads/2021/01/shutterstock_1079935373-897x500.png"
              image="/static/images/qrcoffe.png"
              alt="blockchain technology"
            />
            <CardHeader title="3. Escanea el código QR de tu producto" />

            <CardContent>
              <Typography variant="body2" className="about-info">
                El producto de venta al público contiene un código QR que al ser escaneado, redirije a una página de
                nuestra aplicación correspondiente al historial del producto a lo largo de su cadena de suministro.
              </Typography>
              <br />
              <Typography variant="body2" className="about-info" sx={{ marginLeft: 1 }}>
                {bull}Si eres consumidor de café de especialidad, escanea tu código y empodera a quienes permitieron que
                el producto llegue a tu manos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </div>
  );
};

export default InformativeSection;
