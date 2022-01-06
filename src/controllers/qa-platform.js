exports.addQuestion = (req, res) => {    
    res.status(201).send('Added a question');
};

exports.addAnswer = (req, res) => {    
    res.status(201).send('Added an answer');
};

exports.updateAnswer = (req, res) => {    
    res.status(200).send('Updated an answer');
};

exports.getAllQuestions = (req, res) => {    
    res.status(200).send('Fetched all question');
};

exports.getQuestion = (req, res) => {    
    res.status(200).send('Fetched a question');
};

exports.deleteQuestion = (req, res) => {    
    res.status(200).send('Deleted a question');
};