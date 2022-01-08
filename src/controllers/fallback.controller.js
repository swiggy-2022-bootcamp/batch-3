exports.get404 = (req, res, next) => {
    res.status(404).send('404-Page not found');
};

exports.errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      /* #swagger.responses[400] = { 
           schema: { $ref: "#/definitions/ValidationErrorResponse" },
           description: 'Validation error.' 
       } */
      return res.status(400).json(err.developerMessage);
    }
    if (err.name === 'IdentityError') {
        /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/Login401ErrorResponse" },
            description: 'Unauthorized.' 
        } */
        return res.status(err.statusCode).send({ message: err.message });
    }
    
    /* #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/InternalServerError" },
        description: 'Internal server error.' 
    } */
    return res.status(500).send('Internal Server Error');
  }