
let loginController = {

    getBasicLogin: (req, res) => {
        res.send({ status: true, error: false, msg: "Basic login page" })
    }
}

module.exports=loginController;