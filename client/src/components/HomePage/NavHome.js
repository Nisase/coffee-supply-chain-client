import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Tabs, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo';
import DrawerHome from './DrawerHome';
import '../../App.css';

const NavHome = ({ links }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

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
            <div className='flex w-full'>
              <div className='w-4/12'>
                <Typography component={'span'}>
                  <Logo />
                </Typography>
              </div>
              <div className='w-8/12 flex justify-end'>
                  {links.map((link, index) => (
                    <RouterLink
                      key={`${index}_${link.url}`}
                      to={link.url}
                      className="text-white lg:h-10 font-bold ml-5 p-5 rounded-xl mt-6 no-underline hover:text-gray-200 hover:bg-[#ff2f00]"
                    >
                      {link.label}
                    </RouterLink>
                  ))}
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavHome;
