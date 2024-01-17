const { loginActionHelper, signupActionHelper, jwtValidationHelper } = require("../helper/userHelper/authHelper");

let loginController = {



    loginAction: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        loginActionHelper(username, password).then((data) => {
            if (data?.status) {
                res.cookie("access_token", data?.access_token, { maxAge: 900000, httpOnly: false })
            }
            res.status(200).send(data)
        }).catch((err) => {
             res.status(400).send(err)
        })
    },

    signupAction: (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let password = req.body.password;
        let status = true;


        signupActionHelper(name, email, phone, password, status).then((data) => {
            console.log(data)
            res.status(200).send(data)
        }).catch((err) => {
            res.status(400).send(err)
        })
    },

    jwtValidation : (req,res)=>{
        let jwt = req.params.token;

 
        jwtValidationHelper(jwt).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(401).send(err)
        })
    }
}

module.exports = loginController;