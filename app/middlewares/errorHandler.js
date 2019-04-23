
module.exports = (error, req, res) =>{
    const errResponse = {...error};
    errResponse.code = errResponse.code || 400;
    if(errResponse.name === 'ValidationError'){
        errResponse.code = 400;
        errResponse.message = [];
        Object.keys(errResponse.errors).forEach(key =>{
            errResponse.message.push({
                [key]: errResponse.errors[key].message
            })
        })
    } else if(errResponse.name === 'MongoError'){
        errResponse.message = errResponse.errmsg;
        errResponse.code = 400;
    }
  res.status(errResponse.code).json({
      message: errResponse.message,
      code: errResponse.code,
  });
};
