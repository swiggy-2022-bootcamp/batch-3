const user_models = require('../models/userModel');
const jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");

exports.register = async function (req, res, next) {
	var User = new user_models.UserModel();
	User.email = req.body.email;
	User.userName = req.body.username;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	User.password = hashedPassword;
	try {
		await User.save();
		res.json({ msg: "User Added Successfully"});
	} catch (error) {
		res.json({ msg: "User Already Exists or Some of the input parameters are missing" });
	}
}

exports.login = async function (req, res){
    const { email, password } = req.body;
    const userExists = await user_models.UserModel.findOne({ email });
    if(userExists){
        const CorrectPassword = await bcrypt.compare(
			password, 
			userExists.password);
        if(CorrectPassword) {
			var token = jwt.sign({email}, "secret");
			await user_models.TokenModel.updateOne({}, {email: req.body.email, token: token}, 
				{upsert: true, setDefaultsOnInsert: true});
            res.json({status : 201, message : "User logged in successfully", token: token})
        }
        else {
			res.json({status : 401, message : "Invalid Email/Password"})
        };
    }else {
		res.json({status : 401, message : "Invalid Email/Password"})
    }
}

exports.logout = (req, res) => {
	user_models.TokenModel.find({ token: req.body.token }).deleteOne((err) => {
		if (err) {
			res.json({ message: 'Logout Failed!' });
		} else {
			res.json({ message: 'Logout Success!' })
		}
	});
}

