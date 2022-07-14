import React, { useState } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo';
import DrawerHome from './DrawerHome';
import '../../App.css';

const NavHome = ({ links }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch);

  const scrollWithOffset = (el, offset) => {
    window.scroll({
      top: el.offsetTop - offset,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography component={'span'}>
                <Logo />
              </Typography>
              <DrawerHome links={links} />
            </>
          ) : (
            <Grid
              sx={{ placeItems: 'center' }}
              container
              // spacing={2}
            >
              <Grid item xs={4}>
                <Typography component={'span'}>
                  <Logo />
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tabs
                  sx={{
                    // paddingTop: '22px',
                    color: theme.palette.secondary.dark2,
                  }}
                  value={value}
                  textColor="inherit"
                  onChange={(e, val) => {
                    setValue(val);
                  }}
                >
                  {links.map((link, index) => (
                    <Tab key={index} label={link} sx={{ fontSize: 'medium' }} />
                  ))}
                  {/* <HashLink to="/home#who-we-are" style={{ textDecoration: 'none' }}>
                    <Tab label="Inicio" sx={{ fontSize: 'medium', color: theme.palette.secondary.dark2, opacity: 1 }} />
                  </HashLink> */}
                  {/* <Link
                    // activeClass="active"
                    to="/#home"
                    spy
                    smooth
                    scroll={(el) => scrollWithOffset(el, 75)}
                    exact
                  >
                    <Tab label="Inicio" sx={{ fontSize: 'medium', color: theme.palette.secondary.dark2, opacity: 1 }} />
                  </Link>
                  <Link
                    // activeClass="active"
                    to="/#about"
                    spy
                    smooth
                    scroll={(el) => scrollWithOffset(el, 75)}
                    exact
                    // className="nav-link"
                    // style={{ textDecoration: 'none' }}
                  >
                    <Tab label="Acerca" sx={{ fontSize: 'medium', color: theme.palette.secondary.dark2, opacity: 1 }} />
                  </Link>
                  <Link
                    // activeClass="active"
                    to="/#contact"
                    spy
                    smooth
                    scroll={(el) => scrollWithOffset(el, 75)}
                    exact
                  >
                    <Tab
                      label="Contacto"
                      sx={{ fontSize: 'medium', color: theme.palette.secondary.dark2, opacity: 1 }}
                    />
                  </Link> */}
                </Tabs>
              </Grid>
              {/* <Grid item xs={1} /> */}
              {/* <Grid item xs={3}>
                <Box display="flex">
                  <Button sx={{ marginLeft: 'auto' }} variant="contained">
                    Login
                  </Button>
                  <Button sx={{ marginLeft: 1 }} variant="contained">
                    Login
                  </Button>
                </Box>
              </Grid> */}
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavHome;
