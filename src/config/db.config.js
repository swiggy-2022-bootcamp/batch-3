const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Connection Success..');
    } else {
        console.log('Error in connection ' + JSON.stringify(err, undefined, 2));

    }
});

require('../models/user')
require('../models/question')
require('../models/answer')