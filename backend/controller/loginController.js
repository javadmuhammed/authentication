const { loginActionHelper } = require("../helper/userHelper/loginHelper");

let loginController = {

    getBasicLogin: (req, res) => {
        res.send({ status: true, error: false, msg: "Basic login page" })
    },

    loginAction: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        loginActionHelper(username, password).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
    }
}

module.exports = loginController;