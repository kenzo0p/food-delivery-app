import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database Connnection succesfull");
    } catch (error) {
        console.log( error, "Database connection failed");
    }
}

export default connectDb;