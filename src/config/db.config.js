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

const mongoose = require('mongoose');

/* Connect to the backend database */
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Connection Success..');
    } else {
        console.log('Error in connection ' + JSON.stringify(err, undefined, 2));

    }
});

require('../models/user.model')
require('../models/question.model')
// require('../models/answer.model')