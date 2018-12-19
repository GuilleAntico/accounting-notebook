
module.exports = (error, req, res) =>{
  res.status(400).json({
      message: error.message,
      code: error.code,
  });
};
