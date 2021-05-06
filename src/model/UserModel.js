const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: String,
    password: String

});
const userModel = new mongoose.model("User", UserSchema);
module.exports = userModel;


