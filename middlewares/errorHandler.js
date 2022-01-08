/* Custom Error Handler */
function errorHandler (err, req, res, next) {
    if(!err.status) { err.status = 500; }
    res.status(err.status).json({message: err.message });
}

module.exports = { errorHandler };