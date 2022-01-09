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
const Answer = require('./answer.model').schema;

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

/**
 * Question model definition
 */
const questionSchema = new Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    answers: {
        type: [Answer],
        default: []
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

questionSchema.plugin(autoIncrement.plugin, {
    model: 'question',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Question', questionSchema);