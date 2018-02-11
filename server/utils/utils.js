module.exports = {
  ioWrapper(io) {
    return new Promise((resolve, reject) => {
      io.on('connection', (socket) => {
        if(!socket) {
          reject('Socket Error');
        }
        resolve(socket)
      });
    })
  }
}
