const asyncHandler = require('express-async-handler');

const login = asyncHandler((req,res,err)=>{
  res.json({a:1})
})