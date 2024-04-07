import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, Avatar, List, ListItem, ListItemText, Grid, InputLabel, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/messages.css';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import { socket } from '../helper/socket';


const Message = ({ drawerUpdate }) => {
  return (
    <>
      <TopBar drawerUpdate={drawerUpdate} />
      <MessagesBar />
      <NewMessage />
    </>
  )
}

const NewMessage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connection', onConnect);
    socket.emit('room', '2');
    return () => {
      socket.off('connection', onConnect);
    };
  }, []);

  const sendMessage = e => {
    socket.emit('chat', { name: 'a', message: "Iamhere" });
  }
  return (
    <>
      <Box sx={{ p: 1 }}>
        {/* <TextField label="Size" id="outlined-size-normal" defaultValue="Normal" /> */}
        <FormControl fullWidth sx={{ m: 0, p: 0 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-newMessage">Message...</InputLabel>
          <OutlinedInput
            id="outlined-adornment-newMessage"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <SendIcon onClick={sendMessage} />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
    </>
  )
}

const MessagesBar = (messages) => {
  return (
    <>

      <List id="messagesOuterBox" sx={{
        maxHeight: '80vh',
        overflow: "hidden",
        overflowY: "auto",
        p: 0
      }}>
        <ListItem key="1">
          <Grid container justifyContent={'end'} >
            <Grid item sx={{ p: 2 }} >
              <Grid item xs={12}>
                <ListItemText align="right" primary="Hey man, What's up ?" ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="left" secondary="09:31"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </>
  )
}

const TopBar = ({ drawerUpdate }) => {
  const status = false;
  const theme = createTheme({
    palette: {
      primary: {
        light: '#eeeeee',
        main: '#9e9e9e',
        dark: '#212121',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ bgcolor: status ? '#2e7d32' : 'none' }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              sx={{
                display: {
                  xs: 'inline-flex',
                  md: 'none'
                }
              }}
              onClick={drawerUpdate(true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              29apo29
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              29apo29
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Avatar sx={{ width: 48, height: 48 }} alt="Remy Sharp" src="https://pbs.twimg.com/profile_images/1753174045833502720/stwY2NPS_400x400.jpg" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Message