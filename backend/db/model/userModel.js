const { default: mongoose } = require("mongoose");


let userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joined_date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    access_token: {
        type: String,
        required: true
    }
})

let UserCollection = mongoose.model("user", userModel);
module.exports = UserCollection