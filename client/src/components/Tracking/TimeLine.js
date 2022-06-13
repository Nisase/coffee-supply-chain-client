import { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { Grid, Container, Typography, Tooltip } from '@mui/material';
import { getCoffeERC20 } from '../../logic/erc20';
import AskNextAction from '../../logic/GetNextAction/AskNextAction';

const TimeLine = ({ batchNoIn }) => {
  const [batchNo, setBatchNo] = useState([]);
  const [nextActions, setNextActions] = useState([]);

  // https://docs.ethers.io/v5/concepts/events/

  useEffect(() => {
    const de = async () => {
      const erc = getCoffeERC20();
      const events = await erc.queryFilter(erc.filters.SetFarmDetails(null));
      const batchTemp = events.map((event) => event.args.batchNo);
      const nextActionsTemp = batchTemp.map(async (item) => {
        const res = await AskNextAction({ batchNo: item });
        return res.data;
      });
      // Now that all the asynchronous operations are running, here we wait until they all complete.
      // return baz(await Promise.all(results));
      setBatchNo(batchTemp);
      setNextActions(await Promise.all(nextActionsTemp));
    };
    de();
  }, []);

  return (
    <>
      <Grid item xs={12}>
        {batchNoIn}
        <Container maxWidth="md">
          {batchNo.length > 0 &&
            batchNo.map((batch, index) => (
              <div key={index} className="my-10">
                <Tooltip title="Copiar" placement="top">
                  <div
                    className="mr-10 text-black hover:cursor-default"
                    onClick={() => {
                      navigator.clipboard.writeText(`https${batch}`);
                    }}
                    aria-hidden="true"
                  >
                    {batch}
                  </div>
                </Tooltip>
                NEXT ACTION: {nextActions[index]}
              </div>
            ))}
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
              9:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>FAstFood</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Eat
              </Typography>
              <Typography>Because you need strength</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
              10:00 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">Laptop</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Code
              </Typography>
              <Typography>Because it&apos;s awesome!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                Hotel
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Sleep
              </Typography>
              <Typography>Because you need rest</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
              <TimelineDot color="secondary">Repeat</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Repeat
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    </>
  );
};

export default TimeLine;
