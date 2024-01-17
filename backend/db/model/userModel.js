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
        type: Date,
        required: true
    },
    access_token: {
        type: Date,
        required: true
    }
})

let userCollection = mongoose.model("user", userModel);
module.exports = userCollection