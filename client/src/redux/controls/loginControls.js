export const loginInputsControl = (values)=>{
  let isReady = true;
  let wrongInputs = [];
  if(values.username.length<6 || values.username.length>16){
    isReady = false;
    wrongInputs.push('username');
  }
  if(values.password.length<6 || values.password.length>28){
    isReady = false;
    wrongInputs.push('password');
  }
  return {isReady,wrongInputs}
}

export const afterLogin = (data,rememberme) => {
  if(rememberme) localStorage.setItem('refresh',data.token);  // writing token in localstorage
  else sessionStorage.setItem('refresh',data.token);  // writing token in Sessionstorage
}