import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../redux/slices/passwordSlice";

const Profile = () => {
  const state = useSelector((state) => state.password.values);
  const dispatch = useDispatch();
  const onInpF = (name, value) => {
    dispatch(change({ name, value }));
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
            <IconButton
              onClick={(E) => alert("hede")}
              sx={{ p: 0, m: 0, height: "auto" }}
            >
              <Avatar
                sx={{ width: 150, height: 150, display: "inline-block" }}
                src={"./logo512.png"}
              />
            </IconButton>

            <Grid container flexDirection="column" pl={4}>
              <Grid item sm={12} md={6}>
                <Typography variant="h3" component="h3" mt={2}>
                  Abdullah ERGEN
                </Typography>
                <Typography variant="subtitle2" display="inline-block">
                  @29apo29
                </Typography>
                <Typography variant="subtitle1" display="block">
                  Son Işık Bükücü
                </Typography>
                <Typography variant="subtitle1" display="block">
                  theover29tr@gmail.com
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
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
                  disabled={!state.isReady}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
