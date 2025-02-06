import express from 'express';
import dotenv from "dotenv";
import connectDb from './src/db/connectDB';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get( "/home", (req,res) => {
    res.send("HII I am backend of food app")
})
app.listen(PORT , () => {
    connectDb();
    console.log(`The app is listening on port ${PORT}`);
})