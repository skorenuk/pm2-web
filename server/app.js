const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const IoServer = require('socket.io');
var { createServer } = require('http');
const pm2 = require('./module/pm2');
// const childProcess = require('child_process');
// const pm2 = require('pm2');

/*
* Init App and IO
*/
const app = new Express();

/* Routes */
const pm2Admin = require('./routes/pm2-admin');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const server = createServer(app);
const io = IoServer.listen(server);
// io.origins(['http://localhost:8081']);

app.use('/', Express.static(path.resolve(__dirname, '..', 'public')));

app.use('/api/pm2', pm2Admin);

const port = process.env.API_PORT || 8050;

/*app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});*/

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

io.on('connection', (socket) => {
  let interval;
  socket.on('subscribeToPM2', () => {
    interval = setInterval(async () => {
      const list = await pm2.getList();
      socket.emit('pm2:admin/lists', { list });
    }, 2000);
  });
  socket.on('unsubscribeFromPM2', () => {
    clearInterval(interval);
    interval = null;
  })
});
