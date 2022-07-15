import React from 'react';
import Wave from 'react-wavify';
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import '../../App.css';

const Home = () => {
  const theme = useTheme();

  return (
    <div id="who-we-are">
      <Box PaperProps={{ m: 0, p: 0 }}>
        <Wave
          className="wave"
          fill="#042A2B"
          paused={false}
          options={{
            height: 20,
            amplitude: 55,
            speed: 0.17,
            points: 5,
          }}
        />
        <Box className="intro">
          <Typography variant="h3" sx={{ color: theme.palette.secondary.dark2 }}>
            Bienvenido a CoffeeTrack
          </Typography>
          <Typography sx={{ color: theme.palette.grey[500], margin: 3 }}>
            Da seguimiento a tu café de especilidad a lo largo de toda la cadena de suministro. Permite que los
            consumidores conozcan tu producto, conecta y empodera a los participantes de tu cadena de suministro.
          </Typography>
          <RouterLink to={'/dashboard'} className="link-home">
            <Button className="font-bold" id="action-btn" variant="outlined">
              EMPEZAR
            </Button>
          </RouterLink>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
