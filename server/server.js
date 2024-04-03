require('dotenv').config();
const express = require('express');
const { databaseConnection } = require('./helper/databaseConnection');
const app = express();
const { PORT } = process.env;

app.use(express.json());

app.get('',(req,res)=>{
  res.json({status:1})
});

databaseConnection();

app.listen(PORT,(err)=>{
  if(err) throw new Error("Here");
  console.log(`App listening at ${PORT} port`);
})