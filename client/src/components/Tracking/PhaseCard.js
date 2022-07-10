import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export default function PhaseCard(props) {

  return (
    <Card sx={{ maxWidth: 300 }} className="min-h-[350px] mx-2">
      <CardHeader
        avatar={
          <img src={`static/icons/${props.icon}`} alt="" className='h-12 w-12 mb-2'/>
        }
        
        title={props.title}
        subheader={props.date}
      />
      <div className='bg-gray-200 h-1 w-[85%] mx-auto' />
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}