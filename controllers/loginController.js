// var express  = require('express');
// var app = express(); 
// var mongoose = require('mongoose');        
// var cookieParser = require('cookie-parser');
// var Bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;

// var login = mongoose.model('login', {
//     username: String,
//     email: String,
//     pwd: String,
//     cpwd: String,
// });




// module.exports = {
// 	create: function(req, res) {

// 		login.findOne({email: req.body.email}, function(err, result) {
// 			if(err) console.log(err);
	 
// 			  if(result == null) {
// 				Bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 					if(err) {
// 							return console.error(err);
// 					}
// 					Bcrypt.hash(req.body.pwd, salt, function(err, hash) {
// 							if(err) {
// 									return console.error(err);
// 							}
// 							hashpwd = hash;
// 					});
// 				});
// 			  }
// 		  else {
// 				res.send("Email already registered", err);
// 			  }
// 		 });

// 			login.create({
// 				username : req.body.username,
// 				email: req.body.email,
// 				pwd: hashpwd,
				
// 			}, function(err, authmsg) {
// 				if (err)
// 					res.send(err);
	
				
// 				res.send(authmsg)
// 			});
	
		
// 	}
// }
