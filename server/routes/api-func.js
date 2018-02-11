module.exports = {
  sendError: (res, e) => {
    console.log(e)
    res.statusCode = 400;
    res.json(e.stack || e);
  }
}
