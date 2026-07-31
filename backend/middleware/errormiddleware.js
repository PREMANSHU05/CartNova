const errormiddleware = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;

  res.status(statuscode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errormiddleware;
