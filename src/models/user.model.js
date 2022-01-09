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
const Question = require('./question.model').schema;
const Answer = require('./answer.model').schema;

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

/**
 * User model definition
 */
const userSchema = new Schema({
    id: { type: Number, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    questions: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'Question'
    },
    answers: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'Answer'
    },
    reputations: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

userSchema.pre('save', function (next) {
    if (!this.createdBy) {
        this.createdBy = this.get('_id');
        this.updatedBy = this.get('_id');
    }    
    next();
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('User', userSchema);