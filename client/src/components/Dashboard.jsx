import { Box, Container, Drawer, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MiniUser from './MiniUser';
import Message from './Message';
import SearchIcon from '@mui/icons-material/Search';
import { socket } from '../helper/socket';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerUpdate = (status) => () => {
    setIsOpen(status)
  }

  return (
    <Container sx={{ display: 'flex', maxHeight: '100vh' }} flexDirection="row">
      <Box
        width={{
          xs: '0%',
          md: '34%'
        }}>
        {/* <IconButton
          sx={{
            display: {
              xs: 'inline-flex',
              md: 'none'
            }
          }}
          onClick={drawerUpdate(true)}>
          <MenuIcon />
        </IconButton> */}
        <Drawer open={isOpen}
          sx={{
            display: {
              xs: 'block',
              md: 'none'
            },
            overflow: 'hidden',
            overflowY: 'scroll'
          }} onClose={drawerUpdate(false)}>

          <Grid sx={{ pl: 4, pr: 4, pt: 4 }} container rowSpacing={0} flexDirection={{ xs: 'column' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <SearchBar />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
            <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          </Grid>

        </Drawer>

        <Grid
          id="usersOuterBox"
          sx={{
            pl: 2, pr: 2,
            display: {
              xs: 'none',
              md: 'flex'
            },
            maxHeight: '100vh',
            overflow: 'hidden',
            overflowY: 'scroll',
            width: '100%'
          }} container flexDirection='row' columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item margin={{ xs: 1, md: 1 }} width="90%" ><SearchBar /></Grid>
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
          <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
        </Grid>
      </Box>
      <Box
        width={{
          xs: '100%',
          md: '65%'
        }}>
        <Message drawerUpdate={drawerUpdate} />
      </Box>
    </Container>
  )
}

const SearchBar = () => {
  return (
    <>
      <FormControl sx={{ width: '100%' }} variant="standard">
        <InputLabel htmlFor="filled-adornment-password">User Name</InputLabel>
        <Input
          id="filled-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )
}

export default Dashboard