const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    city: String,
    street: String,
    phone: String,
});

module.exports = mongoose.model("User", UserSchema);
