const pm2 = require('pm2');

pm2.launchBus(function(err, bus) {
  bus.on('process:msg', function(packet) {
    console.log('packet')
    console.log('packet.data', packet.data)
    console.log(packet)
    // packet.data.success.should.eql(true);
    // packet.process.pm_id.should.eql(proc1.pm2_env.pm_id);
    // done();
  });
});

class Pm2Wrapper {
  connect() {
    return new Promise((resolve, reject) => {
      pm2.connect(async (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  disconnect() {
    pm2.disconnect();
  }

  getList() {
    return new Promise((resolve, reject) => {
      pm2.list((err, list) => {
        if (err) {
          reject(err);
        }
        resolve(list);
      });
    });
  }

  getInfo(id) {
    return new Promise((resolve, reject) => {
      pm2.describe(id, (err, processDescription) => {
        if (err) {
          reject(err);
        }
        resolve(processDescription);
      });
    });
  }

  start(cmd, opts) {
    if (!opts) {
      opts = {};
    }
    if (Array.isArray(opts.watch) && opts.watch.length === 0) {
      opts.watch = (opts.rawArgs ? !!~opts.rawArgs.indexOf('--watch') : !!~process.argv.indexOf('--watch')) || false;
    }

    return new Promise((resolve, reject) => {
      pm2.start(cmd, opts, (err, proc) => {
        if (err) {
          reject(err);
        }
        resolve(proc);
      })
    })
  }

  stop(id) {
    return new Promise((resolve, reject) => {
      pm2.stop(id, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    });
  }

  restart(id, opts) {
    return new Promise((resolve, reject) => {
      pm2.restart(id, {
        updateEnv: false,
        ...opts
      }, (err, proc) => {
        if (err) {
          reject(err);
        }
        resolve(proc);
      })
    });
  }

}

module.exports = new Pm2Wrapper();
