
const express = require("express")
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./router/userController");

dotenv.config({ path: "./.env" })
const PORT = process.env.PORT || 7000;

app.use("/api/user", userRouter)



app.listen(PORT, () => {
    console.log("Server started at port : " + PORT)
})


