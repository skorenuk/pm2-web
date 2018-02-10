const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const IoServer = require('socket.io');
var { Server } = require('http');
// const childProcess = require('child_process');
// const pm2 = require('pm2');

/*
* Init App and IO
*/
const app = new Express();
const server = new Server(app)
const io = new IoServer(server);

/* Routes */
const pm2Admin = require('./routes/pm2-admin');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', Express.static(path.resolve(__dirname, '..', 'public')));

app.use('/api/pm2', pm2Admin);

const port = process.env.API_PORT || 8050;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
