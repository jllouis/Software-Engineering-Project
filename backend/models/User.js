const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true},
    first_name: {type: String, trim: true, required: true},
    last_name: {type: String, trim: true, required: true},
    email: {type: String, unique: true, trim: true, required: true},
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    account_balance: Number,
    rating: {type: Number, default: 0},
    enabled: Boolean,
    warnings: Number,
    blacklisted: Boolean,
    admin_message: String,
    linkedIn: String,
    github: String,
    first_login: Boolean,
    delete_requested: {type: Boolean, default: false}
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
