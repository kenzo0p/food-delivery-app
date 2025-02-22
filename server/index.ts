import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./src/routes/user.routes";
import restaurantRoute from "./src/routes/restaurant.routes";
import menuRoute from "./src/routes/menu.routes";
import orderRoute from "./src/routes/order.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// default middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsoptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsoptions));
// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("api/v1/menu" , menuRoute)
app.use("api/v1/orders" , orderRoute)

app.listen(PORT, () => {
  connectDb();
  console.log(`The app is listening on port ${PORT}`);
});
