import {
  Avatar,
  Box,
  Card,
  Container,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniUser from "./MiniUser";
import Message from "./Message";
import SearchIcon from "@mui/icons-material/Search";
import { socket } from "../helper/socket";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerUpdate = (status) => () => {
    setIsOpen(status);
  };

  return (
    <Container sx={{ display: "flex", maxHeight: "100vh" }} flexDirection="row">
      <Box
        width={{
          xs: "0%",
          md: "34%",
        }}
      >
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
        <Drawer
          open={isOpen}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            overflow: "hidden",
            overflowY: "scroll",
          }}
          onClose={drawerUpdate(false)}
          className="scroll-invisible"
        >
          <IconButton color="error" onClick={()=>setIsOpen(0)} sx={{position:'absolute',right:10,top:10}}>
            <CloseIcon/>
          </IconButton>
          <Grid
            sx={{ pl: 4, pr: 4, pt: 4}}
            container
            rowSpacing={0}
            flexDirection={{ xs: "row" }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <MiniMe />
            <SearchBar />
            <Users />
          </Grid>
        </Drawer>

        <Grid
          id="usersOuterBox"
          sx={{
            pl: 2,
            pr: 2,
            display: {
              xs: "none",
              md: "flex",
            },
            maxHeight: "100vh",
            overflow: "hidden",
            overflowY: "scroll",
            width: "100%",
          }}
          container
          flexDirection="row"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <MiniMe />
          <Grid item margin={{ xs: 1, md: 1 }} width="90%">
            <SearchBar />
          </Grid>
          <Users />
        </Grid>
      </Box>
      <Box
        width={{
          xs: "100%",
          md: "65%",
        }}
      >
        <Message drawerUpdate={drawerUpdate} />
      </Box>
    </Container>
  );
};
const Users = () => {
  return (
    <>
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
      <MiniUser bio="dfgjdsfkgkjdfgjkd" last="sanjdhaskdhas" />
    </>
  );
};

const SearchBar = () => {
  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel htmlFor="filled-adornment-password">User Name</InputLabel>
        <Input
          id="filled-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

const MiniMe = () => {
  return (
    <Link
      to="/profile"
      style={{ width: "100%", textDecoration: "none", margin: "0.5em" }}
    >
      <Card sx={{ p: 2 }}>
        <Grid container>
          <Grid item>
            <Avatar
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                margin: "auto",
              }}
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/1753174045833502720/stwY2NPS_400x400.jpg"
            />
            <Typography
              display={{
                xs: "none",
                md: "block",
              }}
              textAlign="center"
              variant="body1"
            >
              29apo29
            </Typography>
          </Grid>
          <Grid
            Item
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingLeft: 2,
            }}
          >
            <Typography
              display={{
                xs: "block",
                md: "none",
              }}
              textAlign="center"
              variant="body1"
            >
              asdsadsa
            </Typography>
            <Typography
              display={{
                xs: "none",
                md: "flex",
              }}
              variant="body2"
            >
              sadsad
            </Typography>
            <Typography
              display={{
                xs: "none",
                md: "flex",
              }}
              variant="subtitle2"
            >
              sadsad
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default Dashboard;
