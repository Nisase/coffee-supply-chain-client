import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Box, Typography, Grid } from '@mui/material';
import '../../App.css';

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
            Nuestro <span className="spanInfo">Sistema de Tracking </span> está construido sobre Blockchain
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default InformativeSection;
