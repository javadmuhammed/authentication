const userCollection = require("../../db/model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


function loginActionHelper(username, password) {
    return new Promise((resolve, reject) => {
        userCollection.findOne({ email: username }).then(async (user) => {
            if (user) {
                try {
                    let newPassword = await bcrypt.compare(password, user.password);
                    if (newPassword) {
                        let newJsonToken = jwt.sign({ user_id: user._id }, process.env.JWT_KEY, { algorithm: "HS256" })
                        user.access_token = newJsonToken;
                        user.save().then(() => {
                            res.cookie("access_token", newJsonToken, { maxAge: 900000, httpOnly: false })
                            resolve({ status: true, error: false, msg: "Loggin success" })
                        }).catch((err) => {
                            reject({ status: false, error: true, msg: "Something went wrong" })
                        })
                    } else {
                        reject({ status: false, error: true, msg: "Incorrect Password" })
                    }
                } catch (e) {
                    reject({ status: false, error: true, msg: "Something went wrong" })
                }
            } else {
                reject({ status: false, error: true, msg: "Invalid username/password" })
            }
        }).catch((err) => {
            reject({ status: false, error: true, msg: "Something went wrong" })
        })
    })
}

module.exports = {
    loginActionHelper
}