const user_models = require('../models/userModel');
exports.isAuthorised = (req, res, next) => {
	user_models.TokenModel.findOne({ token: req.body.token }, (err, result) => {
		if(err) {
			res.json({message: 'Operation Failed!'});
		} else {
			if (result == null) {
				req.isAuthorised = false;
				next();
			} else {
				req.isAuthorised = true;
				user_models.UserModel.findOne({email: result.email},
				(err, result)=>{
					req.user = result;
					next();
				});
			}
		}
	});
}