const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  mobileNo: { type: String },
  gender: { type: String },
  address: { type: String },
  status: { type: Boolean }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
