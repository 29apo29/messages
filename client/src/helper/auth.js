import jwt from 'jwt-client';

export const authControl = ()=>{
  let token = localStorage.getItem('refresh');
  if(!token) token = sessionStorage.getItem('refresh');
  return token;
}

export const getToken = ()=>{
  let token = localStorage.getItem('refresh');
  if(!token) token = sessionStorage.getItem('refresh');
  if(token) return token;
  return 0;
}


export const openJwt = (token)=>{
  const values = jwt.read(token).claim;
  return {name:values.name,username:values.username,email:values.email,exp:values.exp}
}