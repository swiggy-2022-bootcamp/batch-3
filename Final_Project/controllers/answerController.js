const user_models = require('../models/userModel');
const answer_models = require('../models/answerModel');
const question_models = require('../models/questionModel');

exports.answer = (req, res)=>{
	var Answer = new answer_models.AnswerModel();
    if(req.isAuthorised) {
    	Answer.answeredby = req.user._id;
    	Answer.answer = req.body.answer;
    	question_models.QuestionModel.findOne({_id:req.body._id}, (err, question)=> {
    		if (err) {
    			res.send(err);
    		} else {
    			answer_models.AnswerModel.find({_id: {$in: question.answer_references}}, (err, answers)=>{
					if (err) {
						res.send(err);
					} else {
						var is_already_answered = false;
						for(var i=0; i< answers.length; i++ ) {
							if(answers[i].answeredby.toString() === req.user._id.toString()) {
								is_already_answered = true;
								break;
							}
						}
						if(is_already_answered) {
							res.json({message: 'Already Answered'});
						} else {
							Answer.save((err, answer)=> {
								if(err) {
									res.send(err);		
								} else {
									question.answer_references.push(answer);
									question.save((err)=> {
										if(err) {
											res.send(err);
										} else {
											res.json({message: 'Answer Created', Answer_id: Answer._id});
										}
									});
								}
							})
						}
					}
				});
    		}
    	});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.getall = (req, res)=>{
	if(req.body._id){
	question_models.QuestionModel.findOne({_id: req.body._id}, (err, question)=> {
		if (err) {
			res.send(err);
		} else {
			answer_models.AnswerModel.find({_id: {$in: question.answer_references}}, (err, answers)=>{
				if (err) {
					res.send(err);
				} else {
					res.json(answers);
				}
			});
		}
	});
} else {
	res.json({message: "Please send the correct question id as '_id'"});
}
}

exports.upvote = (req, res)=>{
	if(req.isAutorised) {
		answer_models.AnswerModel.count({_id: req.body._id, upvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count !=0) {
					res.json({message: 'Upvote Disallowed'});
				} else {
					answer_models.AnswerModel.updateOne({_id: req.body._id, downvotes_references: req.user._id }, 
			    		{$pull: { downvotes_references: req.user._id }, $inc: {downvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
						    	answer_models.AnswerModel.updateOne({_id: req.body._id}, 
						    		{$push: { upvotes_references: req.user }, $inc: {upvotes: 1}},
						    		(err, result)=>{
						    			if(err) {
						    				res.send(err);
						    			} else {
						    				res.json({message: 'Upvote Successful!'})
						    			}
						    		});
			    			}
			    		});
				}
    		}
		});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.downvote = (req, res)=>{
	if(req.isAuthorised) {
		answer_models.AnswerModel.count({_id: req.body._id, downvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count != 0) {
					res.json({message: 'Downvote Disallowed'});
				} else {
					answer_models.AnswerModel.updateOne({_id: req.body._id, upvotes_references: req.user._id }, 
			    		{$pull: { upvotes_references: req.user._id }, $inc: {upvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
						    	answer_models.AnswerModel.updateOne({_id: req.body._id}, 
						    		{$push: { downvotes_references: req.user }, $inc: {downvotes: 1}},
						    		(err, result)=>{
						    			if(err) {
						    				res.send(err);
						    			} else {
						    				res.json({message: 'Downvote Successful!'})
						    			}
						    		});
			    			}
			    		});
				}
    		}
		});
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}