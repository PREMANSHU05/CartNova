const loggerMiddleware = (req, res, next) => {
  const time = new Date().toLocaleString();

  console.log("========== New Request ==========");
  console.log(`Time   : ${time}`);
  console.log(`Method : ${req.method}`);
  console.log(`URL    : ${req.originalUrl}`);
  console.log(`IP     : ${req.ip}`);
  console.log("=================================");

  next();
};

module.exports = loggerMiddleware;
