import React, { useState } from 'react';
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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import '../../App.css';

const DrawerHome = ({ links }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: { backgroundColor: theme.palette.secondary.light, opacity: 0.8 },
        }}
      >
        <List>
          {links.map((link, index) => (
            <ListItemButton
              onClick={() => {
                setOpen(false);
              }}
              key={index}
              divider
            >
              <ListItemIcon>
                <ListItemText
                // sx={{ color: 'white' }}
                >
                  {/* {link.label} */}

                  {/* text-white font-bold ml-5 p-5 rounded-xl mt-5 no-underline hover:text-gray-200 hover:bg-[#F9D2B4] */}
                  <RouterLink
                    key={index}
                    to={link.url}
                    // style={{ textDecoration: 'none' }}
                    className=" text-white
                    drawer-link"
                  >
                    {link.label}
                  </RouterLink>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: 'auto', color: 'white' }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerHome;
