
const mongoose = require("mongoose")

let mongoConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Mongo DB connected success")
    }).catch((err) => {
        console.log("MongoDB connection error :" + err)
    })
}

module.exports = mongoConnection;