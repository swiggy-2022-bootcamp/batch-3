/*
 * Copyright 2022 Debdyut Hajra
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 * This is a middleware function. It returns a 404 response if no request path matches.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get404 = (req, res, next) => {
    res.status(404).send('404-Page not found');
};

/**
 * This is a error middleware function. It intercepts the error from other middlewares and processes the appropriate response.
 * 
 * @param {*} err
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.errorHandler = (err, req, res, next) => {

    console.error(err);
    req.error = err;

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