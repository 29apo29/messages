require('dotenv').config();
const express = require('express');
const { databaseConnection } = require('./helper/database/databaseConnection');
const app = express();
const { PORT } = process.env;
const http = require('http');
const route = require('./router');
const customErrorHandler = require('./middleware/error/errorMiddleware');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});
// database connection
databaseConnection();

//adding json feature express
app.use(express.json());

// adding main route to /api 
app.use('/api', route);

io.on('connection', (socket) => {
  socket.on('room', room => {
    console.log(room);
    socket.join(room);
  })
  socket.on('chat', function (msg) {
    console.log(msg);
    io.emit('chat', msg);
  });
  console.log('user connected');
})

app.use(customErrorHandler);

//listening the server
server.listen(PORT, (err) => {
  if (err) throw new Error("Here");
  console.log(`App listening at ${PORT} port`);
})