// var pm2 = require('pm2');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const pm2 = require('../module/pm2');
const { sendError } = require('./api-func');

router.route('/list')
  .get(async (req, res) => {
    await pm2.connect().catch(sendError.bind(res));
    const list = await pm2.getList().catch(sendError.bind(res));
    res.statusCode = 200;
    res.json(list);
    pm2.disconnect();
  });

router.route('/info')
  .post(async (req, res) => {
    const { id } = req.body;
    try {
      await pm2.connect();
      const info = await pm2.getInfo(id);
      res.statusCode = 200;
      res.json(info);
      pm2.disconnect();
    } catch (e) {
      sendError(res, e)
    }
  });

router.route('/start')
  .post(async (req, res) => {
    const { id } = req.body;
    let script = null;
    let proc = null;

    try {
      await pm2.connect()
      const [ info ] = await pm2.getInfo(id);
      // ToDo skorenyuk: need to add JSON config
      if (fs.existsSync(path.resolve(info.pm2_env.pm_cwd, 'ecosystem.config.js'))) {
        script = path.resolve(info.pm2_env.pm_cwd, 'ecosystem.config.js');
        proc = await pm2.start(script)
        res.statusCode = 200;
        res.json({
          proc,
          info,
          script: script.toString(),
        });
        pm2.disconnect();
      } else {
        proc = await pm2.start({ name: info.name })
        res.statusCode = 200;
        res.json({
          proc,
          info,
          script: null,
        });
        pm2.disconnect();
      }
    } catch (e) {
      sendError(res, e)
    }

  })

router.route('/restart')
  .post(async (req, res) => {
    const { id } = req.body;
    try {
      await pm2.connect();
      await pm2.restart(id, { updateEnv: false });
      const info = await pm2.getInfo(id);
      res.statusCode = 200;
      res.json(info);
      pm2.disconnect();
    } catch (e) {
      sendError(res, e)
    }
  });

router.route('/stop')
  .post(async (req, res) => {
    const { id } = req.body;
    try {
      await pm2.connect();
      await pm2.stop(id);
      const info = await pm2.getInfo(id);
      res.statusCode = 200;
      res.json(info);
      pm2.disconnect();
    } catch (e) {
      sendError(res, e)
    }
  });


module.exports = router;
