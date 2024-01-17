
const express = require("express");
const loginController = require("../controller/loginController");
const router = express.Router();


// Auth Related
router.post("/login", loginController.loginAction)
router.post("/sign_up", loginController.signupAction)


module.exports = router;