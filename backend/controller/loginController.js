const { loginActionHelper, signupActionHelper } = require("../helper/userHelper/loginHelper");

let loginController = {



    loginAction: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        loginActionHelper(username, password).then((data) => {
            if (data?.status) {
                res.cookie("access_token", data?.access_token, { maxAge: 900000, httpOnly: false })
            }
            res.send(data)
        }).catch((err) => {
            console.log(err)
            res.send(err)
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
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
    }
}

module.exports = loginController;