import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography } from '@mui/material';

export default function PhaseCard(props) {
  return (
    <Card sx={{ maxWidth: 300 }} className="min-h-[350px] min-w-[300px]">
      <CardHeader
        avatar={<img src={`static/icons/${props.icon}`} alt="" className="h-12 w-12 mb-2" />}
        title={props.title}
        subheader={props.date}
      />
      <div className="absolute right-0 top-0 mt-8 mr-4">
        {props.verificate ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 pb-2 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )}
      </div>
      <div className="bg-[#042A2B] h-1 w-[85%] mx-auto" />
      {props.verificate && 
      <CardActions>
        <a href={props.url} target="_blank" rel="noopener noreferrer" className='w-full flex justify-center mt-2 text-gray-500 hover:text-[#ff2f00]'>
          <div className='flex'>
            <p>Ver en Etherscan</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </a>
      </CardActions>}
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
