import React from 'react';
import Wave from 'react-wavify';
import { Button, Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { walletAddressSelector } from '../../redux/appDataSlice';
import '../../App.css';

const Home = () => {
  const theme = useTheme();
  const walletAddress = useSelector(walletAddressSelector);
  const navigate = useNavigate();

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
          <Button
            className="font-bold"
            onClick={() => {
              if (walletAddress === '0x') {
                navigate('/login');
              } else {
                navigate('/dashboard');
              }
            }}
            id="action-btn"
          >
            DASHBOARD
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
