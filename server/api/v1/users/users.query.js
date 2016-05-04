var User = require('./users.model')

function findUserById(userName){
  return User.findOne({
    '_id': userName
  });
}

exports.findUserById = findUserById;
