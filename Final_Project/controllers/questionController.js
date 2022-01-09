const user_models = require('../models/userModel');
const question_models = require('../models/questionModel');

exports.question = (req, res)=>{
	var Question = new question_models.QuestionModel();
    if(req.isAuthorised) {
    	Question.author = req.user;
    	Question.questionTitle = req.body.title;
		Question.questionBody = req.body.body;
    	Question.save((err) => {
	       if (err) {
	       	res.json({message: "Some of the parameters might be missing, please check and try again!"});
	       } else {
	        res.json({ message: 'Question posted successfully', Question_id: Question._id });    
	       }
	    });
    } else {
    	res.json({message: 'Unauthorized Request!'})
    }
}

exports.getall = (req, res)=>{
	question_models.QuestionModel.find({}, (err, questions)=> {
		if (err) {
			res.send(err);
		} else {
			res.json(questions);
		}
	});
}

exports.upvote = (req, res)=>{
	if(req.isAuthorised) {
		question_models.QuestionModel.count({_id: req.body._id, upvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count !=0) {
					res.json({message: 'Upvote Disallowed'});
				} else {
					question_models.QuestionModel.updateOne({_id: req.body._id, downvotes_references: req.user._id }, 
			    		{$pull: { downvotes_references: req.user._id }, $inc: {downvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
						    	question_models.QuestionModel.updateOne({_id: req.body._id}, 
						    		{$push: { upvotes_references: req.user._id }, $inc: {upvotes: 1}},
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
		question_models.QuestionModel.count({_id: req.body._id, downvotes_references: req.user._id}, (err, count)=>{
			if(err) {
    			res.send(err);
    		} else {
    			if(count != 0) {
					res.json({message: 'Downvote Disallowed'});
				} else {
					question_models.QuestionModel.updateOne({_id: req.body._id, upvotes_references: req.user._id }, 
			    		{$pull: { upvotes_references: req.user._id }, $inc: {upvotes: -1}},
			    		(err, result)=>{
			    			if(err) {
			    				res.send(err);
			    			} else {
						    	question_models.QuestionModel.updateOne({_id: req.body._id}, 
						    		{$push: { downvotes_references: req.user._id }, $inc: {downvotes: 1}},
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