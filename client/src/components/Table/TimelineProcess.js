import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import VerifiedIcon from '@mui/icons-material/Verified';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import RunningWithErrorsRoundedIcon from '@mui/icons-material/RunningWithErrorsRounded';

const TimelineProcess = ({ nextAction }) => {
  const theme = useTheme();
  const [stateArr, setStateArr] = useState([]);

  const assignState = (action) => {
    let arr = [];
    if (action === 'FARMER') {
      arr = [
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'PROCESSOR') {
      arr = [
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'TASTER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'SELLER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'WAREHOUSE') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'SHIPPER_PACKER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'PACKER') {
      arr = [
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'Completado',
        'En Proceso',
        'No Disponible',
        'No Disponible',
      ];
    } else if (action === 'SHIPPER_RETAILER') {
      arr = [
        'Completado',
        'Completado',
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
        'Completado',
        'Completado',
      ];
    }
    return arr;
  };

  const defSeparator = (myState) => {
    let icon = '';
    if (myState === 'En Proceso') {
      icon = <RunningWithErrorsRoundedIcon className="icon-warning" />;
    } else if (myState === 'No Disponible') {
      icon = <DoNotDisturbOnIcon className="icon-error" />;
    } else if (myState === 'Completado') {
      icon = <VerifiedIcon className="icon-success" />;
    }
    return <>{icon}</>;
  };

  useEffect(() => {
    setStateArr(assignState(nextAction));
  }, [nextAction]);

  return (
    <>
      <Timeline position="alternate">
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: 'text.secondary',
            }}
          >
            {stateArr[0]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[0])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Ingreso de Granja
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[0]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: 'text.secondary',
            }}
          >
            {stateArr[1]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[1])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Cosecha
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[1]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: 'text.secondary',
            }}
          >
            {stateArr[2]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[2])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Procesado
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[2]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[700],
            }}
          >
            {stateArr[3]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[3])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Catación
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[700],
              }}
            >
              {stateArr[3]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[4]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[4])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Venta de Grano
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[4]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[5]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[5])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Bodega
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[5]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[6]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[6])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Transporte hacia Empacador
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[6]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[7]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[7])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Empacado
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[7]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[8]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[8])}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Transporte hacia Retailer
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[8]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          {/* <TimelineOppositeContent
            sx={{
              fontWeight: 500,
              fontSize: '14px',
              color: theme.palette.grey[900],
            }}
          >
            {stateArr[9]}
          </TimelineOppositeContent> */}
          <TimelineSeparator>
            {defSeparator(stateArr[9])}
            {/* <TimelineConnector /> */}
          </TimelineSeparator>
          <TimelineContent sx={{ color: theme.palette.secondary.main2, fontWeight: 700, fontSize: '14px' }}>
            Retailer
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                color: theme.palette.grey[900],
              }}
            >
              {stateArr[9]}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default TimelineProcess;
