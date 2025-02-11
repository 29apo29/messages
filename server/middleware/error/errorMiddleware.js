const CustomError = require("../../helper/error/CustomError");

//error middleware
// this middleware very clear in my opinion
const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  //DEBUGGERS;
  console.log('MIDDLEWARE');
  console.log(customError);

  if(customError.message.indexOf('Cannot read properties') != -1){
    customError = new CustomError("Bad Request", 400);
  }

  if (customError.name == "CastError") {
    customError = new CustomError("Bad Request", 400);
  }
  if (customError.code == 11000) {
    let objectKeys = Object.keys(customError.keyPattern);
    customError.message = `The ${objectKeys[0]} is already used`;
    customError.status = 400;
  }
  res
    .status(customError.status || 500)
    .json({
      status: false,
      message: customError.message
    })
}

module.exports = customErrorHandler;