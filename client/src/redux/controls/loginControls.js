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

export const afterLogin = data => {
  const tokenAuth = data.user.authorizations.filter(e => e.useragent === window.navigator.userAgent); //getting authorizaton object it has same useragent with the client
  const token = tokenAuth.slice(-1)[0].token; // if the array has element more than one take the last element's token
  localStorage.setItem('refresh',token);  // writing token in localstorage
}