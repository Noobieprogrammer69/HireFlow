const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("MongoDB is connected")
    } catch (error) {
        console.error("Error connecting to MONGO DB", error)
        process.exit(1)        
    }
}

module.exports = connectDB