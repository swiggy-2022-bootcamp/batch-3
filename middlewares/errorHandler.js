/* Custom Error Handler */
function errorHandler (err, req, res, next) {
    console.log(err.status)
    res.status(err.status).json({message: err.message });
}

module.exports = { errorHandler };