
module.exports = (error, req, res) =>{
  res.status(error.code).json({
      message: error.message,
      code: error.code,
  });
};
