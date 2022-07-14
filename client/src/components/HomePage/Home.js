import React from 'react';
import Wave from 'react-wavify';
import { Button, Box } from '@mui/material';
import '../../App.css';

const Home = () => {
  return (
    <div id="who-we-are">
      <Box PaperProps={{ m: 0, p: 0 }}>
        <Wave
          className="wave"
          fill="#042A2B"
          paused={false}
          options={{
            height: 50,
            amplitude: 45,
            speed: 0.15,
            points: 5,
          }}
        />
      </Box>
    </div>
  );
};

export default Home;
