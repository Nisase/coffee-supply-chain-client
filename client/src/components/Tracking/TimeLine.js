import { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { Button, Grid, Typography, Tooltip } from '@mui/material';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';
import AskHarvest from '../../logic/GetHavest/AskHarvest';
import AskProcess from '../../logic/GetProcess/AskProcess';
import AskGrainInspection from '../../logic/GetGrainInspection/AskGrainInspection';




const TimeLine = ({ batchNoIn }) => {
  const [nextAction, setNextAction] = useState({});
  const [harversData, setHarversData] = useState({});
  const [processData, setProcessData] = useState({});
  const [inspectData, setInspectData] = useState({});

  // https://docs.ethers.io/v5/concepts/events/
  // http://localhost:3000/tracking?batch=0x6B4964E34816C7FF32EA3787c2C615E583715197


  useEffect(() => {
    const de = async () => {
      const erc = getCoffeERC20();
      const events = await erc.queryFilter(erc.filters.SetFarmDetails(null));
      const batchTemp = events.map((event) => event.args.batchNo);
      const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });
      
      setNextAction(await AskNextAction({ batchNo:  batchNoIn}));
      setHarversData(await AskHarvest({ batchNo:  batchNoIn}));
      setProcessData(await AskProcess({ batchNo:  batchNoIn}));
      setInspectData(await AskGrainInspection({ batchNo:  batchNoIn}));
      console.log(nextAction)
      console.log(inspectData)
      // setBatchNo(batchTemp);
      // setNextActions(await Promise.all(nextActionsTemp));
    };
    de()
  }, []);

  return (
      <Grid className='cursor-default relative'>
        <p className='text-center font-bold text-xl'>Tracking Coffe</p>
        <p className='text-center my-4'>Bach #: <span className='underline '>{batchNoIn}</span></p>
        <div style={{backgroundImage:"url(static/icons/data_shapes.svg)"}} className="w-full h-full absolute opacity-10"><br/></div>
        <Timeline>
          <TimelineItem className="relative">
          {
            false && <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
              9:30 am
            </TimelineOppositeContent>
          }
            <TimelineSeparator>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/cosecha.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '16px', px: 2 }}>
              <Typography variant="h6" component="span">
              Cosecha
              </Typography>
              { harversData.data && <div className='flex flex-row'>
              <div className='flex flex-col w-8/12'>
              <Typography><span className='underline mr-2'>Familia:</span>{harversData.data.coffeeFamily}</Typography>
              <Typography><span className='underline mr-2'>Fertilizantes:</span>{harversData.data.coffeeFamily}</Typography>  
              </div>
              <div className='flex items-center justify-center w-full'>
              <div className='bg-gray-200 p-2 rounded-lg hover:cursor-pointer hover:underline'>
                Más Información
              </div>
              </div>
              </div>
              }
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            {
            false && <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
              10:00 am
            </TimelineOppositeContent>
            }
            <TimelineSeparator>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/proccess.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '16px', px: 2 }}>
              <Typography variant="h6" component="span">
                Procesado
              </Typography>
              { processData.data && <div className='flex flex-row'>
              <div className='flex flex-col w-8/12'>
              <Typography><span className='underline mr-2'>Secado:</span>{processData.data.typeOfDrying}</Typography>
              <Typography><span className='underline mr-2'>Tueste:</span>{processData.data.typeOfRoast}</Typography>  
              </div>
              <div className='flex items-center justify-center w-full'>
              <div className='bg-gray-200 p-2 rounded-lg hover:cursor-pointer hover:underline'>
                Más Información
              </div>
              </div>
              </div>
              }
            </TimelineContent>           
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/inspeccion.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
              <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Inspección del Grano
              </Typography>
              { inspectData.data && <div className='flex flex-row'>
              <div className='flex flex-col w-8/12'>hol
              </div>
              <div className='flex items-center justify-center w-full'>
              <div className='bg-gray-200 p-2 rounded-lg hover:cursor-pointer hover:underline'>
                Más Información
              </div>
              </div>
              </div>
              }
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/aglomerado.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Aglomerado
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/transporte.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Transporte a Empacadora
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/empacado.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Empacado
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/transporte.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Transporte a Retailer
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/retailer.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Retailer
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot variant="outlined" className='h-16 w-16'>
                <img alt="" src='static/icons/track.png' className='h-auto w-auto p-1'/>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '35px', px: 2 }}>
              <Typography variant="h6" component="span">
                Tracking
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
  );
};

export default TimeLine;
