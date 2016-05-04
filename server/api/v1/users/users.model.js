var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    index: true
  },
  password: String
});


UserSchema.virtual('userName').get(function() {
    return this._id;
});
var Users = mongoose.model('user', UserSchema);

module.exports = Users;
