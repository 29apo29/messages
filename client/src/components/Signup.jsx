import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupState } from './signupSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.signup.values);
  const onInpF = (name, value) => {
    dispatch(setSignupState({ name, value }));
  }
  return (
    <Container>
      <Grid container justifyContent="center" sx={{ marginTop: 8 }} spacing={4}>
        <Grid item
          component="div"
          display={{ xs: "none", md: "block" }}
          sm={1}
          md={7}>
          <Box sx={{ bgcolor: 'red', width: '30%', height: '30vh' }}></Box>
        </Grid>
        <Grid item
          component="form"
          sm={8}
          md={5}>
          <Typography component="h1" variant='h4' sx={{ textAlign: 'center' }}>SIGN UP</Typography>
          <TextField
            helperText={state.wrongInputs.indexOf('name') !== -1 ? "Name has to contain at least 3 character." : false}
            error={state.wrongInputs.indexOf('name') !== -1}
            margin='normal'
            value={state.name}
            onChange={e => onInpF('name', e.target.value)}
            required
            fullWidth
            id="name"
            name="name"
            label="Name" />
          <TextField
            helperText={state.wrongInputs.indexOf('username') !== -1 ? "Username has to contain at least 6 character." : false}
            error={state.wrongInputs.indexOf('username') !== -1}
            margin='normal'
            value={state.username}
            onChange={e => onInpF('username', e.target.value)}
            required
            fullWidth
            id="username"
            name="username"
            label="Username" />
          <TextField
            helperText={state.wrongInputs.indexOf('email') !== -1 ? "Please write a real email." : false}
            error={state.wrongInputs.indexOf('email') !== -1}
            margin='normal'
            value={state.email}
            onChange={e => onInpF('email', e.target.value)}
            required
            fullWidth
            id="email"
            name="email"
            label="Email address or Username" />
          <TextField
            helperText={state.wrongInputs.indexOf('password') !== -1 ? "Password has to contain at least 8 character." : false}
            error={state.wrongInputs.indexOf('password') !== -1}
            margin='normal'
            value={state.password}
            onChange={e => onInpF('password', e.target.value)}
            required
            fullWidth
            id="password" name="password" type='password' label="Password" />
          <TextField
            helperText={state.wrongInputs.indexOf('passwordAgain') !== -1 ? "Passwords does not match." : false}
            error={state.wrongInputs.indexOf('passwordAgain') !== -1}
            margin='normal' value={state.passwordAgain}
            onChange={e => onInpF('passwordAgain', e.target.value)}
            required
            fullWidth
            id="passwordAgain"
            name="passwordAgain"
            type='password'
            label="Password again"
          />
          <Button disabled={!state.isReady} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="center" spacing={4}>
            <Grid item>
              <Link href="#" underline="hover" variant='body2'>Have account?</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;