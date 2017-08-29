const mongoose = require('mongoose');



module.exports = function(url) {

  //Create mongoose Schema
  mongoose.connect(url);
  
  const userSchema = new mongoose.Schema({
  	name: {
  		type: String,
  		required: true
  	},
  	language: {
  		type: Object
  	},
  	timesGreeted: {
  	type: Number
  	}
  });

  userSchema.index({name: 1}, {unique: true});

  //Create mongoose model
  var users = mongoose.model('users', userSchema);

  return  {
    users
  }
}
