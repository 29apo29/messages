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
import React, { useEffect, useRef, useState } from "react";
import MiniUser from "./MiniUser";
import Message from "./Message";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ContrastIcon from "@mui/icons-material/Contrast";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/themeSlice";
import { exit } from "../redux/slices/authSlice";
import { removeRefresh } from "../helper/browser";
import { Link, useNavigate } from "react-router-dom";
import { logoutFetch, resetLogoutState } from "../redux/slices/logoutSlice";
import { relatedFetch } from "../redux/slices/relatedSlice";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerUpdate = (status) => () => {
    setIsOpen(status);
  };

  return (
    <Container
      sx={{ display: "flex", maxHeight: "100vh", height: "100vh" }}
      flexDirection="row"
    >
      <Box
        width={{
          xs: "0%",
          md: "34%",
        }}
      >
        <Drawer
          open={isOpen}
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            overflow: "hidden",
            overflowY: "scroll",
            width:"100%",
            bgcolor:"red"
          }}
          onClose={drawerUpdate(false)}
          className="scroll-invisible"

        >
          <IconButton
            color="error"
            onClick={() => setIsOpen(false)}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Grid
            sx={{ pl: 4, pr: 4, pt: 4 }}
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
        <Message drawerUpdate={drawerUpdate} isOpen={isOpen}/>
      </Box>
    </Container>
  );
};
const Users = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.accessToken)
  const state = useSelector(state => state.related.values);
  const fetchState = useSelector(state => state.related.forFetch);
  useEffect(()=>{
    if(state.users === null){
      if(fetchState.data === null && token !== ''){
        dispatch(relatedFetch({token}));
      }
    }
  },[state,fetchState,token])
  return (
    <Grid sx={{mt:2,width:'100%'}}>
      { state.users === null || state.users.length === 0 ? <Typography sx={{textAlign:'center'}} textAlign="center" width="100%" variant='body1'> There is no one you are chatting with.</Typography>:
      state.users.map((user)=><MiniUser username={user.username} bio={user.bio} img={user.profilephoto} link={user.link} last={"sadasd"}  />)}
    </Grid>
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
  const dispatch = useDispatch();
  const logoutState = useSelector((state) => state.logout);
  const authState = useSelector((state) => state.auth);
  const clickHandler = () => {
    dispatch(setTheme());
  };
  const exitApp = () => {
    dispatch(logoutFetch({ token: authState.accessToken }));
  };
  useEffect(() => {
    if (logoutState.data !== null) {
      removeRefresh();
      dispatch(exit());
      dispatch(resetLogoutState());
    }
  }, [logoutState]);
  return (
    <Grid container sx={{ mt: 1 }}>
      <Link to="/profile" style={{textDecoration:"none", flexGrow: 1}}>
      <Grid item sx={{ marginRight: 1, flexGrow: 1 }}>
        <Card sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <Avatar
                sx={{
                  width: { xs: 48, md: 64 },
                  height: { xs: 48, md: 64 },
                  margin: "auto",
                }}
                alt={authState.name}
                src={authState.profilephoto}
              />
              <Typography
                display={{
                  xs: "none",
                  md: "block",
                }}
                textAlign="center"
                variant="body1"
              >
                {authState.username}
              </Typography>
            </Grid>
            <Grid
              Item
              sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
                paddingLeft: 2,
                flexGrow: 8,
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
                {authState.name}dasdas
              </Typography>
              <Typography
                display={{
                  xs: "none",
                  md: "flex",
                }}
                variant="body2"
              >
                {authState.name}
              </Typography>
              <Typography
                display={{
                  xs: "none",
                  md: "flex",
                }}
                variant="subtitle2"
              >
                {authState.bio}
              </Typography>
            </Grid>
          </Grid>
        </Card>

      </Grid>
      </Link>
      <Grid item>
        <Card sx={{ height: "calc(100% - 16px)", p: 1 }}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            flexDirection={{ xs: "row", md: "column" }}
          >
            <IconButton color="danger" onClick={exitApp}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton onClick={clickHandler}>
              <ContrastIcon />
            </IconButton>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
