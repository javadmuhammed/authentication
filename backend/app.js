
const express = require("express")
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./router/userRouter");
const mongoConnection = require("./db/config")

dotenv.config({ path: "./.env" })
const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoConnection()

app.use("/api/user", userRouter)



app.listen(PORT, () => {
    console.log("Server started at port : " + PORT)
})


