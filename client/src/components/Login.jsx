import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFetch, setLoginState } from '../redux/slices/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state.login.values);
  const onInpF = (name,value)=>{
    dispatch(setLoginState({name,value}));
  }
  const fetchState = useSelector(state=>state.login.forFetch);
  const onSubmit = e=>{
    console.log('here')
    dispatch(loginFetch());
    e.preventDefault();
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
          onSubmit={onSubmit}
          sm={8}
          md={5}>
          <Typography component="h1" variant='h4' sx={{ textAlign: 'center' }}>SIGN IN</Typography>
          <TextField 
          helperText={state.wrongInputs.indexOf('username') !== -1?"Please write your email or username.":false}
          error={state.wrongInputs.indexOf('username') !== -1}
          margin='normal'
          value={state.username} 
          onChange={e=>onInpF('username',e.target.value)} 
          required 
          fullWidth 
          id="username" 
          name="username" 
          label="Email address or Username" />
          <TextField
          helperText={state.wrongInputs.indexOf('password') !== -1?"Password has to contain at least 8 character.":false}
          error={state.wrongInputs.indexOf('password') !== -1}
          margin='normal' 
          value={state.password} 
          onChange={e=>onInpF('password',e.target.value)} 
          required 
          fullWidth 
          id="password" 
          name="password" 
          type='password' 
          label="Password" />
          <FormControlLabel control={<Checkbox checked={state.rememberme}  onChange={e=>onInpF('rememberme',!state.rememberme)} value="remember" color="primary" />} label="Remember me" />
          <Button type='submit' disabled={!state.isReady || fetchState.isLoading} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent="space-between" spacing={4}>
            <Grid item>
              <Link href="#" underline="hover" variant='body2'>Can't login?</Link>
            </Grid>
            <Grid item>
              <Link href="#" underline="hover" variant='body2'>Don't have account?</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;