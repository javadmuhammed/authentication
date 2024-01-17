const UserCollection = require("../../db/model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const InputValidator = require('input-validator-nodejs');


function loginActionHelper(username, password) {

    return new Promise((resolve, reject) => {
        let loginValidator = new InputValidator({ username, password }, {
            username: 'required|email',
            password: 'required|string'
        }, {
            'username.required': 'Please enter username/email address',
            'username.email': 'Username must be an email address',
            'password.required': 'Please enter password',
        })

        let isLoginValid = loginValidator.check()
        if (isLoginValid) {

            UserCollection.findOne({ email: username }).then(async (user) => {
                if (user) {
                    try {
                        let newPassword = await bcrypt.compare(password, user.password);
                        if (newPassword) {
                            let newJsonToken = jwt.sign({ email: user.email }, process.env.JWT_KEY, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRE_IN })
                            user.access_token = newJsonToken;
                            user.save().then(() => {
                                resolve({ status: true, error: false, msg: "Loggin success", access_token: newJsonToken, refresh_token: user._id })
                            }).catch((err) => {
                                console.log(err)
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
        } else {
            console.log("Login invalid")
            reject({ status: false, error: true, msg: loginValidator.errors })
        }
    })
}


async function checkIsUserExist(email, phone) {
    try {
        let isExist = await UserCollection.findOne({
            $or: [
                {
                    email: email
                },
                {
                    phone: phone
                }
            ]
        });

        return isExist ? true : false
    } catch (e) {
        return false;
    }
}


function signupActionHelper(name, email, phone, password, status) {
    return new Promise(async (resolve, reject) => {

        try {
            let joining_date = new Date();


            let loginValidator = new InputValidator({ name, email, phone, password }, {
                name: 'required|string',
                email: 'required|email',
                phone: 'required|integer|maxLength:10|minLength:10',
                password: 'required|string'
            }, {
                'name.required': 'Please enter fullname',
                'email.required': 'Please enter full email address',
                'email.email': 'Please enter valid email address',
                'password.required': 'Please enter password',
                'phone.required': 'Please enter phone number',
                'phone.integer': 'Please enter valid phone number',
                'phone.maxLength': 'Please enter 10 digit phone number',
                'phone.minLength': 'Please enter 10 digit phone number',
            })

            let isSignupValid = loginValidator.check()
            if (isSignupValid) {
                if (!checkIsUserExist(email, phone)) {

                    let salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
                    let newPassword = await bcrypt.hash(password, salt);
                    if (newPassword) {
                        let access_token = await jwt.sign({ email: email }, process.env.JWT_KEY, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRE_IN })
                        if (access_token) {
                            new UserCollection({
                                access_token: access_token,
                                email: email,
                                joined_date: joining_date,
                                name: name,
                                password: newPassword,
                                phone: phone,
                                status: status
                            }).save().then(() => {
                                resolve({ status: true, error: false, msg: "Signup successfuly completed" })
                            }).catch((err) => {
                                reject({ status: false, error: true, msg: "Something went wrong" })
                            })
                        } else {
                            reject({ status: false, error: true, msg: "Something went wrong" })
                        }
                    } else {
                        reject({ status: false, error: true, msg: "Something went wrong" })
                    }
                } else {
                    reject({ status: false, error: true, msg: "Email/Phone number already exist" })
                }
            } else {
                reject({ status: false, error: true, msg: loginValidator.errors })
            }
        } catch (e) {
            reject({ status: false, error: true, msg: "Something went wrong" })
        }
    })
}

async function jwtValidationHelper(jwt_token) {
    return new Promise((resolve, reject) => {

        jwt.verify(jwt_token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                reject({ status: false, error: true, msg: "Invalid token" })
            } else {
                reject({ status: true, error: false, msg: "Valid token" })
            }
        })
    })
}

async function reGenerateToken(user_id){
    return new Promise((resolve,reject)=>{
        
    })
}


module.exports = {
    loginActionHelper,
    signupActionHelper,
    jwtValidationHelper
}