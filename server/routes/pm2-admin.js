var pm2 = require('pm2');
const router = require('express').Router();

router.route('/list')
  .get((req, res) => {
    pm2.connect((err) => {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      }
      pm2.list((err, list) => {
        if (err) {
          res.statusCode = 400;
          res.json(err);
        }
        res.statusCode = 200;
        res.json(list);
        pm2.disconnect();
      });
    });
  });


router.route('/info')
  .post((req, res) => {
    const { id, name } = req.body;
    pm2.connect((err) => {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      }
      pm2.describe(id, (err, processDescription) => {
        if (err) {
          res.statusCode = 400;
          res.json(err);
        }
        res.statusCode = 200;
        res.json(processDescription);
        pm2.disconnect();
      });
    });
  })

router.route('/start')
  .post((req, res) => {
    const { id } = req.body;
    pm2.connect((err) => {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      }
      pm2.start(id, { updateEnv: false }, (err, proc) => {
        /*if (err) {
          res.statusCode = 400;
          res.json(err);
        }
        res.statusCode = 200;
        res.json(proc);*/
        pm2.describe(id, (err, processDescription) => {
          if (err) {
            res.statusCode = 400;
            res.json(err);
          }
          res.statusCode = 200;
          res.json(processDescription);
          pm2.disconnect();
        });
      });
    });
  })

router.route('/restart')
  .post((req, res) => {
    const { id } = req.body;
    pm2.connect((err) => {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      }
      pm2.restart(id, { updateEnv: false }, (err, proc) => {
        /*if (err) {
          res.statusCode = 400;
          res.json(err);
        }
        res.statusCode = 200;
        res.json(proc);*/
        pm2.describe(id, (err, processDescription) => {
          if (err) {
            res.statusCode = 400;
            res.json(err);
          }
          res.statusCode = 200;
          res.json(processDescription);
          pm2.disconnect();
        });
      });
    });
  })

module.exports = router;
