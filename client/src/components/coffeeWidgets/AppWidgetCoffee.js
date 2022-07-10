import { useState } from 'react';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputIcon from '@mui/icons-material/Input';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetCoffee.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
  altImg: PropTypes.string,
  image: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  dialogTitle: PropTypes.string,
};

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

export default function AppWidgetCoffee({
  title,
  altImg,
  image,
  buttonText,
  dialogTitle,
  Form,
  color = 'quaternary',
  sx,
  ...other
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        py: 0,
        boxShadow: 2,
        color: (theme) => theme.palette[color].darker,
        // textAlign: 'center',
        // bgcolor: (theme) => theme.palette[color].lighter,
        // background: (theme) =>
        //   `linear-gradient(135deg, ${alpha(theme.palette[color].darker, 0.9)} 0%, ${alpha(
        //     theme.palette[color].main,
        //     0.2
        //   )} 100%)`,
        ...sx,
      }}
      {...other}
    >
      <CardMedia component="img" height="194" alt={altImg} image={image} />
      <CardActions>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          size="small"
          onClick={handleClickOpen}
          sx={{
            color: (theme) => theme.palette.error.darker,
          }}
        >
          {buttonText}
        </Button>
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {dialogTitle}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Form />
          </DialogContent>
        </BootstrapDialog>
      </CardActions>
    </Card>
  );
}
