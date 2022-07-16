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
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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
                <ListItemText sx={{ color: 'white' }}>{link.label}</ListItemText>
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
