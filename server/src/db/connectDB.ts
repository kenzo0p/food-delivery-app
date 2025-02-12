import mongoose from "mongoose"

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database Connnection succesfull");
    } catch (error) {
        console.log("Database connection failed");
    }
}

export default connectDb;