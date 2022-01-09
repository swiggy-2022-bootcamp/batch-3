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

const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment')

/**
 * Answer model definition
 */
const answerSchema = new Schema({
    id: { type: Number },
    answer: { type: String, required: true },
    upvotesCount: { type: Number, default: 0 },
    upvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        unique: true
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true, autoIndex: false })

autoIncrement.initialize(mongoose.connection);

answerSchema.plugin(autoIncrement.plugin, {
    model: 'answer',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Answer', answerSchema);