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

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { validationResult } = require('express-validator');
const IdentityError = require('../error/identity.error');
const ValidationError = require('../error/validation.error');

module.exports = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    const token = req.headers['authorization'].split(" ")[1];
    
    let decoded;
    try {
        decoded = jwt.verify(token, "SECRET123");        
    } catch (err) {
        throw new IdentityError('Invalid token', 401);
    }

    const user = await User.findById(decoded.user_id);
    res.locals.user = user;
    next();
}