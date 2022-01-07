/* Custom Error Handler */
function errorHandler (err, req, res, next) {
    res.status(err.status).json({message: err.message });
}

module.exports = { errorHandler };