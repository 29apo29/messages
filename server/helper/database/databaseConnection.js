const mongoose = require('mongoose');
const { MONGO_URI } = process.env;


//connecting to the mongo
const databaseConnection = () => {
  mongoose.connect(MONGO_URI)
  .then(res=>console.log('database connection successful'))
  .catch(err=>console.log('database connection has error',err));
}

module.exports = {databaseConnection}