import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, passwordUpdateFetch } from "../redux/slices/passwordSlice";
import { useTheme } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { editInfoInputControl } from "../redux/controls/editInfoControls";
import { editInfoFetch, reset } from "../redux/slices/editInfoSlice";
import { editInfo, login } from "../redux/slices/authSlice";

const Profile = () => {
  const [isDialog, setIsDialog] = useState(false);
  const state = useSelector((state) => state.password.values);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDialog = (status) => {
    setIsDialog(status);
  };

  return (
    <Container>
      <Grid container justifyContent="center" sx={{ marginTop: 8 }} spacing={4}>
        <Grid item component="div" sm={12}>
          <Box
            sx={{
              width: "100%",
              height: "30vh",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Grid
              container
              flexDirection={{ md: "column", xs: "row" }}
              justifyContent="center"
              pl={4}
            >
              <Grid
                item
                xs={12}
                md={6}
                flexDirection={{ md: "column", xs: "row" }}
              >
                <Grid>
                  <IconButton
                    onClick={(E) => handleDialog(true)}
                    sx={{ p: 0, m: 0, height: "auto", aspectRatio: "1/1" }}
                  >
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      src={authState.profilephoto}
                    />
                  </IconButton>
                </Grid>
                <InfoBar name="Name" val={`${authState.name}`} code="name" />
                <InfoBar
                  name="Username"
                  val={`${authState.username}`}
                  code="username"
                />
                <InfoBar name="About" val={`${authState.bio}`} code="bio" />
                <InfoBar name="Email" val={`${authState.email}`} code="email" />
              </Grid>
              <PasswordUpdateBar />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={isDialog}
        onClose={() => handleDialog(false)}
        sx={{ width: "100%" }}
        fullScreen={fullScreen}
      >
        <DialogTitle>
          <DialogActions flexDirection="column">
            <Button onClick={() => handleDialog(false)}>
              Change Profile Photo
            </Button>
          </DialogActions>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              aspectRatio: "1/1",
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            src={authState.profilephoto}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

const PasswordUpdateBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.password.values);
  const fetchState = useSelector((state) => state.password.forFetch);
  const authState = useSelector(state=> state.auth);
  const onInpF = (name, value) => {
    dispatch(change({ name, value }));
  };
  const submitPost = e=>{
    dispatch(passwordUpdateFetch({token:authState.accessToken}));
  }
  useEffect(()=>{
    if(fetchState.error){
      console.log(fetchState.error);
    }
    if(fetchState.data){
      alert(1);
    }
  },[fetchState])
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h5" component="h5" mt={2}>
        Password Update
      </Typography>
      <TextField
        helperText={
          state.wrongInputs.indexOf("password") !== -1
            ? "Password has to contain at least 8 character."
            : false
        }
        error={state.wrongInputs.indexOf("password") !== -1}
        margin="normal"
        value={state.password}
        onChange={(e) => onInpF("password", e.target.value)}
        required
        fullWidth
        id="password"
        name="password"
        type="password"
        label="Password"
      />
      <TextField
        helperText={
          state.wrongInputs.indexOf("passwordAgain") !== -1
            ? "Passwords does not match."
            : false
        }
        error={state.wrongInputs.indexOf("passwordAgain") !== -1}
        margin="normal"
        value={state.passwordAgain}
        onChange={(e) => onInpF("passwordAgain", e.target.value)}
        required
        fullWidth
        id="passwordAgain"
        name="passwordAgain"
        type="password"
        label="Password again"
      />
      <Button
        disabled={!state.isReady && !fetchState.isLoading}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        onClick={submitPost}
      >
        Update
      </Button>
    </Grid>
  );
};

const InfoBar = ({ name, val = "", code }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const fetchState = useSelector((state) => state.editInfo);
  const [inpValue, setInpValue] = useState(val);
  const [isEditing, setIsEditing] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const handleChange = (e) => {
    setIsReady(editInfoInputControl(code, e.target.value));
    setInpValue(e.target.value);
  };
  const handleSave = () => {
    dispatch(
      editInfoFetch({ token: authState.accessToken, code, value: inpValue })
    );
  };
  useEffect(() => {
    setInpValue(val);
  }, [isEditing]);
  useEffect(() => {
    if (fetchState.error) {
      alert("There is an error!");
      dispatch(reset());
    }
    if (fetchState.data) {
      val = inpValue;
      setIsEditing(false);
      dispatch(editInfo({ [code]: val }));
      dispatch(login(fetchState.data));
      console.log(fetchState.data);
      dispatch(reset());
    }
  }, [fetchState]);
  return !isEditing ? (
    <Grid>
      <Typography variant="subtitle1" display="block">
        <Typography variant="subtitle2" component="div">
          {name}
        </Typography>
        {val !== "" && val !== undefined ? (
          val
        ) : (
          <Typography variant="subtitle2" component="span" disabled>
            empty
          </Typography>
        )}
        <IconButton onClick={() => setIsEditing(true)}>
          <EditIcon />
        </IconButton>
      </Typography>
    </Grid>
  ) : (
    <Grid
      container
      sx={{
        mb: 1,
        mt: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      <Grid item sx={{ flexGrow: 1, flexDirection: "column" }}>
        <Typography variant="subtitle2" component="div">
          {name}
        </Typography>
        <TextField
          autoComplete="none"
          label={name}
          variant="standard"
          value={inpValue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item>
        <IconButton
          color="danger"
          disabled={fetchState.isLoading}
          onClick={() => setIsEditing(false)}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          color="success"
          disabled={!isReady || fetchState.isLoading}
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Profile;
